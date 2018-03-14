using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

namespace Logotrainer.Persistence.Repositories
{
    public class KidRepository : BaseRepository, IKidRepository
    {
        public KidRepository(IDbConnection connection):base(connection)
        {
            
        }

        public IList<Kid> GetByLogoUserId(Guid userId)
        {
            return Connection.Query<Kid>(@"SELECT [KidId]
      ,[FirstName]
      ,[MiddleName]
      ,[LastName]
      ,[DateOfBirth]
      ,[HomeAddress]
      ,[HomePhone]
      ,[ParentInfo]
      ,[ParentMobile]
      ,[ParentUserId]
      ,k.[GroupId]
      ,[IsArchived]
  FROM [Kid] k
  INNER JOIN [Group] g
  ON g.[GroupId]=k.[GroupId]
  WHERE g.[LogoGuid]=@userId
",new {UserId=userId}).ToList();
            throw new NotImplementedException();
        }

        public void Add(Kid kid)
        {
            Connection.Execute(@"INSERT INTO [dbo].[Kid]
           ([KidId]
           ,[FirstName]
           ,[MiddleName]
           ,[LastName]
           ,[DateOfBirth]
           ,[HomeAddress]
           ,[HomePhone]
           ,[ParentInfo]
           ,[ParentMobile]
           ,[GroupId]
           ,[IsArchived])
     VALUES
           (@KidId
           ,@FirstName
           ,@MiddleName
           ,@LastName
           ,@DateOfBirth
           ,@HomeAddress
           ,@HomePhone
           ,@ParentInfo
           ,@ParentMobile
           ,@GroupId
           ,@IsArchived)", kid);
        }

        public void Update(Kid kid)
        {
            throw new NotImplementedException();
        }
    }
}