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
    SELECT
        *
    FROM
        sys.databases
    WHERE
        name = 'BVC_Portal'
) BEGIN
DROP DATABASE BVC_Portal;

END;

GO
-- Create the BVC_Portal database if it doesn't exist
IF NOT EXISTS (
    SELECT
        *
    FROM
        sys.databases
    WHERE
        name = 'BVC_Portal'
) BEGIN CREATE DATABASE BVC_Portal;

END;

GO
-- Use the BVC_Portal database
USE BVC_Portal;

GO
-- Create the programs table
CREATE TABLE
    programs (
        id INT IDENTITY (1, 1) PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        durationTerms INT NOT NULL,
        tuition DECIMAL(10, 2) NOT NULL
    );

-- Create the courses table
CREATE TABLE
    courses (
        id INT IDENTITY (1, 1) PRIMARY KEY,
        programId INT,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        FOREIGN KEY (programId) REFERENCES programs (id) ON DELETE CASCADE
    );

CREATE TABLE
    terms (
        id INT IDENTITY (1, 1) PRIMARY KEY,
        season VARCHAR(50) NOT NULL
    );

CREATE TABLE
    courses_available_terms (
        id INT IDENTITY (1, 1) PRIMARY KEY,
        courseId INT NOT NULL,
        termSeason INT NOT NULL,
        FOREIGN KEY (courseId) REFERENCES courses (id) ON DELETE CASCADE,
        FOREIGN KEY (termSeason) REFERENCES terms (id)
    );

-- Create the comments table
CREATE TABLE
    comments (
        -- Insert data into the courses table
        id INT IDENTITY (1, 1) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        comment TEXT NOT NULL,
        date DATETIME NOT NULL
    );

-- Create the users table
CREATE TABLE
    users (
        id INT IDENTITY (1, 1) PRIMARY KEY,
        isAdmin BIT NOT NULL DEFAULT 0, --as we do not have a logic to handle the isAdmin in the sign up form 0 will the default value
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        birthday VARCHAR(8) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        -- program VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );

-- Create the user_programs table
CREATE TABLE
    user_programs (
        id INT IDENTITY (1, 1) PRIMARY KEY,
        userId INT NOT NULL,
        programId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id),
        FOREIGN KEY (programId) REFERENCES programs (id) ON DELETE CASCADE
    );

-- Create the user_classes table
CREATE TABLE
    user_courses (
        id INT IDENTITY (1, 1) PRIMARY KEY,
        userId INT NOT NULL,
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
    programs (name, description, durationTerms, tuition)
VALUES
    (
        'Diploma',
        'This program is designed to provide students with the knowledge and skills necessary to pursue a career in software development.',
        4,
        10000
    ),
    (
        'Post Diploma',
        'This program is designed to provide students with the knowledge and skills necessary to pursue a career in software development.',
        3,
        8000
    ),
    (
        'Certificate',
        'This program is designed to provide students with the knowledge and skills necessary to pursue a career in software development.',
        2,
        6000
    );

INSERT INTO
    courses (programId, name, description)
VALUES
    (
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
    ),
    
    (2, 'Course 1 for Program 2', 'Description for Course 1 for program 2'),
    (2, 'Course 2 for Program 2', 'Description for Course 2 for program 2'),
    (2, 'Course 3 for Program 2', 'Description for Course 3 for program 2'),
    (2, 'Course 4 for Program 2', 'Description for Course 4 for program 2'),
    (2, 'Course 5 for Program 2', 'Description for Course 5 for program 2'),
    (2, 'Course 6 for Program 2', 'Description for Course 6 for program 2'),
    (2, 'Course 7 for Program 2', 'Description for Course 7 for program 2'),
    (2, 'Course 8 for Program 2', 'Description for Course 8 for program 2'),
    (2, 'Course 9 for Program 2', 'Description for Course 9 for program 2'),
    (2, 'Course 10 for Program 2', 'Description for Course 10  for program 2'),
    (2, 'Course 11 for Program 2', 'Description for Course 11 for program 2'),
    (2, 'Course 12 for Program 2', 'Description for Course 12 for program 2'),
    (2, 'Course 13 for Program 2', 'Description for Course 13 for program 2'),
    (2, 'Course 14 for Program 2', 'Description for Course 14 for program 2'),
    (2, 'Course 15 for Program 2', 'Description for Course 15 for program 2'),
    ----------ProgramId 3
    (3, 'Course 1 for Program 3', 'Description for Course 1 for program 3'),
    (3, 'Course 2 for Program 3', 'Description for Course 2 for program 3'),
    (3, 'Course 3 for Program 3', 'Description for Course 3 for program 3'),
    (3, 'Course 4 for Program 3', 'Description for Course 4 for program 3'),
    (3, 'Course 5 for Program 3', 'Description for Course 5 for program 3'),
    (3, 'Course 6 for Program 3', 'Description for Course 6 for program 3'),
    (3, 'Course 7 for Program 3', 'Description for Course 7 for program 3'),
    (3, 'Course 8 for Program 3', 'Description for Course 8 for program 3'),
    (3, 'Course 9 for Program 3', 'Description for Course 9 for program 3'),
    (3, 'Course 10 for Program 3', 'Description for Course 10 for program 3');

-- Insert data into the terms table
INSERT INTO
    terms (season)
VALUES
    ('Fall'),
    ('Winter'),
    ('Spring'),
    ('Summer');

-- Insert data into the coursesAvailableTerms table
INSERT INTO
    courses_available_terms (courseId, termSeason)
VALUES
    (1, 1),
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
    (20, 2),
    -----ProgramId 2
    (21, 1),
    (21, 2),    
    (22, 1),
    (22, 2),
    (23, 1),
    (23, 2),
    (24, 1),
    (24, 2),
    (25, 1),
    (25, 2),
    (26, 2),
    (26, 4),
    (27, 2),
    (27, 3),
    (27, 4),
    (28, 2),
    (28, 3),
    (28, 4),
    (29, 2),
    (29, 3),
    (29, 4),
    (30, 2),
    (30, 3),
    (30, 4),
    (31, 1),
    (31, 2),
    (31, 3),
    (32, 1),
    (32, 2),
    (32, 3),
    (33, 1),
    (33, 2),
    (33, 3),
    (34, 1),
    (34, 2),
    (34, 3),
    (35, 1),
    (35, 2),
    (35, 3),   
   
    ----ProgramId 3
    (36,1),
    (36, 2),
    (36, 3),
    (37, 1),
    (37, 2),
    (37, 3),
    (38, 1),
    (38, 2),
    (38, 3),
    (39, 1),
    (39, 2),
    (39, 3),
    (40, 1),
    (40, 2),
    (40, 3),
    (41, 2),
    (41, 3),
    (41, 4),
    (42, 2),
    (42, 3),
    (42, 4),
    (43, 2),
    (43, 3),
    (43, 4),
    (44, 2),
    (44, 3),
    (44, 4),
    (45, 2),
    (45, 3),
    (45, 4);

-- Insert data into the users table
-- INSERT INTO
--     users (
--         isAdmin,
--         firstName,
--         lastName,
--         birthday,
--         phone,
--         email,
--         department,
--         username,
--         password
--     )
-- VALUES
--     (
--         1,
--         'Patrick',
--         'Macdonald',
--         '01011990',
--         '1234567890',
--         'patrick@bvc.com',
--         'Software Development',
--         'patrick',
--         '1$2b$10$KBf0TqVP8oyelqdWn7J.luz5QrK64csBG6JRbHyPn.TJdyLvITL4W'
--     );

--     (
--         'SD000002',
--         0,
--         'Manuella',
--         'Lopes',
--         '01011990',
--         '1234567890',
--         'manuella@bvc.com',
--         'Software Development',
--         'SD diploma',
--         'manuella',
--         '1234'
--     ),
--     (
--         'SD000003',
--         0,
--         'Thiago',
--         'Lima',
--         '01011990',
--         '1234567890',
--         'thiago@bvc.com',
--         'Software Development',
--         'SD diploma',
--         'thiago',
--         '1234'
--     ),
--     (
--         'SD000004',
--         1,
--         'Mariana',
--         'Rangel',
--         '01011990',
--         '1234567890',
--         'mariana@bvc.com',
--         'Software Development',
--         'SD diploma',
--         'mariana',
--         '1234'
--     ),
--     (
--         'SD000005',
--         0,
--         'Arshdeep',
--         'Kaur',
--         '01011990',
--         '1234567890',
--         'arshdeep@bvc.com',
--         'Software Development',
--         'SD diploma',
--         'arshdeep',
--         '1234'
--     );
-- Insert data into the user_programs table
-- INSERT INTO
--     user_programs (userId, programId)
-- VALUES ('SD000001', 1),
--     ('SD000002', 1),
--     ('SD000003', 1),
--     ('SD000004', 1),
--     ('SD000005', 1);
-- Insert data into the user_classes table
-- INSERT INTO
--     user_courses (
--         userId,
--         courseId,
--         userTermId,
--         termSeasonId
--     )
-- VALUES ('SD000001', 1, 1, 1),
--     ('SD000001', 2, 1, 1),
--     ('SD000001', 3, 1, 1),
--     ('SD000001', 4, 1, 1),
--     ('SD000001', 5, 1, 1),
--     ('SD000001', 6, 2, 2);
-- SELECT 
--     u.id, 
--     u.username, 
--     uc.courseId, 
--     uc.userTermId, 
--     uc.termSeasonId
-- FROM 
--     users u
-- JOIN 
--     user_courses uc 
-- ON 
--     u.id = uc.userId
-- WHERE 
--     u.username = 'student';
-- select  * from user_courses;
-- select * from users;
-- SELECT id, username FROM users WHERE username = 'student';
-- EXEC sp_columns user_courses;

-- select * from user_programs;