import mongoose, { Schema, models } from "mongoose";

const projectSchema = new Schema(
  {
    received: { type: Date, default: Date.now },
    client: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    programmer1: {
      type: String,
      required: true,
    },
    programmer2: {
      type: String,
    },
    confirmit: {
      type: String,
      required: true,
    },
    tester: {
      type: String,
    },
    scriptqc: {
      type: String,
    },
    manager: {
      type: String,
    },
    size: {
      type: Number,
    },
    status: {
      type: String,
    },
    launch: { type: Date, default: Date.now },
    delivery: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Project = models.Project || mongoose.model("Project", projectSchema);
export default Project;
