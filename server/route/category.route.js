import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddCategoryController, getCategoryController, updateCategoryController } from "../Controllers/categoryController.js";

const categoryRouter = Router()

categoryRouter.post("/add-category",auth,AddCategoryController)
categoryRouter.get("/get",getCategoryController)
categoryRouter.put("/update",auth,updateCategoryController)


export default categoryRouter