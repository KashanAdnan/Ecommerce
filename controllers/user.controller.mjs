import User from "../models/user.model.mjs";
import otpModel from "../models/otp.model.mjs";
import {
  hashPassword
} from "../utils/hash.password.mjs";
import sendEmail from "../utils/send.email.mjs";
import generateOtp from "../utils/genrate.otp.mjs";
import emailVerification from "../template/email.template.mjs";
import {
  comparePassword
} from "../utils/compare.password.mjs";
import jwt from "jsonwebtoken"
import sendToken from "../utils/send.token.mjs";

const userRegister = async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;
    const isEmailExits = await User.findOne({
      email
    });
    if (isEmailExits) {
      res.status(400).json({
        success: false,
        message: "Email Already Exits!",
      });
      return;
    } else {
      const hashedPassword = await hashPassword(password);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      const otp = await generateOtp();
      const mailOptions = {
        subject: "Verify Email",
        html: emailVerification(otp, name),
      };
      await otpModel.create({
        email,
        otp,
      });
      sendEmail(email, mailOptions.subject, mailOptions.html);
      res.status(201).json({
        success: false,
        message: "Check Your Gmail Inbox For OTP !",
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const otpCode = async (req, res) => {
  try {
    const {
      otp,
      email
    } = req.body
    const otpUser = await otpModel.findOne({
      otp,
      email,
      isUsed: false
    })
    if (!otpUser) {
      res.status(400).json({
        success: false,
        message: "OTP is Incorrect!",
      });
      return;
    }
    await otpModel.updateOne({
      otp
    }, {
      isUsed: true
    })
    await User.updateOne({
      email
    }, {
      isVerify: true
    })

    res.status(200).json({
      success: true,
      message: "Email Verified Succcesfully!"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const loginUser = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body
    const emailExits = await User.findOne({
      email,
    }).select("+password")
    if (emailExits) {
      const passwordExits = await comparePassword(password, emailExits.password)
      if (!passwordExits) {
        res.status(400).json({
          success: false,
          isVerify: false,
          messsage: "Incorrect Details, Please Try Again!"
        })
        return;
      } else {
        if (emailExits.role === "admin") {
          res.status(293).json({
            success: true,
            messsage: "Admin"
          })
          return;
        }
        const isVerify = await User.findOne({
          email,
          isVerify: true
        })
        if (isVerify) {
          let dataToSend = {
            _id: emailExits._id
          }
          const token = sendToken(dataToSend)
          res.cookie("AUTHENTICATION_USER_TOKEN", token)
          res.status(200).json({
            success: true,
            isVerify: true,
            message: "Login SuccessFully!",
            token
          })
        } else {
          res.status(400).json({
            success: false,
            isVerify: false,
            message: "Email Not Verified, Verify your Email!"
          })
        }
      }
    } else {
      res.status(400).json({
        success: true,
        isVerify: false,
        message: "Incorrect Details, Please Try Again!"
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie("AUTHENTICATION_USER_TOKEN")
    res.status(200).json({
      success: true,
      message: "Logout Succesfullly!"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const profile = async (req, res) => {
  try {
    const token = req?.cookies?.AUTHENTICATION_USER_TOKEN;
    if (!token) {
      res.status(400).json({
        success: false,
        message: "Token Not Found!"
      })
    } else {
      const decodedData = await jwt.verify(token, process.env.JWT_SECRET_KEY)
      const _id = decodedData._id;
      const user = await User.findById({
        _id
      })
      res.status(200).json({
        success: true,
        user
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const updateProfile = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const body = req.body
    const user = await User.findByIdAndUpdate({
      _id: id
    }, {
      ...body
    }, {
      new: true
    })

    res.status(200).json({
      success: true,
      message: "Updated Succesfully!",
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete({
      _id: req.params.id
    })
    res.status(200).json({
      success: true,
      message: "Deleted Succesfully!"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json({
      success: true,
      users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const getSingleUsers = async (req, res) => {
  try {
    const user = await User.findById({
      _id: req.params.id
    })
    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
export default {
  userRegister,
  otpCode,
  loginUser,
  logout,
  deleteUser,
  profile,
  updateProfile,
  getUsers,
  getSingleUsers
};