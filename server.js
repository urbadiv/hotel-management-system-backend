//package ekama adala eka variable ekakata save karanawa, ethakota variable ekenma ekapara call karanna puluwan :)

const express = require("express"); //declare dependencies
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8070; //8070 OR 8070 eka nattan wena available ekak
const dotenv = require("dotenv");
app.use(cors()); //declare karapuwa use karanawa
app.use(bodyParser.json());

// const URL = "mongodb+srv://bhawan:200132400588@atlascluster.fl5bp73.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";
const URL = "mongodb+srv://dineth550:20021213@studentms.q45in7h.mongodb.net/";

mongoose.connect(URL, {
  //connect mongodb
  //useCreateIndex: true,
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  //useFindAndModify: false
});

const connection = mongoose.connection; //hadagatta connection eka open karagannawa
connection.once("open", () => {
  console.log("Mongodb connection success!"); //if success
});

const productRouter = require("./routes/products.js");
const categoryRouter = require("./routes/categorys.js");
const authRouter = require("./routes/authRoutes.js");
const eventRouter = require("./routes/eventRoutes.js");
//----------------------------------------------------------------------------
const roomRouter = require("./routes/roomRoutes.js");
const menuItemRouter = require("./routes/roomRoutes.js");
const bookingRouter = require("./routes/bookingRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");
const invoiceRouter = require("./routes/invoiceRoutes.js");
//----------------------------------------------------------------------------
const roleRouter = require("./routes/roleRoutes");
const employeeRouter = require("./routes/employeeRoutes");
//----------------------------------------------------------------------------

app.use("/roles", roleRouter);
app.use("/employees", employeeRouter);
//----------------------------------------------------------------------------
app.use("/products", productRouter); //assign wela thiyena file eka load wenna
app.use("/categorys", categoryRouter);
app.use("/auth", authRouter);
app.use("/events", eventRouter);
app.use("/uploads", express.static(path.join(__dirname)));
//----------------------------------------------------------------------------
app.use("/rooms", roomRouter);
app.use("/menuItems", menuItemRouter);
app.use("/booking", bookingRouter);
app.use("/order", orderRouter);
app.use("/invoice", invoiceRouter);
//----------------------------------------------------------------------------

app.listen(PORT, () => {
  //ara port eka listn krnna
  console.log(`Server is up and running on port number: ${PORT}`);
});
