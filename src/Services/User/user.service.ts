import { Request, Response, NextFunction } from "express";
import AppError from "../../Utilities/Errors/appError";
import ReviewRepository from "../../Repository/Review/review.repository";
import UserRepository from "../../Repository/Users/user.repository";
import { IReview } from "../../Models/Reviews/review.model";
import Utilities, { statusCode } from "../../Utilities/utils";
import { MalierService } from "../Email/mailer";
import { IUser } from "../../Models/Users/user.model";

const reviewRepository = new ReviewRepository();
const userRepository = new UserRepository();
const util = new Utilities();
const mail = new MalierService();

export default class UserService {
  public async getUser(req: any, next: NextFunction): Promise<IReview | void> {
    const { id } = req.user;
    const user = await userRepository.findUserById(id);
    if (!user) {
      return next(
        new AppError("Unable to get user", statusCode.internalServerError())
      );
    }
    return user;
  }

  public async fundPoynt(req: any, next: NextFunction): Promise<IUser | void> {
    const { driverId, poyntValue } = req.body;
    const driversData = await userRepository.findUserById(driverId);
    if (!driversData) {
      return next(
        new AppError("Driver does not exist", statusCode.internalServerError())
      );
    }
    const payload: Partial<IUser> = {
      poynts: Number(driversData?.poynts) + Number(poyntValue),
    };
    const user = await userRepository.updateUserPoynts(driverId, payload);
    if (!user) {
      return next(
        new AppError("Unable to make payment", statusCode.internalServerError())
      );
    }
    return user;
  }

  public async makeReview(
    req: any,
    next: NextFunction
  ): Promise<IReview | void> {
    const { rating, reviewMessage, reviewer, locationReviewed } = req.body;
    const payload: IReview = {
      rating,
      reviewMessage,
      reviewer,
      locationReviewed: {
        locationName: locationReviewed.locationName,
        meridian: locationReviewed.meridian,
      },
    };
    const review = await reviewRepository.makeReview(payload);
    if (!review) {
      return next(
        new AppError("Unable to make review", statusCode.internalServerError())
      );
    }
    return review;
  }

  public async getReviews(
    req: any,
    next: NextFunction
  ): Promise<IReview[] | void> {
    const { location } = req.body;
    const review = await reviewRepository.getReviews(location.locationName);
    if (!review) {
      return next(new AppError("Unable to get review", statusCode.conflict()));
    }
    return review;
  }
}
