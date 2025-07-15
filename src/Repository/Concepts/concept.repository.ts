import { Concept, IConcept } from "../../Models/Concepts/concepts.model";

export default class ConceptsRepository {
  async create(data: IConcept) {
    const newConcept = new Concept(data);
    return await newConcept.save();
  }

  async findConcepts(): Promise<IConcept[] | null> {
    const concept = await Concept.find();
    return concept as any;
  }

  async findConceptById(id: string): Promise<IConcept | null> {
    const concept: any = await Concept.find({ concept_id: id }).select("-__v");
    return concept as IConcept;
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
