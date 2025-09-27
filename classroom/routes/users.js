const express = require("express");
const router = express.Router();

// Index - list all users
router.get("/", (req, res) => {
    res.send("GET all users");
});

// New - show form to create new user
router.get("/new", (req, res) => {
    res.send("Form to create a new user");
});

// Create - actually create user
router.post("/", (req, res) => {
    res.send("POST to create a new user");
});

// Show - show one user
router.get("/:id", (req, res) => {
    res.send(`GET user with id ${req.params.id}`);
});

// Edit - show form to edit user
router.get("/:id/edit", (req, res) => {
    res.send(`Form to edit user with id ${req.params.id}`);
});

// Update - actually update user
router.put("/:id", (req, res) => {
    res.send(`PUT update user with id ${req.params.id}`);
});

// Delete - delete user
router.delete("/:id", (req, res) => {
    res.send(`DELETE user with id ${req.params.id}`);
});

module.exports = router;
