const Course = require("../models/Course");
const { mutipleMogooseToObject } = require("../../util/mongoose");
class MeController {
  //[GET] /stored/course
  storedCourse(req, res, next) {
    let courseQuery = Course.find({});

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCourse]) =>
        res.render("me/stored-course", {
          deletedCourse,
          courses: mutipleMogooseToObject(courses),
        })
      )
      .catch(next);
  }

  //[GET] /trash/course
  trashCourse(req, res, next) {
    Course.findDeleted({})
      .then((courses) =>
        res.render("me/trash-course", {
          courses: mutipleMogooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
