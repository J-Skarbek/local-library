// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const AuthorSchema = new Schema({
//   first_name: {
//     type: String,
//     required: true,
//     maxLength: 100
//   },
//   family_name: {
//     type: String,
//     required: true,
//     maxLength: 100
//   },
//   date_of_birth: {
//     type: Date
//   },
//   date_of_death: {
//     type: Date
//   }
// });

// //Virutal property to construct author's full name
// // without it being persisted to or commited to the db

// AuthorSchema.virtual('name').get(function () {
//   // We set the fullname to an empty string to avoid
//   // potential errors if an author doesn't go by a first
//   // or last name
//   let fullName ='';
//   if (this.first_name && this.family_name) {
//     fullname = `${this.family_name}, ${this.first_name}`;
//   }
//   return fullName;
// })

// // This virtual create's the author's URL based on their
// // mongo _id
// AuthorSchema.virtual('url').get(function () {
//   return `/catalog/author/${this._id}`;
// })

// module.exports = mongoose.model('author', AuthorSchema);


const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/author/${this._id}`;
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);