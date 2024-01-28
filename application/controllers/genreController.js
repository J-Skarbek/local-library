const Genre = require("../models/genre");
const Book = require("../models/book")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Genre.
exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().sort({ family_name: 1 }).exec();
  res.render("genre_list", {
    title: "Genre List",
    genre_list: allGenres,
  });
  // res.send("NOT IMPLEMENTED: Genre list");
});

// Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec()
  ]);

  if (genre === null) {
    const err = new Error('Genre not found');
    err.status = 404;
    return next(err);
  }
   
  res.render("genre_detail", {
    title: "Genre Detail Page",
    genre: Genre,
    genre_books: booksInGenre
  })

  // res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
});

// Display Genre create form on GET.
exports.genre_create_get = (req, res, next) => {
  res.render('genre_form', { title: 'Create Genre'});
  // res.send("NOT IMPLEMENTED: Genre create GET");
};

// Handle Genre create on POST.
exports.genre_create_post = [
  //Validate and sanitize the name field
  body('name', 'Genre name must contain at least three characters!')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  //Process request after the validation and sanitization
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);
    
    // Create a genre object w/ escaped and trimmed data
    const genre = new Genre ({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors -- render the form again with sanitized values/error
      // messages
      res.render('genre_form', {
        title: 'Create Genre',
        genre: genre,
        errors: errors.array()
      });
      return;
    } else {
      // Data from the form is valid
      // Check if  Genre w/ same name already exists
      const genreExists = await Genre.findOne({ name: req.body.name })
        .collation({ locale: 'en', strength: 2 })  
        .exec();
      if (genreExists) {
        // Genre exists, redirect to its detail page
        res.redirect(genreExists.url);
      } else {
        await genre.save();
        // new genre saved. Redirect to genre detail page.
        res.redirect(genre.url);
      }
    }
  }),
];

// exports.genre_create_post = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: Genre create POST");
// });

// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
