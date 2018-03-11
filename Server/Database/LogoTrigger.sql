CREATE TRIGGER [tr_Level_Delete]
  ON [Level]
  INSTEAD OF DELETE
AS
  BEGIN
    DECLARE @newLevelId uniqueidentifier
    DECLARE @delLevelId uniqueidentifier
    DECLARE @delSkillId uniqueidentifier
    DECLARE @delNumber int

    SELECT
        @delLevelId = [LevelId],
        @delSkillId = [SkillId],
        @delNumber = [LevelNumber]
    FROM [deleted]

    SET @newLevelId = CASE
                        WHEN EXISTS(SELECT [LevelId]
                                    FROM [Level]
                                    WHERE [SkillId] = @delSkillId AND [LevelNumber] <= @delNumber AND
                                          [LevelId] != @delLevelId)
                          THEN
                            (SELECT TOP 1 [LevelId]
                             FROM [Level]
                             WHERE [SkillId] = @delSkillId AND [LevelNumber] <= @delNumber AND
                                   [LevelId] != @delLevelId
                             ORDER BY [LevelNumber] DESC)
                        ELSE
                          (SELECT TOP 1 [LevelId]
                           FROM [Level]
                           WHERE [SkillId] = @delSkillId AND [LevelNumber] > @delNumber
                           ORDER BY [LevelNumber] ASC)
                        END

    IF EXISTS(SELECT *
              FROM [Exercise]
              WHERE [Exercise].[LevelId] = @delLevelId)
      UPDATE [Exercise]
      SET [LevelId] = @newLevelId
      WHERE [Exercise].[LevelId] = @delLevelId

    IF EXISTS(SELECT *
              FROM [TestResult]
              WHERE [TestResult].[LevelId] = @delLevelId)
      UPDATE [TestResult]
      SET [LevelId] = @newLevelId
      WHERE [TestResult].[LevelId] = @delLevelId

    DELETE FROM [Level]
    WHERE [LevelId] = @delLevelId

  END