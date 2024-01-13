const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
  book: {
    type: String,
    ref: "Book",
    required: true
  },
  imprint: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: [
      "Available",
      "Maintenance",
      "Loaned",
      "Reserved"
    ],
    default: "Maintenance"
  },
  due_back: {
    type: Date,
    default: Date.now
  }
});

// Virtual for bookInstance's URL
BookInstanceSchema.virtual('url').get(function () {
  return `/catalog/bookInstance/${this._id}`;
});

module.exports = mongoose.model('bookInstance', BookInstanceSchema);