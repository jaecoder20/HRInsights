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
                //Running validation checks on the employee object to be added
                //if anything is missing, return null to indicate failure
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
                //returns the employee object to indicate success
                return employee;
            }
            catch (Exception ex)
            {
                //return null; regardless of the exception that occurs, returning null means failure
                return null;
            }
        }

        public async Task<bool> DeleteEmployeeAsync(string employeeId)
        {
            Employee employee = await GetEmployeeAsync(employeeId);

            try
            {
                if (employee == null)
                {
                    //return false; if the employee is not found, return false to indicate failure
                    return false;
                }
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            //return true; if the employee is found and deleted, return true to indicate success
            return true; 
            }
            catch (Exception ex)
            {
                //return false; if an exception occurs, return false to indicate failure
                return false;
            }

        }

        public async Task<Employee> GetEmployeeAsync(string employeeId)
        {
            //Searches for the employee by the string employeeId
            try
            {
                return await _context.Employees
                .FirstOrDefaultAsync(e => e.EmployeeId == employeeId);
            }
            catch (Exception ex)
            {
                // return null; if an exception occurs, return null to indicate failure
                return null;
            }
        }

        public async Task<Employee> GetEmployeeAsync(int employeeId)
        {
            //Searches for the employee by the integer employeeId, that is the primary key.
            //Though this method is not used in the controller, it is good to have it for future use
            try
            {
                return await _context.Employees.FindAsync(employeeId);
            }
            catch (Exception ex)
            {
                // return null; if an exception occurs, return null to indicate failure
                return null;
            }
        }

        public async Task<Employee> GetEmployeeByEmailAsync(string query)
        {
            //Searches for the employee by the email address
            try
            {
                return await _context.Employees
                .FirstOrDefaultAsync(e => e.Email == query);
            }
            catch (Exception ex)
            {
                // return null; if an exception occurs, return null to indicate failure
                return null;
            }
        }

        public async Task<Employee> GetEmployeeByNameAsync(string query)
        {
            //Searches for the employee by the first and last name
            try
            {
                string fname = query.Split(' ')[0];
                string lname = query.Split(' ')[1];

                return await _context.Employees
                    .FirstOrDefaultAsync(e => e.FirstName == fname && e.LastName == lname);
            }
            catch (Exception ex) {
                // return null; if an exception occurs, return null to indicate failure
                return null;

            }
        }

        public async Task<List<Employee>> GetEmployeesAsync()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<Employee> UpdateEmployeeAsync(Employee employee)
        {
            Employee existingEmployee = await GetEmployeeAsync(employee.EmployeeId);
            if (existingEmployee == null)
            {
                //return null; if the employee is not found, return null to indicate failure
                return null;
            }

            // Update the existing employee object fields with the new employee object
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
