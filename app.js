const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
uuidv4();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const comments = [
    {
        id: uuidv4(),
        username: "Todd",
        comment: "lol that is so funny!"
    },
    {
        id: uuidv4(),
        username: "Skyler",
        comment: "I like to go birdwatching with my dog"
    },
    {
        id: uuidv4(),
        username: "Sk8erBoi",
        comment: "Please delete your account, Todd"
    },
    {
        id: uuidv4(),
        username: "onlysayswoof",
        comment: "woof woof woof"
    }
]

app.get("/comments", (req, res) => {
    res.render("comments/index.ejs", {comments});
})

app.get("/comments/new", (req, res) => {
    res.render("comments/new.ejs")
})

app.post("/comments", (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuidv4() })
    res.redirect("/comments");
})

app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/show.ejs", { comment });
})

app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/edit.ejs", { comment });
})

app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect("/comments");
})

app.listen(port, () => {
    console.log(`On Port ${port}`);
})