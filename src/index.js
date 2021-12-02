const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require('method-override')
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;
const hbs = exphbs.create({
  extname: ".hbs",
  helpers: {
    sum: (a, b) => a + b,
  },
});

const route = require("./routes");
const db = require("./config/db");

//connect to db
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(methodOverride('_method'))

//http logger
app.use(morgan("combined"));

//template engine
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "resources", "views"));

//ROUTES Init
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
