const express = require("express");
const router = express.Router();


// Index - list all posts
router.get("/", (req, res) => {
    res.send("GET all posts");
});

// New - show form to create new post
router.get("/new", (req, res) => {
    res.send("Form to create a new post");
});

// Create - actually create post
router.post("/", (req, res) => {
    res.send("POST to create a new post");
});

// Show - show one post
router.get("/:id", (req, res) => {
    res.send(`GET post with id ${req.params.id}`);
});

// Edit - show form to edit post
router.get("/:id/edit", (req, res) => {
    res.send(`Form to edit post with id ${req.params.id}`);
});

// Update - actually update post
router.put("/:id", (req, res) => {
    res.send(`PUT update post with id ${req.params.id}`);
});

// Delete - delete post
router.delete("/:id", (req, res) => {
    res.send(`DELETE post with id ${req.params.id}`);
});

module.exports = router;


