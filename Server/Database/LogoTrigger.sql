CREATE TRIGGER TRG_KIDPROFILE_EXERCISE_CHANGE
ON [dbo].[Level]
INSTEAD OF DELETE
AS
BEGIN

DECLARE @newLevelId uniqueidentifier
DECLARE @delLevelId uniqueidentifier
DECLARE @delSkillId uniqueidentifier
DECLARE @delNumber int

SELECT @delLevelId=LevelId,
@delSkillId=SkillId,
@delNumber=LevelNumber
from deleted

IF EXISTS (SELECT COUNT (LevelId) 
FROM [dbo].[Level] 
WHERE SkillId=@delSkillId 
GROUP BY (SkillId)
HAVING COUNT(LevelId)>1)
BEGIN

SET @newLevelId=CASE 
WHEN EXISTS (SELECT LevelId FROM [dbo].[Level] 
where [SkillId]=@delSkillId AND [LevelNumber]<=@delNumber AND [LevelId]!=@delLevelId)
THEN 
(SELECT TOP 1 LevelId
FROM [dbo].[Level] 
where [SkillId]=@delSkillId AND [LevelNumber]<=@delNumber AND [LevelId]!=@delLevelId
ORDER BY [LevelNumber] desc)
ELSE
(SELECT TOP 1 LevelId
FROM [dbo].[Level] 
where [SkillId]=@delSkillId AND [LevelNumber]>@delNumber
ORDER BY [LevelNumber] asc)
END

IF EXISTS (SELECT * FROM [dbo].[Exercise] WHERE [dbo].[Exercise].[LevelId]=@delLevelId)
UPDATE [dbo].[Exercise]
SET [LevelId]=@newLevelId
WHERE [dbo].[Exercise].[LevelId]=@delLevelId

IF EXISTS (SELECT * FROM [dbo].[TestResult] WHERE [dbo].[TestResult].[LevelId]=@delLevelId)
UPDATE [dbo].[TestResult]
SET LevelId=@newLevelId
WHERE [dbo].[TestResult].[LevelId]=@delLevelId
END

ELSE
BEGIN
IF EXISTS (SELECT * FROM [dbo].[TestResult] WHERE [dbo].[TestResult].[LevelId]=@delLevelId)
DELETE FROM [dbo].[TestResult]
where LevelId=@delLevelId
END

DELETE FROM [dbo].[Level]
WHERE [LevelId]=@delLevelId

END