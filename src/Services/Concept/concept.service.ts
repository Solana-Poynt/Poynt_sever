import { Request, Response, NextFunction } from "express";
import AppError from "../../Utilities/Errors/appError";
import { statusCode } from "../../Utilities/utils";
import ConceptsRepository from "../../Repository/Concepts/concept.repository";
import { IConcept } from "../../Models/Concepts/concepts.model";

const conceptsRepository = new ConceptsRepository();

export default class ConceptsService {
  public async getConcepts(
    req: any,
    next: NextFunction
  ): Promise<IConcept[] | void> {
    const concept = await conceptsRepository.findConcepts();
    if (!concept) {
      return next(
        new AppError("Unable to get concepts", statusCode.internalServerError())
      );
    }
    return concept;
  }

  public async getOneConcept(
    req: any,
    next: NextFunction
  ): Promise<IConcept | void> {
    const { id } = req.params;
    const concept = await conceptsRepository.findConceptById(id);
    if (!concept) {
      return next(
        new AppError(
          "Unable to get single concept",
          statusCode.internalServerError()
        )
      );
    }
    return concept;
  }

  public async createConcept(
    req: any,
    next: NextFunction
  ): Promise<IConcept | void> {
    const data = req.body;
    const concept = await conceptsRepository.create(data);
    if (!concept) {
      return next(
        new AppError(
          "Unable to create concept",
          statusCode.internalServerError()
        )
      );
    }
    return concept;
  }

  public async updateConcept(
    req: any,
    next: NextFunction
  ): Promise<IConcept | void> {
    const data = req.body;
    const { id } = req.params;
    const concept = await conceptsRepository.updateConcept(id, data);
    if (!concept) {
      return next(
        new AppError(
          "Unable to update concept",
          statusCode.internalServerError()
        )
      );
    }
    return concept;
  }

  public async deleteConcept(
    req: any,
    next: NextFunction
  ): Promise<IConcept | void> {
    const { id } = req.params;
    const concept = await conceptsRepository.deleteConcept(id);
    if (!concept) {
      return next(
        new AppError(
          "Unable to delete concept",
          statusCode.internalServerError()
        )
      );
    }
    return concept;
  }
}
