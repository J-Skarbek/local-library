const Author = require('..models/author');
const asyncHandler = require('express-async-handler');

//Display list of authors
exports.author_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author List');
})

//Display detail page for specific Author
exports.author_detail = asyncHandler(async (req, rest, next) => {
  res.send(`NOT IMPLEMENTED: Author Detail: ${req.params.id}`);
})

//Display Author create form on a GET
exports.author_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author create GET');
})

//Handle Author create on POST
exports.author_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author create POST');
})

//Display Author delete form on GET
exports.author_delete.get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author delete GET');
})

//Handle Author delete on POST
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author delete POST');
})

// Display Author update form on GET.
exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author update GET');
})

// Handle Author update on POST.
exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author update POST');
})