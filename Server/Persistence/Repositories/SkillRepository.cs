using System;
using System.Data;
using System.Linq;
using Dapper;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

namespace Logotrainer.Persistence.Repositories
{
    public class SkillRepository : BaseRepository, ISkillRepository
    {
        public SkillRepository(IDbConnection connection) : base(connection)
        {
        }

        public void Add(Skill skill)
        {
            Connection.Execute(@"INSERT INTO [Skill] (SkillGroupId, SkillId, SkillName,SkillQuestion)
VALUES(@SkillGroupId, @SkillId, @SkillName,@SkillQuestion)", skill);
            AddOrUpdateLevels(skill);
        }

        public void Update(Skill skill)
        {
            Connection.Execute(@"UPDATE [Skill]
SET
SkillName=@SkillName,
SkillQuestion=@SkillQuestion
WHERE [SkillId]=@SkillId", skill);
            AddOrUpdateLevels(skill);
        }

        private void AddOrUpdateLevels(Skill skill)
        {
            if (skill.SkillLevels == null || !skill.SkillLevels.Any()) return;
            var levelIds = Connection.Query<Guid>("SELECT [LevelId] FROM [Level] WHERE [SkillId]=@SkillId", skill)
                .ToList();
            var levelIdsToRemove = levelIds.Where(levelId => skill.SkillLevels.All(level => level.LevelId != levelId))
                .ToList();
            foreach (var level in skill.SkillLevels)
            {
                if (levelIds.Contains(level.LevelId))
                {
                    Connection.Execute(
                        "UPDATE [Level]\nSET [LevelNumber]=@LevelNumber,[LevelText]=@LevelText\nWHERE [LevelId]=@LevelId",
                        level);
                }
                else
                {
                    level.SkillId = skill.SkillId;
                    Connection.Execute(
                        "INSERT INTO [Level]([SkillId],[LevelId],[LevelNumber],[LevelText])\nVALUES (@SkillId,@LevelId,@LevelNumber,@LevelText)",
                        level);
                }
            }
            foreach (var levelIdToRemove in levelIdsToRemove)
            {
                //redirect to next lower-or-equal level all exercises/test results
                //or first greater if no lower levels
                Connection.Execute("DELETE FROM [Level] WHERE [LevelId]=@LevelId", new {LevelId = levelIdToRemove});
            }
        }

        public bool Remove(Skill skill)
        {
            if (Connection.QuerySingle<int>(
                    "SELECT COUNT(*) FROM [Level] INNER JOIN [Exercise] ON [Level].[LevelId]=[Exercise].[LevelId] WHERE [Level].[SkillId]=@SkillId",
                    skill) > 0)
                return false;
            //cannot remove if any exercise is using it
            //will remove test results - cascade
            Connection.Execute("DELETE FROM [Skill] WHERE [SkillId]=@SkillId", skill);
            return true;
        }
    }
}