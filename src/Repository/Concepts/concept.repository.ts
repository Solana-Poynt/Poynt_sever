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
    const concepts = await Concept.find({ concept_id: { $in: ids } });
    // Reorder according to the ids array
    const orderMap = new Map(ids.map((id, index) => [id, index]));
    return concepts.sort(
      (a, b) => orderMap.get(a.concept_id)! - orderMap.get(b.concept_id)!
    );
  }

  async findOneOrMultipleTopicByIds(ids: number[]): Promise<ITopic[]> {
    const result = await Concept.aggregate([
      { $unwind: "$topics" },
      { $match: { "topics.topic_id": { $in: ids } } },
      { $replaceRoot: { newRoot: "$topics" } },
    ]);

    const orderMap = new Map(ids.map((id, index) => [id, index]));
    return (result as ITopic[]).sort(
      (a, b) => orderMap.get(a.topic_id)! - orderMap.get(b.topic_id)!
    );
  }

  async findOnlyMatchingQuestions(ids: number[]): Promise<IQuestion[]> {
    const result = await Concept.aggregate([
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

    const questions = result.map((r) => r.question as IQuestion);
    const orderMap = new Map(ids.map((id, index) => [id, index]));
    return questions.sort(
      (a, b) => orderMap.get(a.question_id)! - orderMap.get(b.question_id)!
    );
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
