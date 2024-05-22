CREATE TABLE tasks (
    taskid SERIAL NOT NULL,
    description varchar(255) NOT NULL,
    status varchar(255) NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE,
    userid INTEGER NOT NULL,
    PRIMARY KEY(taskid),
    FOREIGN KEY (userid) REFERENCES users(id)
);