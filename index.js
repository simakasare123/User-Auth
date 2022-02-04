const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const cors = require("cors");
const csurf = require("csurf");
const compression = require("compression");
const app = express();


app.use(compression());
app.use(cors());
app.use(express.json());

const userdata = require("./routes/auth");
// const member = require("./routes/member");
const communication = require("./routes/communication");


mongoose.connect('mongodb://localhost:27017/sayasdata',{ useNewUrlParser: true,
useUnifiedTopology:true,
}).then(()=>{
console.log("CONNECTION OK")
})
.catch(err=>{
console.log("NOT CONNECTED")
console.log(err)
});


app.use("/app/" , userdata);
// app.use("/app/" , member);
app.use("/app/" , communication);


const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Listening on port ${port}...`));