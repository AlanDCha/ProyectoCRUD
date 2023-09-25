import chai from "chai";
import chaiHttp from "chai-http";
import { BlogModel } from "../models/index.js";
import { app } from "../app.js";

chai.should();

chai.use(chaiHttp);

describe('Blogs', () => { 
  beforeEach( done => {
    BlogModel.deleteMany({})
      .then(done());
  });

  describe('/GET blog', () => {  
    it("it should GET all the blogs", done => {
      chai
        .request(app)
        .get("/api/blogs")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST blog', () => {  
    it("it should new POST  blog", done => {
      let blog = {
        title: "This is the first blog",
        body: "This is a blog post",
      };
      chai
        .request(app)
        .post("/api/blogs")
        .send(blog)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          res.body.status.should.be.eql("success");
          done();
        });
    });
  });

  describe('/GET/:id blog', () => {  
    it("it should GET a blog by the id", done => {
      let blog = new BlogModel({
        title: "This is the first blog",
        body: "This is a blog post",
      });
      blog.save()
        .then((blog) => {
        chai
          .request(app)
          .get("/api/blogs/" + blog.id)
          .send(blog)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });

  describe('/PUT/:id blog', () => {  
    it("it should UPDATE a blog given the id", done => {
      let blog = new BlogModel({
        title: "This is the first blog",
        body: "This is a blog post",
      });
      blog.save()
        .then((blog) => {
        console.log(blog.id);
        chai
          .request(app)
          .put("/api/blogs/" + blog.id)
          .send({
            title: "The first blog was updated",
            body: "This is a blog post",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });

  describe('/DELETE/:id blog', () => {  
    it("it should DELETE a blog given the id", done => {
      let blog = new BlogModel({
        title: "This is the first blog",
        body: "This is a blog post",
      });
      blog.save()
        .then((blog) => {
        console.log(blog.id);
        chai
          .request(app)
          .delete("/api/blogs/" + blog.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
});