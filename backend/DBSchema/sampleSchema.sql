-- Switch to the master database
USE master;
GO

-- Terminate connections to the TestAPI_CRUD_SQLServer database
ALTER DATABASE SampleData
SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO

-- Drop the database if it already exists
IF EXISTS (SELECT name
FROM sys.databases
WHERE name = N'SampleData')
BEGIN
    DROP DATABASE SampleData;
END
GO

-- Create the database
CREATE DATABASE SampleData;
GO

-- Switch to the database
USE SampleData;
GO

CREATE TABLE SampleData
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    age INT NOT NULL
);
GO

-- Insert some sample data
INSERT INTO SampleData
    (name, age)
VALUES
    ('Alice', 25),
    ('Bob', 30),
    ('Charlie', 35),
    ('David', 40);

Select * From SampleData;