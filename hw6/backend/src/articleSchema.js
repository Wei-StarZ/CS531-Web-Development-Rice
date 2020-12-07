const mongoose = require('mongoose');

const article = {
	_id: Number,
  author: String,
	text: String,
	date: Date,
	comments: {},
	image: String
}

module.exports = article;
