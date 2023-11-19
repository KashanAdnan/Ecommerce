import mongoose from "mongoose";

const connectDatabase = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log(`MongoDB Connected Succesfully!`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDatabase;
