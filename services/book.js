const db = require("../db");

module.exports = {
    async get() {
        let sql = "select * from book";
        return db.runQuery(sql);
    },
    async getById(id) {
        let sql = "select * from book where id = ?";
        return db.runQuery(sql, [id]);
    },
    async create(data) {
        if (!data.title) throw Exception("Title is empty!");
        if (!data.author) throw Exception("Author is empty!");
        if (!data.year) throw Exception("Yearis empty!");
        if (!data.category_id) throw Exception("Category is empty!");

        let sql = "insert into book (title, author, year, category_id) values (?, ?, ?, ?)";
        return db.runQuery(sql, [data.title, data.author, data.year, data.category_id]);
    },
    async update(id, data) {
        if (!data.title) throw Exception("Title is empty!");
        if (!data.author) throw Exception("Author is empty!");
        if (!data.year) throw Exception("Yearis empty!");
        if (!data.category_id) throw Exception("Category is empty!");

        let sql = "update book set title = ?, author = ?, year = ?, category_id = ? where id = ?";
        return db.runQuery(sql, [data.title, data.author, data.year, data.category_id, id]);
    },
};
