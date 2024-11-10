CREATE TABLE programs
(
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    durationTerms INT NOT NULL,
    tuition DECIMAL(10, 2) NOT NULL
);

INSERT INTO programs
    (id, name, description, durationTerms, tuition)
VALUES
    (1, 'Software development diploma', 'This program is designed to provide students with the knowledge and skills necessary to pursue a career in software development.', 4, 10000),
    (2, 'Software development post diploma', 'This program is designed to provide students with the knowledge and skills necessary to pursue a career in software development.', 3, 8000),
    (3, 'Certificate in software development', 'This program is designed to provide students with the knowledge and skills necessary to pursue a career in software development.', 2, 6000);