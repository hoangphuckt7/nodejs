const Course = require("../models/Course");
const { mutipleMogooseToObject } = require("../../util/mongoose");
class MeController {
  //[GET] /stored/course
  storedCourse(req, res, next) {

    Promise.all([Course.find({}), Course.countDocumentsDeleted()])
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
