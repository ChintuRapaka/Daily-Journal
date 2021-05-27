const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const app = express();

var journals = [];
var journalid = 0;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", {
    journals: journals
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/new-entry", (req, res) => {
  res.render("new-entry");
});

app.get("/posts/:post_id", (req, res) => {
  var post;
  journals.forEach((journal) => {
    if (journal.id === Number(req.params.post_id)) {
      post = journal;
    }
  })
  res.render('post', {
    title: post.title,
    content: post.content
  })
})

app.post("/", (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let obj = {
    id: journalid,
    title: title,
    content: content
  }
  journalid++;
  journals.push(obj);
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is up and running...");
});