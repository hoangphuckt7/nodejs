const Course = require("../models/Course");
const { mogooseToObject } = require("../../util/mongoose");
class CourseController {
  //[GET] /course/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mogooseToObject(course) });
      })
      .catch(next);
  }

  //[GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }

  //[POST] /courses/store
  store(req, res, next) {
    const formData = { ...req.body };
    formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect("/me/stored/course"))
      .catch((error) => {});
  }

  //[GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => {
        res.render("courses/edit", { course: mogooseToObject(course) });
      })
      .catch(next);
  }

  //[PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then((course) => res.redirect("/me/stored/course"))
      .catch(next);
  }

  //[DELETE] /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then((course) => res.redirect("back"))
      .catch(next);
  }

  //[PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then((course) => res.redirect("back"))
      .catch(next);
  }

  //[DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then((course) => res.redirect("back"))
      .catch(next);
  }

  //[POST] /courses/handle-form-actions
  handleFormActons(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "Action is invalid" });
    }
  }

  //[POST] /courses/handle-form-actions/trash
  handleFormActonsTrash(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.deleteOne({ _id: { $in: req.body.courseIds } })
          .then((course) => res.redirect("back"))
          .catch(next);
        break;

      case "restore":
        Course.restore({ _id: { $in: req.body.courseIds } })
          .then((course) => res.redirect("back"))
          .catch(next);
        break;

      default:
        res.json({ message: "Action is invalid" });
    }
  }
}

module.exports = new CourseController();
