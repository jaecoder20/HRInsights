using InsightsAPI.Entities;

namespace InsightsAPI.Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> GetUsersAsync();
        Task<User> GetUserAsync(int userId);
        Task<User> AddUserAsync(User user);
        Task<User> UpdateUserAsync(User user);
        Task<bool> DeleteUserAsync(int userId);
        Task<User> LoginUserAsync(string username, string password);
        Task<User> RegisterUserAsync(User user);

    }
}
