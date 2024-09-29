import { Review, IReview } from "../../Models/Reviews/review.model";

export default class ReviewRepository {
  async makeReview(payload: IReview): Promise<IReview> {
    const review: any = await Review.create(payload);
    return review as IReview;
  }

  async findReview(): Promise<IReview[] | null> {
    const reviews = await Review.find();
    return reviews as any;
  }

  async findOneReview(id: string): Promise<IReview | null> {
    const review: any = await Review.findOne({ _id: id })
      .lean()
      .select("-OTP -__v");
    return review as IReview;
  }

  async findUReviewById(reviewId: string): Promise<IReview | null> {
    const review: any = await Review.findById(reviewId).select(
      "-password -isEmailVerified"
    );
    return review as IReview;
  }

  async deleteReview(reviewId: string): Promise<IReview> {
    const review: any = await Review.findByIdAndDelete({ _id: reviewId });
    return review as IReview;
  }
}
