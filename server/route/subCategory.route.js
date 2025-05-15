import { Router } from "express";
import auth from "../middleware/auth";
import { AddSubCategoryController } from "../Controllers/subCategorycontroller";

const subCategoryRouter = Router()

subCategoryRouter.post("/create",auth,AddSubCategoryController)

export default subCategoryRouter