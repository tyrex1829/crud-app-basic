const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const comments = [
    {
        username: "Todd",
        comment: "lol that is so funny!"
    },
    {
        username: "Skyler",
        comment: "I like to go birdwatching with my dog"
    },
    {
        username: "Sk8erBoi",
        comment: "Please delete your account, Todd"
    },
    {
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
    comments.push({username, comment})
    res.redirect("/comments");
})
// app.post("/", () => {
//     res.send();
// })

app.listen(port, () => {
    console.log(`On Port ${port}`);
})