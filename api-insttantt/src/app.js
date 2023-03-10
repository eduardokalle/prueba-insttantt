import express from "express";
const cors = require('cors');

const app = express();

var corsOptions = {
  // origin: "https://front-admin-7emizl7ze-eduardokallek.vercel.app"
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
};

app.use(cors(corsOptions));

app.use(express.static(__dirname + "../../front-insttantt"));

app.get("/", (req, res) => {
   res.json({ message: "Welcome to API INSTTANTT" });
 });



export default app;
