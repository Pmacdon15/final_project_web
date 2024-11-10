-- Switch to the master database
USE master;
GO

-- Terminate connections to the BVC_Portal database
ALTER DATABASE BVC_Portal
SET SINGLE_USER WITH ROLLBACK IMMEDIATE
GO

-- Delete the BVC_Portal database if it exists
IF EXISTS (SELECT *
FROM sys.databases
WHERE name = 'BVC_Portal')
BEGIN
    DROP DATABASE BVC_Portal;
END
GO

-- Create the BVC_Portal database if it doesn't exist
IF NOT EXISTS (SELECT *
FROM sys.databases
WHERE name = 'BVC_Portal')
BEGIN
    CREATE DATABASE BVC_Portal;
END
GO

-- Use the BVC_Portal database
USE BVC_Portal;
GO

-- Drop the programs table if it exists


-- Create the programs table
CREATE TABLE programs
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    durationTerms INT NOT NULL,
    tuition DECIMAL(10, 2) NOT NULL
);

-- Create the courses table
CREATE TABLE courses
(
    id INT IDENTITY(1,1)PRIMARY KEY,
    programId INT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    availableFall BIT NOT NULL,
    availableWinter BIT NOT NULL,
    availableSpring BIT NOT NULL,
    availableSummer BIT NOT NULL,
    FOREIGN KEY (programId) REFERENCES programs(id)
);


-- Create the comments table
CREATE TABLE comments
(
    -- Insert data into the courses table
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    date DATETIME NOT NULL
);

-- Insert data into the programs table
INSERT INTO programs
    ( name, description, durationTerms, tuition)
VALUES
    ( 'Software development diploma', 'This program is designed to provide students with the knowledge and skills necessary to pursue a career in software development.', 4, 10000),
    ('Software development post diploma', 'This program is designed to provide students with the knowledge and skills necessary to pursue a career in software development.', 3, 8000),
    ( 'Certificate in software development', 'This program is designed to provide students with the knowledge and skills necessary to pursue a career in software development.', 2, 6000);

INSERT INTO courses
    (programId, name, description, availableFall, availableWinter, availableSpring, availableSummer)
VALUES
    (1, 'Math For the Computer Industry', 'This course is designed to provide students with the mathematical knowledge and skills required to solve problems in the computer industry. Topics include: algebra. Students will learn to apply mathematical concepts to solve problems in computer programming, networking, and database management.', 1, 1, 0, 0),
    (1, 'Essential skills for teams collaboration', 'This course is designed to provide students with the essential skills required to work effectively in a team environment. Topics include: team dynamics, communication, problem solving, and conflict resolution. Students will learn to apply these skills to work effectively in a team environment.', 1, 1, 0, 0),
    (1, 'Programming fundamentals', 'This course is designed to provide students with the fundamental concepts of programming. Topics include: programming languages, data types, control structures, and functions. Students will learn to write programs to solve problems in the computer industry.', 1, 1, 0, 0),
    (1, 'Internet of things', 'This course is designed to provide students with the fundamental concepts of the Internet of things. Topics include: sensors, actuators, microcontrollers, and communication protocols. Students will learn to design and implement Internet of things applications.', 1, 1, 0, 0),
    (1, 'Web and Internet fundamentals', 'This course is designed to provide students with the fundamental concepts of the Web and Internet. Topics include: HTML, CSS, JavaScript, and web development tools. Students will learn to design and implement web applications.', 1, 1, 0, 0),
    (1, 'Introduction to relational databases', 'This course is designed to provide students with the fundamental concepts of relational databases. Topics include: database design, SQL, and database management systems. Students will learn to design and implement relational databases.', 0, 1, 1, 1),
    (1, 'Project management and software development', 'This course is designed to provide students with the fundamental concepts of project management and software development. Topics include: project management methodologies, software development life cycle, and software development tools. Students will learn to manage software development projects.', 0, 1, 1, 1),
    (1, 'Introduction to web design', 'This course is designed to provide students with the fundamental concepts of web design. Topics include: web design principles, web design tools, and web design technologies. Students will learn to design and implement web sites.', 0, 1, 1, 1),
    (1, 'Introduction to object oriented programming', 'This course is designed to provide students with the fundamental concepts of object oriented programming. Topics include: object oriented programming languages, classes, objects, and inheritance. Students will learn to write object oriented programs.', 0, 1, 1, 1),
    (1, 'Networking essentials', 'This course is designed to provide students with the fundamental concepts of networking. Topics include: network topologies, network protocols, and network security. Students will learn to design and implement computer networks.', 0, 1, 1, 1),
    (1, 'Relational databases', 'This course is designed to provide students with the fundamental concepts of relational databases. Topics include: database design, SQL, and database management systems. Students will learn to design and implement relational databases.', 1, 0, 0, 0),
    (1, 'Project management in software development', 'This course is designed to provide students with the fundamental concepts of project management in software development. Topics include: project management methodologies, software development life cycle, and software development tools. Students will learn to manage software development projects.', 1, 0, 0, 0),
    (1, 'Rapid application development', 'This course is designed to provide students with the fundamental concepts of rapid application development. Topics include: rapid application development methodologies, rapid application development tools, and rapid application development technologies. Students will learn to design and implement rapid application development projects.', 1, 0, 0, 0),
    (1, 'Web programming', 'This course is designed to provide students with the fundamental concepts of web programming. Topics include: web programming languages, web programming frameworks, and web programming tools. Students will learn to design and implement web applications.', 1, 0, 0, 0),
    (1, 'Object oriented programming', 'This course is designed to provide students with the fundamental concepts of object oriented programming. Topics include: object oriented programming languages, classes, objects, and inheritance. Students will learn to write object oriented programs.', 1, 0, 0, 0),
    (1, 'Introduction to games and simulation programming', 'This course is designed to provide students with the fundamental concepts of games and simulation programming. Topics include: games and simulation programming languages, games and simulation programming frameworks, and games and simulation programming tools. Students will learn to design and implement games and simulation programs.', 0, 1, 0, 0),
    (1, 'Mobile application development', 'This course is designed to provide students with the fundamental concepts of mobile application development. Topics include: mobile application development languages, mobile application development frameworks, and mobile application development tools. Students will learn to design and implement mobile applications.', 0, 1, 0, 0),
    (1, 'Algorithms and data structures', 'This course is designed to provide students with the fundamental concepts of algorithms and data structures. Topics include: algorithms, data structures, and algorithm analysis. Students will learn to design and implement algorithms and data structures.', 0, 1, 0, 0),
    (1, 'Software development capstone project', 'This course is designed to provide students with the opportunity to apply the knowledge and skills acquired in the program to a real-world software development project. Students will work in teams to design and implement a software application.', 0, 1, 0, 0),
    (1, 'Enterprise computing', 'This course is designed to provide students with the fundamental concepts of enterprise computing. Topics include: enterprise computing architectures, enterprise computing technologies, and enterprise computing tools. Students will learn to design and implement enterprise computing solutions.', 0, 1, 0, 0);
