import {
  Concept,
  IConcept,
  IQuestion,
  ITopic,
} from "../../Models/Concepts/concepts.model";

export default class ConceptsRepository {
  async create(data: IConcept) {
    const newConcept = new Concept(data);
    return await newConcept.save();
  }

  async findConcepts(): Promise<IConcept[] | null> {
    const concept = await Concept.find();
    return concept as any;
  }

  async findConceptById(id: number): Promise<IConcept | null> {
    const concept: any = await Concept.find({ concept_id: id }).select("-__v");
    return concept as IConcept;
  }

  async findOneOrMultipleConceptByIds(ids: number[]): Promise<IConcept[]> {
    return await Concept.find({ concept_id: { $in: ids } });
  }

  async findOneOrMultipleTopicByIds(ids: number[]): Promise<ITopic[]> {
    const result = await Concept.aggregate([
      { $unwind: "$topics" }, // break topics array into individual docs
      { $match: { "topics.topic_id": { $in: ids } } }, // keep only those matching ids
      { $replaceRoot: { newRoot: "$topics" } }, // make the topic itself the root document
    ]);

    return result as ITopic[];
  }

  async findOnlyMatchingQuestions(ids: number[]): Promise<IQuestion[]> {
    return await Concept.aggregate([
      { $unwind: "$topics" },
      { $unwind: "$topics.questions" },
      { $match: { "topics.questions.question_id": { $in: ids } } },
      {
        $project: {
          _id: 0,
          question: "$topics.questions",
        },
      },
    ]);
  }

  async updateConcept(id: string, concept: IConcept): Promise<IConcept | null> {
    const result: any = await Concept.findOneAndUpdate(
      { concept_id: id },
      { ...concept },
      { new: true, overwrite: true }
    ).exec();
    return result as IConcept;
  }

  async deleteConcept(id: string): Promise<IConcept> {
    const concept: any = await Concept.deleteOne({ concept_id: id });
    return concept as IConcept;
  }
}
