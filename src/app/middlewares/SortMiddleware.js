module.exports = function SortMiddleware(req, res, next) {
  res.locals._sort = {
    enabled: false,
    type: "default",
  };

  if (req.query.hasOwnProperty("_sort")) {
    // check nếu có _sort trên url thì định nghĩa lại res.locals._sort
    Object.assign(res.locals._sort, {
      enabled: true,
      type: req.query.type, // res.locals._sort.type bằng với type được truyền lên trên url
      column: req.query.column,
    });
  }

  next();
};
