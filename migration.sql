CREATE TABLE users(
    id_user INTEGER NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT 1,
    PRIMARY key(id_user)
);

CREATE TABLE statuses(
    id_status INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY(id_status)
);

CREATE TABLE tasks(
    id_task INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    body VARCHAR(255),
    id_status INTEGER,
    PRIMARY KEY (id_task),
    FOREIGN KEY (id_status) REFERENCES statuses(id_status)
);

CREATE TABLE users_tasks(
    id_user INTEGER,
    id_task INTEGER,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_task) REFERENCES tasks(id_task)
);

ALTER TABLE tasks ADD COLUMN date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
CREATE TABLE products(
    id_product INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY(id_product)
);

ALTER TABLE tasks MODIFY COLUMN title VARCHAR(255) NOT NULL;
ALTER TABLE tasks MODIFY COLUMN body VARCHAR(255) NOT NULL;

CREATE TABLE priodidades(
    id_Prioridade INTEGER NOT NULL AUTO_INCREMENT,
    prioridade VARCHAR(255) NOT NULL,
    PRIMARY KEY(id_Prioridade)
)

ALTER TABLE tasks ADD COLUMN id_Prioridade INTEGER Foreign Key (id_Prioridade) REFERENCES (prioridades);