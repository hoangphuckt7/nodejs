const Course = require("../models/Course");
const { mutipleMogooseToObject } = require("../../util/mongoose");
class SiteController {
  //[GET] /news
  home(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", {
          courses: mutipleMogooseToObject(courses),
        });
      })
      .catch(next);
  }

  //[GET] /news/:slug
  seach(req, res) {
    res.render("seach");
  }
}

module.exports = new SiteController();
