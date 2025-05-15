import SubCategoryModel from "../models/subCategory.model.js";

export const AddSubCategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body;

    if (!name && !image && !category[0]) {
      return res.status(400).json({
        message: "Provide Name, Image, Category",
        error: true,
        success: false,
      });
    }

    const payload = {
      name,
      image,
      category,
    };

    const createSubCategory = new SubCategoryModel(payload);
    const save = await createSubCategory.save();

    return res.json({
      message: "SubCategory Created",
      data: save,
      error: false,
      success: true,
    });
  } catch (error) {
    return req.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

