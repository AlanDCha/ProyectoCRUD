import 'dotenv/config';
import express from "express";
import path from "path";
import morgan from 'morgan';
import { fileURLToPath } from "url";
import { router } from "./backend/routes/index.js";
import { connectDB } from "./backend/connection/connMongoDB.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT;
const app = express();

// * Settings
// app.set('view engine', 'ejs');

// * Middlewares
app.use(morgan('tiny'))
app.use(express.json())
app.use("/api/blogs", router);

// * Routes
app.get('/login', (req, res) => {
  res.render("login")
})

// app.get('/', (req, res) => {
  // res.render('index')
  // axios.get('http://localhost:3000/api/blogs')
  //   .then(resp => {
  //     res.render('index', {todo: resp.data});
  //   })
  //   .catch(err => {
  //     res.status(400).send("El error es ", err);
  //   })
  // app.get('/api/blogs', (requ, resp) => {
  //   res.render('index', {todo: resp.data})
  // })
// })

app.use(express.static('public'))


// * Mount server
const start = async() => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start();