CREATE DATABASE [LogotrainerDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'LogotrainerDB', FILENAME = N'd:\olga\DATA\LogotrainerDB.mdf' , SIZE = 4096KB , FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'LogotrainerDB_log', FILENAME = N'd:\olga\DATA\LogotrainerDB_log.ldf' , SIZE = 1024KB , FILEGROWTH = 10%)
GO

USE [LogotrainerDB]
GO

 CREATE TABLE SkillGroup (
        SkillGroupName       nvarchar(100) NULL,
        SkillGroupId         uniqueidentifier NOT NULL,
        PRIMARY KEY NONCLUSTERED (SkillGroupId)
 )
go
 
 
 CREATE TABLE Skill (
        SkillName            nvarchar(100) NULL,
        SkillId              uniqueidentifier NOT NULL,
        SkillQuestion        nvarchar(200) NULL,
        SkillGroupId         uniqueidentifier NULL,
        PRIMARY KEY NONCLUSTERED (SkillId), 
        FOREIGN KEY (SkillGroupId)
                              REFERENCES SkillGroup
 )
go
 
 
 CREATE TABLE [Level] (
        LevelText            nvarchar(200) NULL,
        LevelId              uniqueidentifier NOT NULL,
        LevelNumber          int NULL,
        SkillId              uniqueidentifier NOT NULL,
        PRIMARY KEY NONCLUSTERED (LevelId), 
        FOREIGN KEY (SkillId)
                              REFERENCES Skill ON DELETE CASCADE
 )
go
 
 
 CREATE TABLE [User] (
        Password             nvarchar(30) NOT NULL,
        UserId               uniqueidentifier NOT NULL,
        LoginId              nvarchar(30) NOT NULL,
        FirstName            nvarchar(50) NOT NULL,
        LastName             nvarchar(50) NOT NULL,
        Role                 nvarchar(20) NOT NULL,
        PRIMARY KEY NONCLUSTERED (UserId)
 )
go
 
 
 CREATE TABLE [Group] (
        LogoGuid             uniqueidentifier NULL,
        GroupId              uniqueidentifier NOT NULL,
        GroupNumber          nvarchar(10) NOT NULL,
        PRIMARY KEY NONCLUSTERED (GroupId), 
        FOREIGN KEY (LogoGuid)
                              REFERENCES [User]
 )
go
 
 
 CREATE TABLE Kid (
        KidId                uniqueidentifier NOT NULL,
		FirstName            nvarchar(50) NULL,
        MiddleName           nvarchar(50) NULL,
        LastName             nvarchar(50) NULL,
        DateOfBirth          datetime NULL,
        HomeAddress          nvarchar(150) NULL,
        HomePhone            nvarchar(100) NULL,
        ParentInfo           nvarchar(200) NULL,
        ParentMobile         nvarchar(100) NULL,
        ParentUserId         uniqueidentifier NULL,
		GroupId				 uniqueidentifier NOT NULL,
        IsArchived           bit NULL,
        PRIMARY KEY NONCLUSTERED (KidId), 
        FOREIGN KEY (GroupId)
                              REFERENCES [Group], 
        FOREIGN KEY (ParentUserId)
                              REFERENCES [User]
 )
go
 
 
 CREATE TABLE KidProfile (
        KidId                uniqueidentifier NULL,
        KidProfileId         uniqueidentifier NOT NULL,
        CreateDateTime       datetime NULL,
        PRIMARY KEY NONCLUSTERED (KidProfileId), 
        FOREIGN KEY (KidId)
                              REFERENCES Kid
 )
go
 
 
 CREATE TABLE TestResult (
		KidProfileId		uniqueidentifier NOT NULL,
        SkillId              uniqueidentifier NOT NULL,
        LevelId              uniqueidentifier NOT NULL,
        PRIMARY KEY NONCLUSTERED (SkillId, KidProfileId), 
        FOREIGN KEY (LevelId)
                              REFERENCES [Level], 
        FOREIGN KEY (SkillId)
                              REFERENCES Skill ON DELETE CASCADE, 
        FOREIGN KEY (KidProfileId)
                              REFERENCES KidProfile
 )
go
 
 
 CREATE TABLE KidSet (
        KidId                uniqueidentifier NULL,
        KidSetId             uniqueidentifier NOT NULL,
        CreateDateTime       datetime NULL,
        PRIMARY KEY NONCLUSTERED (KidSetId), 
        FOREIGN KEY (KidId)
                              REFERENCES Kid
 )
go
 
 
 CREATE TABLE Exercise (
        ExerciseId           uniqueidentifier NOT NULL,
        ExerciseInventory    nvarchar(300) NULL,
        ExerciseSteps        nvarchar(max) NULL,
        LevelId              uniqueidentifier NULL,
		UserId				uniqueidentifier NOT NULL,
		IsArchived          bit NULL
        PRIMARY KEY NONCLUSTERED (ExerciseId), 
        FOREIGN KEY (LevelId)
                              REFERENCES [Level],
		FOREIGN KEY (UserId) REFERENCES [User]
 )
go
 
 
 CREATE TABLE KidSetExercise (
        ExerciseId           uniqueidentifier NOT NULL,
        KidSetId             uniqueidentifier NOT NULL,
        PRIMARY KEY NONCLUSTERED (ExerciseId, KidSetId), 
        FOREIGN KEY (KidSetId)
                              REFERENCES KidSet, 
        FOREIGN KEY (ExerciseId)
                              REFERENCES Exercise
 )
go
 
 