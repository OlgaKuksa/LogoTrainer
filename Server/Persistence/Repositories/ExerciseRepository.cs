using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

namespace Logotrainer.Persistence.Repositories
{
    public class ExerciseRepository : BaseRepository, IExerciseRepository
    {
        public ExerciseRepository(IDbConnection connection) : base(connection)
        {
        }

        public IList<Exercise> FindByLevelId(Guid mainLevelId)
        {
            var shouldOpenConnection = Connection.State != ConnectionState.Open;
            if (shouldOpenConnection)
                Connection.Open();
            var ret = Connection.Query<Exercise>(@"SELECT e.[ExerciseId]
,e.[ExerciseInventory]
,e.[ExerciseSteps]
,e.[LevelId] as [ExerciseMainLevelId]
,l.[SkillId] as [ExerciseMainSkillId]
,e.[ExerciseName]
,e.[UserId]
,e.[IsArchived]
FROM [Exercise] e
INNER JOIN [Level] l
ON e.[LevelId]=l.[LevelId]
WHERE e.[LevelId]=@LevelId
AND e.[IsArchived]=0
", new {LevelId = mainLevelId}).ToList();
            foreach (var exercise in ret)
            {
                exercise.ExerciseSecondarySkills = FindExerciseSecondarySkills(exercise.ExerciseId);
            }
            if (shouldOpenConnection)
                Connection.Close();
            return ret;
        }

        public IList<Exercise> FindByKidSet(KidSet kidSet)
        {
            var shouldOpenConnection = Connection.State != ConnectionState.Open;
            if (shouldOpenConnection)
                Connection.Open();
            var ret = Connection.Query<Exercise>(@"SELECT e.[ExerciseId]
,e.[ExerciseInventory]
,e.[ExerciseSteps]
,e.[LevelId] as [ExerciseMainLevelId]
,l.[SkillId] as [ExerciseMainSkillId]
,e.[ExerciseName]
,e.[UserId]
,e.[IsArchived]
FROM [Exercise] e
INNER JOIN [Level] l
ON e.[LevelId]=l.[LevelId]
INNER JOIN [KidSetExercise] kse
ON kse.[ExerciseId]=e.[ExerciseId]
WHERE kse.[KidSetId]=@KidSetId
", kidSet).ToList();
            foreach (var exercise in ret)
            {
                exercise.ExerciseSecondarySkills = FindExerciseSecondarySkills(exercise.ExerciseId);
            }
            if (shouldOpenConnection)
                Connection.Close();
            return ret;
        }

        private IList<Guid> FindExerciseSecondarySkills(Guid exerciseId)
        {
            return Connection
                .Query<Guid>("SELECT [SkillId] FROM [ExerciseSecondarySkill] WHERE [ExerciseId]=@ExerciseId",
                    new {ExerciseId = exerciseId}).ToList();
        }

        public void Add(Exercise exercise)
        {
            var shouldOpen = Connection.State != ConnectionState.Open;
            if (shouldOpen)
                Connection.Open();
            Connection.Execute(@"INSERT INTO [Exercise]
([ExerciseId]
,[ExerciseInventory]
,[ExerciseSteps]
,[LevelId]
,[UserId]
,[IsArchived]
,[ExerciseName])
VALUES (
@ExerciseId,
@ExerciseInventory,
@ExerciseSteps,
@ExerciseMainLevelId,
@UserId,
0,
@ExerciseName)", exercise);
            AddOrUpdateSecondarySkills(exercise);
            if (shouldOpen)
                Connection.Close();
        }

        private void AddOrUpdateSecondarySkills(Exercise exercise)
        {
            if (exercise.ExerciseSecondarySkills == null) return;
            var existingSkillIds = FindExerciseSecondarySkills(exercise.ExerciseId);
            var newSkillIds = exercise.ExerciseSecondarySkills.Except(existingSkillIds).Distinct().ToList();
            var skillIdsToRemove = existingSkillIds.Except(exercise.ExerciseSecondarySkills).ToList();
            foreach (var skillId in newSkillIds)
            {
                Connection.Execute(@"INSERT INTO [ExerciseSecondarySkill]([ExerciseId],[SkillId])
VALUES (@ExerciseId,@SkillId)", new {exercise.ExerciseId, SkillId = skillId});
            }
            if (skillIdsToRemove.Count > 0)
            {
                Connection.Execute(@"DELETE FROM [ExerciseSecondarySkill]
WHERE [ExerciseId]=@ExerciseId
AND [SkillId] IN @skillIdsToRemove", new {exercise.ExerciseId, skillIdsToRemove});
            }
        }

        public void Update(Exercise exercise)
        {
            var shouldOpen = Connection.State != ConnectionState.Open;
            if (shouldOpen)
                Connection.Open();
            Connection.Execute(@"UPDATE [Exercise]
SET
[ExerciseInventory]=@ExerciseInventory
,[ExerciseSteps]=@ExerciseSteps
,[LevelId]=@ExerciseMainLevelId
,[ExerciseName]=@ExerciseName
WHERE [ExerciseId]=@ExerciseId", exercise);
            AddOrUpdateSecondarySkills(exercise);
            if (shouldOpen)
                Connection.Close();
        }

        public void Remove(Exercise exercise)
        {
            Connection.Execute(@"UPDATE [Exercise]
SET [IsArchived]=1
WHERE [ExerciseId]=@ExerciseId", exercise);
        }
    }
}