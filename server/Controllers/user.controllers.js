import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import { response } from "express";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageClodinary from "../utils/uplodeImageCloudnary.js";
import generatedOTP from "../utils/generatedOTP.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken";

//regiser controller
export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide Email, Name, Password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Email Already In Use",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };
    const newUser = await UserModel(payload);
    const save = await newUser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?.id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "verify email from Quick_Drop",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });
    return res.json({
      message: "User Register Successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Registration failed",
      success: false,
      error: true,
    });
  }
}

//verify email controller
export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body;

    const user = await UserModel.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Code",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.updateOne(
      { _id: code },
      { verify_email: true }
    );
    return res.json({
      message: "Verifycation Email Done!",
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
}

//login controller
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Provide Email And Pasword",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User Not Register",
        error: true,
        success: false,
      });
    }
    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact To Admin",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Check Your Password",
        error: true,
        success: false,
      });
    }

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.json({
      message: "Login Successsfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//logout controller
export async function logoutController(req, res) {
  try {
    const userid = req.userId; //coming from middleware

    if (!userid) {
      return res.status(400).json({
        message: "Unauthorized",
        error: true,
        success: false,
      });
    }

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });
    return res.json({
      message: "Logout Successfully!",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//upload user avatar
export async function uploadAvatar(req, res) {
  try {
    const userId = req.userId; //coming from auth middleware
    const image = req.file; //coming from multer middleware

    const upload = await uploadImageClodinary(image);
    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });
    return res.json({
      message: "Upload Profile Successfully!",
      success:true,
      error:false,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//update user details
export async function updateUserDetails(req, res) {
  try {
    const userId = req.userId; //auth middleware
    const { name, email, mobile, password } = req.body;

    let hashPassword = "";

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }

    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      }
    );
    return res.json({
      message: "Update User Successfully!",
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//forgot password not login
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email Not Available",
        error: true,
        success: false,
      });
    }

    const otp = generatedOTP();
    const expireTime = new Date() + 60 * 60 * 1000; //1hour

    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "Forgot Password From QuickDrop",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    });

    return res.json({
      message: "Check Your Email",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//verify forgot password otp
export async function verifyForgotPasswordOTP(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Provide required field email, OTP.",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email Not Available",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();

    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({
        message: "OTP is expired",
        error: true,
        success: false,
      });
    }
    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    //if otp is not expaired
    // otp === user.forgot_password_otp

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      forgot_password_otp: "",
      forgot_password_expiry: "",
    });

    return res.json({
      message: "Verify OTP successfully!",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//reset the password
export async function resetPassword(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Provide Required Fields email, newPassword, confirmPassword",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email is Not Available",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "newPassword And confirmPassword must be same",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    const update = await UserModel.findOneAndUpdate(user._id, {
      password: hashPassword,
    });

    return res.json({
      message: "Password Update Successfully!",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//refresh token controller
export async function refreshToken(req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]; //{Bearer Token}
    if (!refreshToken) {
      return res.status(401).json({
        message: "Invalid Token",
        error: true,
        success: false,
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifyToken) {
      return res.status(401).json({
        message: "Token Is Expired",
        error: true,
        success: false,
      });
    }
    const userId = verifyToken?._id;
    const newAccessToken = await generatedAccessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookiesOption);
    return res.json({
      message: "New Access Token Generated",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get login user details
export async function userDetails(req, res) {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId).select(
      "-password -refresh_Token"
    );

    return res.json({
      message: "user details",
      data: user,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something Is Wrong",
      error: true,
      success: false,
    });
  }
}
