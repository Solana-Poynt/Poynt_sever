import { Request, Response, NextFunction } from "express";
import AppError from "../../Utilities/Errors/appError";
import { statusCode } from "../../Utilities/utils";
import ConceptsService from "../../Services/Concept/concept.service";

const conceptService = new ConceptsService();

export const getConcepts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const concept = await conceptService.getConcepts(req, next);
    if (concept) {
      return res.status(statusCode.created()).json({
        success: true,
        message: "successful",
        data: concept,
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

export const getOneConcept = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const concept = await conceptService.getOneConcept(req, next);
    if (concept) {
      return res.status(statusCode.created()).json({
        success: true,
        message: "successful",
        data: concept,
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

export const createConcept = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newConcept = await conceptService.createConcept(req, next);
    if (newConcept) {
      return res.status(statusCode.created()).json({
        success: true,
        message: "successful",
        data: newConcept,
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

export const updateConcept = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedConcept = await conceptService.updateConcept(req, next);
    if (updatedConcept) {
      return res.status(statusCode.created()).json({
        success: true,
        message: "successful",
        data: updatedConcept,
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

export const deleteConcept = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedConcept = await conceptService.deleteConcept(req, next);
    if (deletedConcept) {
      return res.status(statusCode.created()).json({
        success: true,
        message: "successful",
        data: deletedConcept,
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
