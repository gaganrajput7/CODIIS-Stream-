const { Schema, model } = require("mongoose");

//common user collection

const userSchema = new Schema({
  name: { type: String, required: true, minlength: 3 },
  email: {
    type: String,
    required: true,
    minlength: 10,
    unique: [true, "Email already exists"],
  },
  password: { type: String, minlength: 8, required: true },
  role: { type: String, required: true, enum: ["Customer", "Admin"] },
});

const videoSchema = new Schema(
  {
    video: String,
  },
  { timestamps: true }
);

const purchasePlanSchema = new Schema({
  plan: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

const user = model("user", userSchema);
const videos = model("videos", videoSchema);
const purchaseedPlan = model("purchased", purchasePlanSchema);

module.exports = { user, videos, purchaseedPlan };
