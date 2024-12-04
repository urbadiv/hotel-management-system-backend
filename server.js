//package ekama adala eka variable ekakata save karanawa, ethakota variable ekenma ekapara call karanna puluwan :)

const express = require("express"); //declare dependencies
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8070; //8070 OR 8070 eka nattan wena available ekak

app.use(cors()); //declare karapuwa use karanawa
app.use(bodyParser.json());

const URL = "mongodb+srv://bhawan:200132400588@atlascluster.fl5bp73.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"; 

mongoose.connect(URL, { //connect mongodb
    //useCreateIndex: true, 
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //useFindAndModify: false
});

const connection = mongoose.connection; //hadagatta connection eka open karagannawa
connection.once("open", () => {
    console.log("Mongodb connection success!"); //if success
})

const productRouter = require("./routes/products.js");
const categoryRouter = require("./routes/categorys.js");


app.use("/products",productRouter); //assign wela thiyena file eka load wenna
app.use("/categorys",categoryRouter);

app.listen(PORT, () => { //ara port eka listn krnna
    console.log(`Server is up and running on port number: ${PORT}`);
});
