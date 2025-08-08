import mongoose, { Schema, Document } from "mongoose";

export interface ICounter {
  _id: string;
  seq: number;
}

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
  question_id: { type: Number, required: true, unique: true },
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
  topic_id: { type: Number, required: true, unique: true },
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

ConceptSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.concept_id = await getNextSequence("concept_id");

    // Assign topic IDs for new topics
    for (const topic of this.topics) {
      topic.topic_id = await getNextSequence("topic_id");

      // Assign question IDs for new questions
      for (const question of topic.questions) {
        question.question_id = await getNextSequence("question_id");
      }
    }
  }
  next();
});

export const Concept = mongoose.model<IConcept>("Concept", ConceptSchema);

const CounterSchema = new Schema<ICounter>({
  _id: { type: String, required: true }, // name of the sequence (e.g. 'concept_id')
  seq: { type: Number, default: 0 },
});

async function getNextSequence(name: string): Promise<number> {
  const counter = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

export const Counter = mongoose.model<ICounter>("Counter", CounterSchema);
