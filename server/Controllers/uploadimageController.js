import uploadImageClodinary from "../utils/uplodeImageCloudnary.js";

const uploadImageController = async (req, res) => {
  try {
    const file = req.file;

    console.log(file);
    

    const uploadImage = await uploadImageClodinary(file);

    return res.json({
      message: "Upload Done",
      data: uploadImage,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default uploadImageController;
