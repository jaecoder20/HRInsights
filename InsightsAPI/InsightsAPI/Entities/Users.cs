namespace InsightsAPI.Entities
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        // Foreign key to the Role
        public int RoleId { get; set; }

        //  User belongs to one Role.
        public Role Role { get; set; }
    }

}
