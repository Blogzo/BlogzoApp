
CREATE TABLE accounts (
    personId int NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL,    
    CONSTRAINT id_pk PRIMARY KEY (personId)
)

