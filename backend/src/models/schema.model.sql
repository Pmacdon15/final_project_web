-- Switch to the master database
USE master;

GO
-- Terminate connections to the BVC_Portal database
ALTER DATABASE BVC_Portal
SET
    SINGLE_USER
WITH
ROLLBACK IMMEDIATE;

GO
-- Delete the BVC_Portal database if it exists
IF EXISTS (
    SELECT *
    FROM sys.databases
    WHERE
        name = 'BVC_Portal'
)
BEGIN
DROP DATABASE BVC_Portal;
END;


GO
-- Create the BVC_Portal database if it doesn't exist
IF NOT EXISTS (
    SELECT *
    FROM sys.databases
    WHERE
        name = 'BVC_Portal'
)
BEGIN
CREATE DATABASE BVC_Portal;
END;

GO
-- Use the BVC_Portal database
USE BVC_Portal;

GO
-- Create the programs table
CREATE TABLE programs (
    id INT IDENTITY (1, 1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    durationTerms INT NOT NULL,
    tuition DECIMAL(10, 2) NOT NULL
);

-- Create the courses table
CREATE TABLE courses (
    id INT IDENTITY (1, 1) PRIMARY KEY,
    programId INT,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    FOREIGN KEY (programId) REFERENCES programs (id) ON DELETE CASCADE
);

CREATE TABLE terms (
    id INT IDENTITY (1, 1) PRIMARY KEY,
    season VARCHAR(50) NOT NULL
);

CREATE TABLE courses_available_terms (
    id INT IDENTITY (1, 1) PRIMARY KEY,
    courseId INT NOT NULL,
    termSeason INT NOT NULL,
    FOREIGN KEY (courseId) REFERENCES courses (id) ON DELETE CASCADE,
    FOREIGN KEY (termSeason) REFERENCES terms (id)
);

-- Create the comments table
CREATE TABLE comments (
    -- Insert data into the courses table
    id INT IDENTITY (1, 1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    date DATETIME NOT NULL
);

-- Create the users table
CREATE TABLE users (
    id VARCHAR(10) PRIMARY KEY,
    isAdmin BIT NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    birthday VARCHAR(8) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL, --TODO: Remove this field
    program VARCHAR(255) NOT NULL, --TODO: Remove this field
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the user_programs table
CREATE TABLE user_programs (
    id INT IDENTITY (1, 1) PRIMARY KEY,
    userId VARCHAR(10) NOT NULL,
    programId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (programId) REFERENCES programs (id) ON DELETE CASCADE
);

-- Create the user_classes table
CREATE TABLE user_courses (
    id INT IDENTITY (1, 1) PRIMARY KEY,
    userId VARCHAR(10) NOT NULL,
    courseId INT NOT NULL UNIQUE,
    userTermId INT NOT NULL,
    termSeasonId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (courseId) REFERENCES courses (id) ON DELETE CASCADE,
    FOREIGN KEY (termSeasonId) REFERENCES terms (id)
    -- We will use the other tables to derive the data such as program ID course name, and description and any other data we need to attach
);

-- Insert data into the programs table
INSERT INTO
    programs (
        name,
        description,
        durationTerms,
        tuition
    )
VALUES (
        'Software development diploma',
        'This program is designed to provide students with the knowledge and skills necessary to pursue a career in software development.',
        4,
        10000
    ),
    (
        'Software development post diploma',
        'This program is designed to provide students with the knowledge and skills necessary to pursue a career in software development.',
        3,
        8000
    ),
    (
        'Certificate in software development',
        'This program is designed to provide students with the knowledge and skills necessary to pursue a career in software development.',
        2,
        6000
    );
    

INSERT INTO
    courses (programId, name, description)
VALUES (
        1,
        'Math For the Computer Industry',
        'This course is designed to provide students with the mathematical knowledge and skills required to solve problems in the computer industry. Topics include: algebra. Students will learn to apply mathematical concepts to solve problems in computer programming, networking, and database management.'
    ),
    (
        1,
        'Essential skills for teams collaboration',
        'This course is designed to provide students with the essential skills required to work effectively in a team environment. Topics include: team dynamics, communication, problem solving, and conflict resolution. Students will learn to apply these skills to work effectively in a team environment.'
    ),
    (
        1,
        'Programming fundamentals',
        'This course is designed to provide students with the fundamental concepts of programming. Topics include: programming languages, data types, control structures, and functions. Students will learn to write programs to solve problems in the computer industry.'
    ),
    (
        1,
        'Internet of things',
        'This course is designed to provide students with the fundamental concepts of the Internet of things. Topics include: sensors, actuators, microcontrollers, and communication protocols. Students will learn to design and implement Internet of things applications.'
    ),
    (
        1,
        'Web and Internet fundamentals',
        'This course is designed to provide students with the fundamental concepts of the Web and Internet. Topics include: HTML, CSS, JavaScript, and web development tools. Students will learn to design and implement web applications.'
    ),
    (
        1,
        'Introduction to relational databases',
        'This course is designed to provide students with the fundamental concepts of relational databases. Topics include: database design, SQL, and database management systems. Students will learn to design and implement relational databases.'
    ),
    (
        1,
        'Project management and software development',
        'This course is designed to provide students with the fundamental concepts of project management and software development. Topics include: project management methodologies, software development life cycle, and software development tools. Students will learn to manage software development projects.'
    ),
    (
        1,
        'Introduction to web design',
        'This course is designed to provide students with the fundamental concepts of web design. Topics include: web design principles, web design tools, and web design technologies. Students will learn to design and implement web sites.'
    ),
    (
        1,
        'Introduction to object oriented programming',
        'This course is designed to provide students with the fundamental concepts of object oriented programming. Topics include: object oriented programming languages, classes, objects, and inheritance. Students will learn to write object oriented programs.'
    ),
    (
        1,
        'Networking essentials',
        'This course is designed to provide students with the fundamental concepts of networking. Topics include: network topologies, network protocols, and network security. Students will learn to design and implement computer networks.'
    ),
    (
        1,
        'Relational databases',
        'This course is designed to provide students with the fundamental concepts of relational databases. Topics include: database design, SQL, and database management systems. Students will learn to design and implement relational databases.'
    ),
    (
        1,
        'Project management in software development',
        'This course is designed to provide students with the fundamental concepts of project management in software development. Topics include: project management methodologies, software development life cycle, and software development tools. Students will learn to manage software development projects.'
    ),
    (
        1,
        'Rapid application development',
        'This course is designed to provide students with the fundamental concepts of rapid application development. Topics include: rapid application development methodologies, rapid application development tools, and rapid application development technologies. Students will learn to design and implement rapid application development projects.'
    ),
    (
        1,
        'Web programming',
        'This course is designed to provide students with the fundamental concepts of web programming. Topics include: web programming languages, web programming frameworks, and web programming tools. Students will learn to design and implement web applications.'
    ),
    (
        1,
        'Object oriented programming',
        'This course is designed to provide students with the fundamental concepts of object oriented programming. Topics include: object oriented programming languages, classes, objects, and inheritance. Students will learn to write object oriented programs.'
    ),
    (
        1,
        'Introduction to games and simulation programming',
        'This course is designed to provide students with the fundamental concepts of games and simulation programming. Topics include: games and simulation programming languages, games and simulation programming frameworks, and games and simulation programming tools. Students will learn to design and implement games and simulation programs.'
    ),
    (
        1,
        'Mobile application development',
        'This course is designed to provide students with the fundamental concepts of mobile application development. Topics include: mobile application development languages, mobile application development frameworks, and mobile application development tools. Students will learn to design and implement mobile applications.'
    ),
    (
        1,
        'Algorithms and data structures',
        'This course is designed to provide students with the fundamental concepts of algorithms and data structures. Topics include: algorithms, data structures, and algorithm analysis. Students will learn to design and implement algorithms and data structures.'
    ),
    (
        1,
        'Software development capstone project',
        'This course is designed to provide students with the opportunity to apply the knowledge and skills acquired in the program to a real-world software development project. Students will work in teams to design and implement a software application.'
    ),
    (
        1,
        'Enterprise computing',
        'This course is designed to provide students with the fundamental concepts of enterprise computing. Topics include: enterprise computing architectures, enterprise computing technologies, and enterprise computing tools. Students will learn to design and implement enterprise computing solutions.'
    );

-- Insert data into the terms table
INSERT INTO
    terms (season)
VALUES ('Fall'),
    ('Winter'),
    ('Spring'),
    ('Summer');

-- Insert data into the coursesAvailableTerms table
INSERT INTO
    courses_available_terms (courseId, termSeason)
VALUES (1, 1),
    (1, 2),
    (2, 1),
    (2, 2),
    (3, 1),
    (3, 2),
    (4, 1),
    (4, 2),
    (5, 1),
    (5, 2),

(6, 2),
(6, 3),
(6, 4),
(7, 2),
(7, 3),
(7, 4),
(8, 2),
(8, 3),
(8, 4),
(9, 2),
(9, 3),
(9, 4),
(10, 2),
(10, 3),
(10, 4),

(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 2),
(17, 2),
(18, 2),
(19, 2),
(20, 2);

-- Insert data into the users table
INSERT INTO
    users (
        id,
        isAdmin,
        firstName,
        lastName,
        birthday,
        phone,
        email,
        department,
        program,
        username,
        password
    )
VALUES (
        'SD000001',
        1,
        'Patrick',
        'Macdonald',
        '01011990',
        '1234567890',
        'patrick@bvc.com',
        'Software Development',
        'SD diploma',
        'patrick',
        '1234'
    ),
    (
        'SD000002',
        0,
        'Manuella',
        'Lopes',
        '01011990',
        '1234567890',
        'manuella@bvc.com',
        'Software Development',
        'SD diploma',
        'manuella',
        '1234'
    ),
    (
        'SD000003',
        0,
        'Thiago',
        'Lima',
        '01011990',
        '1234567890',
        'thiago@bvc.com',
        'Software Development',
        'SD diploma',
        'thiago',
        '1234'
    ),
    (
        'SD000004',
        1,
        'Mariana',
        'Rangel',
        '01011990',
        '1234567890',
        'mariana@bvc.com',
        'Software Development',
        'SD diploma',
        'mariana',
        '1234'
    ),
    (
        'SD000005',
        0,
        'Arshdeep',
        'Kaur',
        '01011990',
        '1234567890',
        'arshdeep@bvc.com',
        'Software Development',
        'SD diploma',
        'arshdeep',
        '1234'
    );

-- Insert data into the user_programs table
INSERT INTO
    user_programs (userId, programId)
VALUES ('SD000001', 1),
    ('SD000002', 1),
    ('SD000003', 1),
    ('SD000004', 1),
    ('SD000005', 1);

-- Insert data into the user_classes table

INSERT INTO
    user_courses (
        userId,
        courseId,
        userTermId,
        termSeasonId
    )
VALUES ('SD000001', 1, 1, 1),
    ('SD000001', 2, 1, 1),
    ('SD000001', 3, 1, 1),
    ('SD000001', 4, 1, 1),
    ('SD000001', 5, 1, 1),
    ('SD000001', 6, 2, 2);

select * from users;

SELECT * FROM users WHERE username = 'admin13'