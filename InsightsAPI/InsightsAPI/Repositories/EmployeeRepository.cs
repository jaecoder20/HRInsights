using InsightsAPI.Data;
using InsightsAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace InsightsAPI.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            if (employee == null || string.IsNullOrWhiteSpace(employee.FirstName) ||
            string.IsNullOrWhiteSpace(employee.LastName) ||
            string.IsNullOrWhiteSpace(employee.Email) ||
            string.IsNullOrWhiteSpace(employee.PhoneNumber) ||
            string.IsNullOrWhiteSpace(employee.Position) ||
            employee.DateOfHire == DateTime.MinValue ||
            employee.Salary <= 0)
            {
                return null; 
            }

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<bool> DeleteEmployeeAsync(int employeeId)
        {
            var employee = await _context.Employees.FindAsync(employeeId);

            if (employee == null)
            {
                return false;
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return true; 
        }

        public async Task<Employee> GetEmployeeAsync(int employeeId)
        {
            return await _context.Employees
            .Include(e => e.Role)  
            .FirstOrDefaultAsync(e => e.EmployeeId == employeeId);
        }
        public async Task<Employee> GetEmployeeAsync(string employeeEmail)
        {
            return await _context.Employees
                .Include(e => e.Role)
                .FirstOrDefaultAsync(e => e.Email == employeeEmail);
        }

        public async Task<List<Employee>> GetEmployeesAsync()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<Employee> UpdateEmployeeAsync(Employee employee)
        {
            var existingEmployee = await _context.Employees.FindAsync(employee.EmployeeId);

            if (existingEmployee == null)
            {
                return null;
            }

            existingEmployee.FirstName = employee.FirstName;
            existingEmployee.LastName = employee.LastName;
            existingEmployee.Email = employee.Email;
            existingEmployee.PhoneNumber = employee.PhoneNumber;
            existingEmployee.Position = employee.Position;
            existingEmployee.DateOfHire = employee.DateOfHire;
            existingEmployee.Salary = employee.Salary;
            existingEmployee.Status = employee.Status;
            await _context.SaveChangesAsync();

            return existingEmployee;
        }
    }
}
