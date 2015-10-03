CREATE DATABASE bonsai;

CREATE USER 'bonsai'@'localhost' IDENTIFIED BY 'bonsai';
GRANT ALL PRIVILEGES ON bonsai . * TO 'bonsai'@'localhost'