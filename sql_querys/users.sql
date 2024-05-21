CREATE TABLE users (
    userid SERIAL NOT NULL,
    mail varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE
);