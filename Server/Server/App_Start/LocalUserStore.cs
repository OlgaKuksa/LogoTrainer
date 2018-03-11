using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Logotrainer.Model.Interfaces;
using Logotrainer.Server.Models;
using Microsoft.AspNet.Identity;

namespace Logotrainer.Server
{
    public class LocalUserStore : IUserStore<ApplicationUser>, IUserPasswordStore<ApplicationUser>,
        IUserLockoutStore<ApplicationUser, string>, IUserTwoFactorStore<ApplicationUser, string>,
        IUserPhoneNumberStore<ApplicationUser>,
        IUserLoginStore<ApplicationUser>,
        IUserEmailStore<ApplicationUser>
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

        public Task<DateTimeOffset> GetLockoutEndDateAsync(ApplicationUser user)
        {
            return Task.FromResult(DateTimeOffset.MinValue);
        }

        public Task SetLockoutEndDateAsync(ApplicationUser user, DateTimeOffset lockoutEnd)
        {
            return Task.FromResult(0);
        }

        public Task<int> IncrementAccessFailedCountAsync(ApplicationUser user)
        {
            return Task.FromResult(0);
        }

        public Task ResetAccessFailedCountAsync(ApplicationUser user)
        {
            return Task.FromResult(0);
        }

        public Task<int> GetAccessFailedCountAsync(ApplicationUser user)
        {
            return Task.FromResult(0);
        }

        public Task<bool> GetLockoutEnabledAsync(ApplicationUser user)
        {
            return Task.FromResult(false);
        }

        public Task SetLockoutEnabledAsync(ApplicationUser user, bool enabled)
        {
            return Task.FromResult(false);
        }

        public Task SetPasswordHashAsync(ApplicationUser user, string passwordHash)
        {
            return Task.FromResult(user.PasswordHash = passwordHash);
        }

        public Task<string> GetPasswordHashAsync(ApplicationUser user)
        {
            return Task.FromResult(user.PasswordHash);
        }

        public Task<bool> HasPasswordAsync(ApplicationUser user)
        {
            return Task.FromResult(!string.IsNullOrEmpty(user.PasswordHash));
        }

        public Task SetTwoFactorEnabledAsync(ApplicationUser user, bool enabled)
        {
            return Task.FromResult(false);
        }

        public Task<bool> GetTwoFactorEnabledAsync(ApplicationUser user)
        {
            return Task.FromResult(false);
        }

        public Task SetPhoneNumberAsync(ApplicationUser user, string phoneNumber)
        {
            return Task.FromResult(user.PhoneNumber = phoneNumber);
        }

        public Task<string> GetPhoneNumberAsync(ApplicationUser user)
        {
            return Task.FromResult(user.PhoneNumber);
        }

        public Task<bool> GetPhoneNumberConfirmedAsync(ApplicationUser user)
        {
            return Task.FromResult(true);
        }

        public Task SetPhoneNumberConfirmedAsync(ApplicationUser user, bool confirmed)
        {
            return Task.FromResult(user.PhoneNumberConfirmed = confirmed);
        }

        public Task AddLoginAsync(ApplicationUser user, UserLoginInfo login)
        {
            return Task.FromResult(false);
        }

        public Task RemoveLoginAsync(ApplicationUser user, UserLoginInfo login)
        {
            return Task.FromResult(false);
        }

        public Task<IList<UserLoginInfo>> GetLoginsAsync(ApplicationUser user)
        {
            return Task.FromResult(new UserLoginInfo[] { } as IList<UserLoginInfo>);
        }

        public Task<ApplicationUser> FindAsync(UserLoginInfo login)
        {
            return Task.FromResult<ApplicationUser>(null);
        }

        public Task SetEmailAsync(ApplicationUser user, string email)
        {
            return Task.FromResult(false);
        }

        public Task<string> GetEmailAsync(ApplicationUser user)
        {
            return Task.FromResult(user.UserName);
        }

        public Task<bool> GetEmailConfirmedAsync(ApplicationUser user)
        {
            return Task.FromResult(true);
        }

        public Task SetEmailConfirmedAsync(ApplicationUser user, bool confirmed)
        {
            return Task.FromResult(false);
        }

        public Task<ApplicationUser> FindByEmailAsync(string email)
        {
            return FindByNameAsync(email);
        }
    }
}