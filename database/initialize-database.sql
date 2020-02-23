

CREATE TABLE IF NOT EXISTS accounts (
    personId INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL,    
    CONSTRAINT person_id PRIMARY KEY (personId)
);

CREATE TABLE IF NOT EXISTS blogposts (
    blogId INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    posted VARCHAR(255) NOT NULL,
    imageFile IMAGE NOT NULL,
    userId INT NOT NULL,
    CONSTRAINT blog_id PRIMARY KEY (blogId),
    CONSTRAINT id_fk FOREIGN KEY (userId) REFERENCES accounts(personId)
);

CREATE TABLE IF NOT EXISTS comments (
    commentId INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(255) NOT NULL,
    posted VARCHAR(255) NOT NULL,
    accountId INT NOT NULL,
    CONSTRAINT comment_id PRIMARY KEY (commentId),
    CONSTRAINT id_fk2 FOREIGN KEY (accountId) REFERENCES accounts(personId)
);

CREATE TABLE IF NOT EXISTS todoList (
    todoId INT NOT NULL AUTO_INCREMENT,
    todo VARCHAR(255) NOT NULL,
    CONSTRAINT todo_id PRIMARY KEY (todoId)
);

