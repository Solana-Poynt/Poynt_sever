import { Request, Response, NextFunction } from "express";
import AppError from "../../Utilities/Errors/appError";
import { statusCode } from "../../Utilities/utils";
import ConceptsRepository from "../../Repository/Concepts/concept.repository";
import {
  Concept,
  Counter,
  IConcept,
  IQuestion,
  ITopic,
} from "../../Models/Concepts/concepts.model";

const conceptsRepository = new ConceptsRepository();

export default class ConceptsService {
  public async getConcepts(
    req: any,
    next: NextFunction
  ): Promise<IConcept[] | void> {
    const concept = await conceptsRepository.findConcepts();
    if (!concept) {
      return next(
        new AppError("Unable to get concepts", statusCode.internalServerError())
      );
    }
    return concept;
  }

  public async getOneConcept(
    req: any,
    next: NextFunction
  ): Promise<IConcept | void> {
    const { id } = req.params;
    const concept = await conceptsRepository.findConceptById(id);
    if (!concept) {
      return next(
        new AppError(
          "Unable to get single concept",
          statusCode.internalServerError()
        )
      );
    }
    return concept;
  }

  public async getOneOrMultipleConcept(
    req: any,
    next: NextFunction
  ): Promise<IConcept[] | void> {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return next(
        new AppError(
          "Please provide at least one concept ID",
          statusCode.badRequest()
        )
      );
    }

    const concepts = await conceptsRepository.findOneOrMultipleConceptByIds(
      ids
    );
    return concepts;
  }

  public async getOneOrMultipleTopics(
    req: any,
    next: NextFunction
  ): Promise<ITopic[] | void> {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return next(
        new AppError(
          "Please provide at least one topic ID",
          statusCode.badRequest()
        )
      );
    }

    const topics = await conceptsRepository.findOneOrMultipleTopicByIds(ids);
    return topics;
  }

  public async getOneOrMultipleQuestions(
    req: any,
    next: NextFunction
  ): Promise<IQuestion[] | void> {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return next(
        new AppError(
          "Please provide at least one question ID",
          statusCode.badRequest()
        )
      );
    }

    const questions = await conceptsRepository.findOnlyMatchingQuestions(ids);
    return questions;
  }

  public async createConcept(
    req: any,
    next: NextFunction
  ): Promise<IConcept | void> {
    const data = req.body;
    const concept = await conceptsRepository.create(data);
    if (!concept) {
      return next(
        new AppError(
          "Unable to create concept",
          statusCode.internalServerError()
        )
      );
    }
    return concept;
  }

  public async updateConcept(
    req: any,
    next: NextFunction
  ): Promise<IConcept | void> {
    const data = req.body;
    const { id } = req.params;
    const concept = await conceptsRepository.updateConcept(id, data);
    if (!concept) {
      return next(
        new AppError(
          "Unable to update concept",
          statusCode.internalServerError()
        )
      );
    }
    return concept;
  }

  public async deleteConcept(
    req: any,
    next: NextFunction
  ): Promise<IConcept | void> {
    const { id } = req.params;
    const concept = await conceptsRepository.deleteConcept(id);
    if (!concept) {
      return next(
        new AppError(
          "Unable to delete concept",
          statusCode.internalServerError()
        )
      );
    }
    return concept;
  }

  async repairGlobalIds(): Promise<{
    message: string;
    concepts: number;
    topics: number;
    questions: number;
  }> {
    console.log("Starting global ID repair...");

    // Read all concepts deterministically (sort by _id)
    const concepts = await Concept.find().sort({ _id: 1 }).lean();

    let conceptCounter = 1;
    let topicCounter = 1;
    let questionCounter = 1;

    // Use bulk operations to reduce roundtrips (commit in batches)
    const bulkOps = [];

    for (const c of concepts) {
      const topics = Array.isArray(c.topics) ? c.topics : [];

      for (let ti = 0; ti < topics.length; ti++) {
        topics[ti].topic_id = topicCounter++;

        const questions = Array.isArray(topics[ti].questions)
          ? topics[ti].questions
          : [];

        for (let qi = 0; qi < questions.length; qi++) {
          questions[qi].question_id = questionCounter++;
        }
      }

      // set updated concept_id and topics in a single update
      bulkOps.push({
        updateOne: {
          filter: { _id: c._id },
          update: {
            $set: {
              concept_id: conceptCounter++,
              topics: topics,
            },
          },
        },
      });

      // flush in batches to avoid huge memory usage
      if (bulkOps.length >= 200) {
        await Concept.bulkWrite(bulkOps);
        bulkOps.length = 0;
      }
    }

    // flush remaining
    if (bulkOps.length > 0) {
      await Concept.bulkWrite(bulkOps);
    }

    const lastConcept = conceptCounter - 1;
    const lastTopic = topicCounter - 1;
    const lastQuestion = questionCounter - 1;

    // Persist counters so future insertions use the right sequences
    await Counter.findByIdAndUpdate(
      "concept_id",
      { $set: { sequence_value: lastConcept } },
      { upsert: true }
    );
    await Counter.findByIdAndUpdate(
      "topic_id",
      { $set: { sequence_value: lastTopic } },
      { upsert: true }
    );
    await Counter.findByIdAndUpdate(
      "question_id",
      { $set: { sequence_value: lastQuestion } },
      { upsert: true }
    );

    console.log(
      `Repair complete. concepts=${lastConcept}, topics=${lastTopic}, questions=${lastQuestion}`
    );

    // Create unique indexes (will fail if duplicates remain)
    try {
      await Concept.collection.createIndex(
        { concept_id: 1 },
        { unique: true, background: true }
      );
      await Concept.collection.createIndex(
        { "topics.topic_id": 1 },
        { unique: true, background: true }
      );
      await Concept.collection.createIndex(
        { "topics.questions.question_id": 1 },
        { unique: true, background: true }
      );
    } catch (err: any) {
      // If index creation fails, log and surface to operator for manual inspection
      console.error("Index creation failed: " + err.message);
      // Do not throw — caller can inspect logs and fix duplicates manually if needed
    }

    return {
      message: `Repair complete. concepts=${lastConcept}, topics=${lastTopic}, questions=${lastQuestion}`,
      concepts: lastConcept,
      topics: lastTopic,
      questions: lastQuestion,
    };
  }
}
