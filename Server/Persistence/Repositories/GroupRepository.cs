using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

namespace Logotrainer.Persistence.Repositories
{
    public class GroupRepository : BaseRepository, IGroupRepository
    {
        public GroupRepository(IDbConnection connection) : base(connection)
        {
        }

        public IList<Group> FindGroupsByLogoUserId(Guid userId)
        {
            return Connection.Query<Group>("SELECT [GroupId],[GroupNumber] FROM [Group] WHERE [LogoGuid]=@UserId",
                new {UserId = userId}).ToList();
        }
    }
}