const express = require("express");
const bodyParser = require("body-parser");
const { connect } = require("mongoose");
const cors = require("cors");
const { success, error } = require("consola");
const { DB, PORT } = require("./config");
const MONGO_DB_URL =
"mongodb+srv://apitesting:apitesting@cluster0.z38n2.mongodb.net/apitesting?retryWrites=true&w=majority"
/*------------------------initialize express app----------------------------*/
const app = express();

/*----------------load routes ---------------------------*/
const posts = require("./Routes/posts");

/*----------------ending routes --------------------------*/
/*-----------------------middleware starts here ----------------------------*/
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*-----------------------middleware ends here ----------------------------*/
//post routes here
app.use("/posts", posts);
/*---------------------end of post routes --------------------------------*/

let startApp = async () => {
  try {
    await connect(MONGO_DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true,
    });
    success({
      message: `successfully Database connected ${MONGO_DB_URL}`,

      badge: true,
    });
    const PORT=5000;

    //listen port
    app.listen(PORT, (err) => {
      if (err) {
        error({ message: err, badge: true });
      }
      success({ message: `Server is running on ${PORT}`, badge: true });
    });
  } catch (err) {
    error({ message: `unable to connect database ${MONGO_DB_URL}`, badge: true });
  }
};
startApp();
