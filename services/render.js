import axios from "axios";


export const homeRoute = (req, res) => {
  axios.get("/api/blogs")
    .then(resp => {
      res.render('index', {users: resp.data});
    })
    .catch(err => {
      res.send(err);
    })
}