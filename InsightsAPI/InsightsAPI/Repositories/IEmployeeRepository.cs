using InsightsAPI.Entities;

namespace InsightsAPI.Repositories
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetEmployeesAsync();
        Task<Employee> GetEmployeeAsync(int employeeId);
        Task<Employee> GetEmployeeAsync(string employeeEmail);
        Task<Employee> AddEmployeeAsync(Employee employee);
        Task<Employee> UpdateEmployeeAsync(Employee employee);
        Task<bool> DeleteEmployeeAsync(string employeeId);
        Task<Employee> GetEmployeeByNameAsync(string query);
        Task<Employee> GetEmployeeByEmailAsync(string query);
    }
}
