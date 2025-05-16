import { Router } from "express";
import auth from "../middleware/auth";
import { AddSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController } from "../Controllers/subCategorycontroller";

const subCategoryRouter = Router()

subCategoryRouter.post("/create",auth,AddSubCategoryController)
subCategoryRouter.post("/get",getSubCategoryController)
subCategoryRouter.put("/update",auth,updateSubCategoryController)
subCategoryRouter.delete("/delete",auth,deleteSubCategoryController)

export default subCategoryRouter