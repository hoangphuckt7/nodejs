const Course = require("../models/Course");
const { mutipleMogooseToObject } = require("../../util/mongoose");
class MeController {
  //[GET] /stored/course
  storedCourse(req, res, next) {
    Course.find({})
      .then((courses) =>
        res.render("me/stored-course", {
          courses: mutipleMogooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
