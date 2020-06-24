

CREATE TABLE IF NOT EXISTS accounts (
    accountId INT NOT NULL AUTO_INCREMENT,
    accountUsername VARCHAR(255) NOT NULL UNIQUE,
    accountEmail VARCHAR(255) NOT NULL UNIQUE,
    accountPassword VARCHAR(255) NOT NULL,    
    CONSTRAINT account_id PRIMARY KEY (accountId)
);

CREATE TABLE IF NOT EXISTS blogposts (
    blogId INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    posted VARCHAR(255) NOT NULL,
    imageFile VARCHAR(255) NOT NULL,
    accountId INT NOT NULL,
    CONSTRAINT blog_id PRIMARY KEY (blogId),
    CONSTRAINT id_fk FOREIGN KEY (accountId) REFERENCES accounts(accountId)
);

CREATE TABLE IF NOT EXISTS todoItems (
    todoId INT NOT NULL AUTO_INCREMENT,
    todo VARCHAR(255) NOT NULL,
    CONSTRAINT todo_id PRIMARY KEY (todoId),
    accountId INT NOT NULL,
    CONSTRAINT id_fk FOREIGN KEY (accountId) REFERENCES accounts(accountId)
);