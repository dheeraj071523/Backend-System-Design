import { Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = function (password) {
  return compare(password, this.password);
};

const User = model("User", userSchema);
export default User;
