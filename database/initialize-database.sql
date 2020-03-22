

CREATE TABLE IF NOT EXISTS accounts (
    personId INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    userPassword VARCHAR(255) NOT NULL,    
    CONSTRAINT person_id PRIMARY KEY (personId)
);

CREATE TABLE IF NOT EXISTS blogposts (
    blogId INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    posted VARCHAR(255) NOT NULL,
    imageFile VARCHAR(255) NOT NULL,
    userId INT NOT NULL,
    CONSTRAINT blog_id PRIMARY KEY (blogId),
    CONSTRAINT id_fk FOREIGN KEY (userId) REFERENCES accounts(personId)
);

CREATE TABLE IF NOT EXISTS todoList (
    todoId INT NOT NULL AUTO_INCREMENT,
    todo VARCHAR(255) NOT NULL,
    CONSTRAINT todo_id PRIMARY KEY (todoId),
    userId INT NOT NULL,
    CONSTRAINT id_fk FOREIGN KEY (userId) REFERENCES accounts(personId)
);