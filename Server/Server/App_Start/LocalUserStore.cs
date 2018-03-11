using System;
using System.Threading.Tasks;
using Logotrainer.Model.Interfaces;
using Logotrainer.Server.Models;
using Microsoft.AspNet.Identity;

namespace Logotrainer.Server
{
    public class LocalUserStore : IUserStore<ApplicationUser>
    {
        private IRepositoryFactory RepositoryFactory { get; set; }

        public void Dispose()
        {
        }

        private IUserRepository UserRepository
        {
            get { return RepositoryFactory.CreateUserRepository(); }
        }

        public LocalUserStore(IRepositoryFactory repositoryFactory)
        {
            RepositoryFactory = repositoryFactory;
        }

        public async Task CreateAsync(ApplicationUser user)
        {
            var toSave = user.ToUser();
            UserRepository.Add(toSave);
        }

        public async Task UpdateAsync(ApplicationUser user)
        {
            var toSave = user.ToUser();
            UserRepository.Update(toSave);
        }

        public Task DeleteAsync(ApplicationUser user)
        {
            throw new NotImplementedException();
        }

        public async Task<ApplicationUser> FindByIdAsync(string userId)
        {
            var user = UserRepository.FindById(userId);

            return ApplicationUser.FromUser(user);
        }

        public async Task<ApplicationUser> FindByNameAsync(string userName)
        {
            var user = UserRepository.FindByLoginId(userName);

            return ApplicationUser.FromUser(user);
        }
    }
}