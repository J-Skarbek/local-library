const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    maxLength: 100
  },
  family_name: {
    type: String,
    required: true,
    maxLength: 100
  },
  date_of_birth: {
    type: Date
  },
  date_of_death: {
    type: Date
  }
});

//Virutal property to construct author's full name
// without it being persisted to or commited to the db

AuthorSchema.virtual('name').get(function () {
  // We set the fullname to an empty string to avoid
  // potential errors if an author doesn't go by a first
  // or last name
  let fullName ='';
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  return fullName;
})

// This virtual create's the author's URL based on their
// mongo _id
AuthorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`;
})

module.exports = mongoose.model('author', AuthorSchema);