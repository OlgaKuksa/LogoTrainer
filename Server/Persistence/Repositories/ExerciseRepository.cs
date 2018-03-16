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
", new{LevelId=mainLevelId}).ToList();
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
            if(shouldOpen)
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
@ExerciseName)",exercise);
            if(shouldOpen)
                Connection.Close();
        }

        public void Update(Exercise exercise)
        {
            throw new NotImplementedException();
        }

        public void Remove(Exercise exercise)
        {
            Connection.Execute(@"UPDATE [Exercise]
SET [IsArchived]=1
WHERE [ExerciseId]=@ExerciseId", exercise);
        }
    }
}