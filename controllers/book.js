const express = require("express");
const router = express.Router();
const bookService = require("../services/book");

router.get("/", async (req, res) => {
    let [rows, fields] = await bookService.get();
    res.send(rows);
});

router.get("/:id", async (req, res) => {
    let [rows, fields] = await bookService.getById(req.params.id);
    res.send(rows);
});

router.post("/", async (req, res) => {
    let [rows, fields] = await bookService.create(req.body);
    res.send(rows);
});

router.put("/:id", async (req, res) => {
    let [rows, fields] = await bookService.update(req.params.id, req.body);
    res.send(rows);
});

module.exports = router;
