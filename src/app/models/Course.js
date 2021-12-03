const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
var mongooseDelete = require('mongoose-delete');

const Course = new Schema(
  {
    name: { type: "String", required: true },
    description: { type: "String" },
    image: { type: "String" },
    videoId: { type: "String" },
    level: { type: "String" },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);


//All plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
  deletedAt : true,
  overrideMethods: 'all',
});

module.exports = mongoose.model("Course", Course);
