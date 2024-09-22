namespace InsightsAPI.Entities
{
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; } // e.g., "HR Administrator", "Employee"

        // Role can be associated with many users.
        public ICollection<User> Users { get; set; }
    }

}
