import mongoose from "mongoose";
import 'dotenv/config';
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./backend/routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use("/api/blogs", router);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/index.html'))
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
})


// mongoose.connect(
//   process.env.MONGODB_URI,
//   {
//     useNewUrlParser: true,
//     dbName: 'padrinos',
//   }
// )
// .then(console.log("Connected to MongoDB"))
// .catch(err => console.log(err))
// .finally(console.log("Executed"))