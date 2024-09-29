import { Request, Response, NextFunction } from "express";
import UserService from "../../Services/User/user.service";
import AppError from "../../Utilities/Errors/appError";
import { statusCode } from "../../Utilities/utils";

const userService = new UserService();

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUser(req, next);
    if (user) {
      return res.status(statusCode.created()).json({
        success: true,
        message: "successful",
        data: user,
      });
    }
  } catch (err) {
    return next(
      new AppError(
        `something went wrong ${err}`,
        statusCode.internalServerError()
      )
    );
  }
};

export const makeReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const review = await userService.makeReview(req, next);
    if (review) {
      return res.status(statusCode.created()).json({
        success: true,
        message: "Review successful",
        data: review,
      });
    }
  } catch (err) {
    return next(
      new AppError(
        `something went wrong ${err}`,
        statusCode.internalServerError()
      )
    );
  }
};

export const getReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const review = await userService.getReviews(req, next);
    if (review) {
      return res.status(statusCode.created()).json({
        success: true,
        message: "Successful",
        data: review,
      });
    }
  } catch (err) {
    return next(
      new AppError(
        `something went wrong ${err}`,
        statusCode.internalServerError()
      )
    );
  }
};
