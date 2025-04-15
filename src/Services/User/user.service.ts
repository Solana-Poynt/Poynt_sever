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

type LeaderboardEntry =
  | (Pick<IUser, "name" | "email" | "poynts"> & { position: number })
  | { separator: string };

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

  public async getLeaderboardWithUserRank(
    req: any,
    next: NextFunction
  ): Promise<any | void> {
    const { id } = req.user;
    const userId = id;
    // Fetch all users sorted by poynts descending
    const allUsers = await User.find({})
      .sort({ poynts: -1 })
      .select("name email poynts") // Only fetch necessary fields
      .lean();

    // Get top 20 earners
    const top20 = allUsers.slice(0, 20).map((user, index) => ({
      ...user,
      position: index + 1,
    }));

    // Get first 2 separately
    const firstTwo = top20.slice(0, 2);

    // Find current user and their position
    const userIndex = allUsers.findIndex(
      (user) => user._id.toString() === userId.toString()
    );

    const userInRank = userIndex !== -1;
    const user = allUsers[userIndex];

    const userEntry = userInRank
      ? {
          ...user,
          position: userIndex + 1,
        }
      : null;

    // Prepare final list
    const leaderboard: LeaderboardEntry[] = [...firstTwo];

    // Add users 3 to 20 (excluding duplicates)
    for (let i = 2; i < top20.length; i++) {
      leaderboard.push(top20[i]);
    }

    // If user is not in top 20, append their entry
    if (userEntry && userEntry.position > 20) {
      leaderboard.push({ separator: "..." }, userEntry);
    }

    return leaderboard;
  }
}
