CREATE DATABASE `zero_library` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `zero_library`.`book` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL,
  `year` INT NULL,
  `author` VARCHAR(255) NULL,
  `category_id` INT NULL,
  PRIMARY KEY (`id`));


INSERT into `zero_library`.book (id, title, author, year, category_id) VALUES (1, 'a great book title', 'kenny susanto', 2022, 1);
INSERT into `zero_library`.book (id, title, author, year, category_id) VALUES (2, 'the dumb book', 'kenny susanto', 2022, 3);
INSERT into `zero_library`.book (id, title, author, year, category_id) VALUES (3, 'the philosophy of programming', 'kenny susanto', 2022, 2);
INSERT into `zero_library`.book (id, title, author, year, category_id) VALUES (4, 'the enigma of chairs', 'kenny susanto', 2021, 5);
INSERT into `zero_library`.book (id, title, author, year, category_id) VALUES (5, 'the bubble of coffee', 'kenny susanto', 2020, 9);
INSERT into `zero_library`.book (id, title, author, year, category_id) VALUES (6, 'the wood in the woods', 'kenny susanto', 2022, 8);
INSERT into `zero_library`.book (id, title, author, year, category_id) VALUES (7, 'the bool of book', 'kenny susanto', 2020, 10);