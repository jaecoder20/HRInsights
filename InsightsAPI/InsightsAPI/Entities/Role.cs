using System.Text.Json.Serialization;

namespace InsightsAPI.Entities
{
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; } // e.g., "HR Administrator", "Employee"

    }

}
