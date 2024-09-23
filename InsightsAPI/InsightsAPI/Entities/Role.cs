using System.Text.Json.Serialization;

namespace InsightsAPI.Entities
{
    public class Role
    {
        [JsonIgnore]
        public int RoleId { get; set; }
        public string RoleName { get; set; } // e.g., "HR Administrator", "Employee"

        // Role can be associated with many users.
        [JsonIgnore]
        public ICollection<User> Users { get; set; }
    }

}
