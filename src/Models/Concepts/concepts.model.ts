import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion {
  question_id: number;
  text: string;
  correct: boolean;
  explanation: string;
}

export interface ILearningContent {
  summary: string;
  big_note: string[];
  battle_relevance: string;
}

export interface ITopic {
  topic_id: number;
  title: string;
  learning_content: ILearningContent;
  questions: IQuestion[];
}

export interface IConcept extends Document {
  concept_id: number;
  title: string;
  description: string;
  topics: ITopic[];
}

const QuestionSchema = new Schema<IQuestion>({
  question_id: { type: Number, required: true },
  text: { type: String, required: true },
  correct: { type: Boolean, required: true },
  explanation: { type: String, required: true },
});

const LearningContentSchema = new Schema<ILearningContent>({
  summary: { type: String, required: true },
  big_note: [{ type: String, required: true }],
  battle_relevance: { type: String, required: true },
});

const TopicSchema = new Schema<ITopic>({
  topic_id: { type: Number, required: true },
  title: { type: String, required: true },
  learning_content: { type: LearningContentSchema, required: true },
  questions: [QuestionSchema],
});

const ConceptSchema = new Schema<IConcept>({
  concept_id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  topics: [TopicSchema],
});

export const Concept = mongoose.model<IConcept>("Concept", ConceptSchema);
