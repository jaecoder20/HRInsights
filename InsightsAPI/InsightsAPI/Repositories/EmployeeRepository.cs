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
            try
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
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<bool> DeleteEmployeeAsync(string employeeId)
        {
            var employee = await GetEmployeeAsync(employeeId);

            if (employee == null)
            {
                return false;
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return true; 
        }

        public async Task<Employee> GetEmployeeAsync(string employeeId)
        {
            return await _context.Employees
            .FirstOrDefaultAsync(e => e.EmployeeId == employeeId);
        }

        public async Task<Employee> GetEmployeeAsync(int employeeId)
        {
            return await _context.Employees.FindAsync(employeeId);
        }

        public async Task<Employee> GetEmployeeByEmailAsync(string query)
        {
            try
            {
                return await _context.Employees
                .FirstOrDefaultAsync(e => e.Email == query);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<Employee> GetEmployeeByNameAsync(string query)
        {
            try
            {
                string fname = query.Split(' ')[0];
                string lname = query.Split(' ')[1];

                return await _context.Employees
                    .FirstOrDefaultAsync(e => e.FirstName == fname && e.LastName == lname);
            }
            catch (Exception ex) {
                return null;

            }
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
