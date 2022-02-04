const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const communicationSchema = new Schema(
  {
    communicationId: {
      type: String,
      unique: true,
      index: true,
      required: true,
      default: null,
    },
    communicationType: {
      type: String,
      unique: false,
      index: true,
      required: false,
      default: null,
    },
    dateAndTime: {
      type: Date,
      unique: false,
      index: true,
      required: false,
      default: null,
    },
    url: {
      type: String,
      unique: false,
      index: true,
      required: false,
      default: null,
    },
    title: {
      type: String,
      unique: false,
      index: true,
      required: false,
      default: null,
    },
    visibleTo: {
      type: String,
      unique: false,
      index: true,
      required: false,
      default: null,
    },
    description: {
      type: String,
      unique: false,
      index: true,
      required: false,
      default: null,
    },
    attachmentUrl: {
      type: String,
      unique: false,
      index: true,
      required: false,
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);



module.exports = mongoose.model("communication", communicationSchema);
