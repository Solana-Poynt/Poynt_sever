import { Request, Response, NextFunction } from "express";
import AppError from "../../Utilities/Errors/appError";
import ReviewRepository from "../../Repository/Review/review.repository";
import UserRepository from "../../Repository/Users/user.repository";
import { IReview } from "../../Models/Reviews/review.model";
import Utilities, { statusCode } from "../../Utilities/utils";
import { MalierService } from "../Email/mailer";
import { IUser, User } from "../../Models/Users/user.model";

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
    const { userId, poyntValue } = req.body;
    const usersData = await userRepository.findUserById(userId);
    if (!usersData) {
      return next(
        new AppError("User does not exist", statusCode.internalServerError())
      );
    }
    const payload: Partial<IUser> = {
      poynts: Number(usersData?.poynts) + Number(poyntValue),
    };
    const user = await userRepository.updateUserPoynts(userId, payload);
    if (!user) {
      return next(
        new AppError(
          "Unable to make increase poynt",
          statusCode.internalServerError()
        )
      );
    }
    return user;
  }

  public async addEngagement(req: any, next: NextFunction) {
    const { campaignId } = req.body;
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return next(
        new AppError("User does not exist", statusCode.internalServerError())
      );
    }
    const updatedAdsEngaged = user.adsEngaged.includes(campaignId)
      ? user.adsEngaged
      : [...user.adsEngaged, campaignId];
    user.adsEngaged = updatedAdsEngaged;
    await user.save();

    return user;
  }

  public async addTasksDone(req: any, next: NextFunction) {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return next(
        new AppError("User does not exist", statusCode.internalServerError())
      );
    }
    const updatedTaskDone = Number(user.taskDone) + 3;
    user.taskDone = updatedTaskDone;
    await user.save();

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
