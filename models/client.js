import mongoose, { Schema, models } from "mongoose";

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: { unique: true, dropDups: true },
    },
  },
  { timestamps: true }
);

const Client = models.Client || mongoose.model("Client", clientSchema);
export default Client;
