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
        public Task<Employee> AddEmployeeAsync(Employee employee)
        {
            if (employee == null)
            {
                return BadRequest("Employee data is required.");
            }

            if (string.IsNullOrWhiteSpace(employee.FirstName))
            {
                return BadRequest("Employee first name is required.");
            }

            if (string.IsNullOrWhiteSpace(employee.LastName))
            {
                return BadRequest("Employee last name is required.");
            }

            if (string.IsNullOrWhiteSpace(employee.Email))
            {
                return BadRequest("Employee email is required.");
            }

            if (string.IsNullOrWhiteSpace(employee.PhoneNumber))
            {
                return BadRequest("Employee phone number is required.");
            }

            if (string.IsNullOrWhiteSpace(employee.Position))
            {
                return BadRequest("Employee position is required.");
            }

            if (employee.DateOfHire == DateTime.MinValue)
            {
                return BadRequest("Employee date of hire is required.");
            }

            if (employee.Salary <= 0)
            {
                return BadRequest("Employee salary must be greater than zero.");
            }

            if (employee.Status == EmployeeStatus.Onboarding)
            {
                return BadRequest("Employee status cannot be 'Onboarding' when adding a new employee.");
            }

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.EmployeeId }, employee);
        }

        public Task<Employee> DeleteEmployeeAsync(int employeeId)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound("Employee not found.");
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        public Task<Employee> GetEmployeeAsync(int employeeId)
        {
            var employeesQuery = _context.Employees.AsQueryable();

            // Apply filters based on the provided query parameters
            if (id.HasValue)
            {
                employeesQuery = employeesQuery.Where(e => e.EmployeeId == id.Value);
            }

            if (!string.IsNullOrWhiteSpace(firstName))
            {
                employeesQuery = employeesQuery.Where(e => e.FirstName.Contains(firstName));
            }

            if (!string.IsNullOrWhiteSpace(lastName))
            {
                employeesQuery = employeesQuery.Where(e => e.LastName.Contains(lastName));
            }

            if (!string.IsNullOrWhiteSpace(email))
            {
                employeesQuery = employeesQuery.Where(e => e.Email.Contains(email));
            }

            var employees = await employeesQuery.ToListAsync();

            if (employees.Count() == 0)
            {
                return NotFound("No employees matching the search criteria were found.");
            }

            return Ok(employees);
        }

        public Task<List<Employee>> GetEmployeesAsync()
        {
            var employees = new List<Employee>
            {
                new Employee
                {
                    EmployeeId = 1,
                    FirstName = "Test",
                    LastName = "Test",
                    Email = "Test@test.com",
                    PhoneNumber = "1234567890",
                    Position = "Tester",
                    DateOfHire = DateTime.Now,
                    Salary = 100,
                    Status = EmployeeStatus.Active
                }

            };
            return Ok(employees);

        }

        public Task<Employee> UpdateEmployeeAsync(Employee employee)
        {
            if (employee == null)
            {
                return BadRequest("Employee data is required.");
            }

            if (id != employee.EmployeeId)
            {
                return BadRequest("Employee ID in the URL must match the ID of the employee data.");
            }

            var existingEmployee = await _context.Employees.FindAsync(id);

            if (existingEmployee == null)
            {
                return NotFound("Employee not found.");
            }

            if (string.IsNullOrWhiteSpace(employee.FirstName))
            {
                return BadRequest("Employee first name is required.");
            }

            if (string.IsNullOrWhiteSpace(employee.LastName))
            {
                return BadRequest("Employee last name is required.");
            }

            if (string.IsNullOrWhiteSpace(employee.Email))
            {
                return BadRequest("Employee email is required.");
            }

            if (string.IsNullOrWhiteSpace(employee.PhoneNumber))
            {
                return BadRequest("Employee phone number is required.");
            }

            if (string.IsNullOrWhiteSpace(employee.Position))
            {
                return BadRequest("Employee position is required.");
            }

            if (employee.DateOfHire == DateTime.MinValue)
            {
                return BadRequest("Employee date of hire is required.");
            }

            if (employee.Salary <= 0)
            {
                return BadRequest("Employee salary must be greater than zero.");
            }

            if (employee.Status == EmployeeStatus.Onboarding)
            {
                return BadRequest("Employee status cannot be 'Onboarding' when updating an employee.");
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

            return Ok(existingEmployee);
        }
    }
}
