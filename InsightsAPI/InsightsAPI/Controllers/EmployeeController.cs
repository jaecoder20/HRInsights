using InsightsAPI.Data;
using InsightsAPI.Entities;
using InsightsAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace InsightsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeController(IEmployeeRepository employeeRepository) {
            _employeeRepository = employeeRepository;
        }

        // Determines which employees have access based on their roles as stored in the database
        [Authorize(Roles = "HR Administrator, Employee")]
        [HttpGet("")]
        public async Task<ActionResult<List<Employee>>> GetAllEmployees()
        {
            List<Employee> employees = await _employeeRepository.GetEmployeesAsync();
            bool noEmployees = employees == null || !employees.Any();
            if (noEmployees)
            {
                return NotFound(new { message = "No employees found." });
            }

            return Ok(new
            {
                message = "Employees retrieved successfully.",
                employees = employees
            });

        }
        [Authorize(Roles = "HR Administrator, Employee")]
        [HttpGet("search")]
        public async Task<ActionResult<List<Employee>>> GetEmployee([FromQuery] string query)
        {
            //First attempt search by Eployee ID
            if(!string.IsNullOrEmpty(query))
{
                Employee employeeById = await _employeeRepository.GetEmployeeAsync(query);  
                if (employeeById != null)
                {
                    return Ok(new
                    {
                        message = "Employee retrieved successfully by ID.",
                        employee = employeeById
                    });
                }
            }


            // Search by name if Employee ID search fails (returns null)
            var employeeByName = await _employeeRepository.GetEmployeeByNameAsync(query);
            if (employeeByName != null)
            {
                return Ok(new
                {
                    message = "Employee retrieved successfully by name.",
                    employee = employeeByName
                });
            }

            // Search by email if name search fails
            var employeeByEmail = await _employeeRepository.GetEmployeeByEmailAsync(query);
            if (employeeByEmail != null)
            {
                return Ok(new
                {
                    message = "Employee retrieved successfully by email.",
                    employee = employeeByEmail
                });
            }

            // If no match found, return NotFound
            return NotFound(new
            {
                message = "Employee not found."
            });

        }
        [Authorize(Roles = "HR Administrator")]
        [HttpPost]
        public async Task<ActionResult<Employee>> AddEmployee([FromBody] Employee employee)
        {
            if (employee == null)
            {
                return BadRequest(new { message = "Invalid employee data." });
            }
            //If the employee is added successfully, then the repository will return the employee object
            Employee addedEmployee = await _employeeRepository.AddEmployeeAsync(employee);
            if (addedEmployee == null)
            {
                return BadRequest(new { message = "Error adding employee." });
            }

            // Returns a 201 Status code with the employee information
            return CreatedAtAction(nameof(GetEmployee), new { id = addedEmployee.EmployeeId }, new
            {
                message = "Employee successfully created.",
                employee = addedEmployee
            });
        }
        [Authorize(Roles = "HR Administrator")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> UpdateEmployee(string id, [FromBody] Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return BadRequest(new { message = "Employee ID mismatch." });
            }

            // If the employee gets updated successfully, the repository will return the updated employee object
            Employee updatedEmployee = await _employeeRepository.UpdateEmployeeAsync(employee);

            if (updatedEmployee == null)
            {
                return NotFound(new { message = "Employee not found." });
            }

            return Ok(new
            {
                message = "Employee updated successfully.",
                employee = updatedEmployee
            });
        }
        [Authorize(Roles = "HR Administrator")]
        [HttpDelete("{employeeId}")]
        public async Task<ActionResult> DeleteEmployee(string employeeId)
        {
            Employee employee = await _employeeRepository.GetEmployeeAsync(employeeId);

            if (employee == null)
            {
                return NotFound(new { message = "Employee not found." });
            }

            bool deleteResult = await _employeeRepository.DeleteEmployeeAsync(employeeId);

            if (!deleteResult)
            {
                return BadRequest(new { message = "Error deleting employee." });
            }

            return Ok(new { message = "Employee deleted successfully." });
        }

    }
}
