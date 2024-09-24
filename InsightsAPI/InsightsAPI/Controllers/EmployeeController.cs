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

        [Authorize(Roles = "HR Administrator, Employee")]
        [HttpGet("")]
        public async Task<ActionResult<List<Employee>>> GetAllEmployees()
        {
            var employees = await _employeeRepository.GetEmployeesAsync();

            if (employees == null || !employees.Any())
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
            // Try to parse the query as an ID first
            if (int.TryParse(query, out int id))
            {
                var employeeById = await _employeeRepository.GetEmployeeAsync(id);
                if (employeeById != null)
                {
                    return Ok(new
                    {
                        message = "Employee retrieved successfully by ID.",
                        employee = employeeById
                    });
                }
            }

            // Search by name if ID search fails
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
            var addedEmployee = await _employeeRepository.AddEmployeeAsync(employee);

            if (addedEmployee == null)
            {
                return BadRequest("Invalid employee data.");
            }

            return CreatedAtAction(nameof(GetEmployee), new { id = addedEmployee.EmployeeId }, new
            {
                message = "Employee successfully created.",
                employee = addedEmployee
            });
        }
        [Authorize(Roles = "HR Administator")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> UpdateEmployee(int id, [FromBody] Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return BadRequest(new { message = "Employee ID mismatch." });
            }

            var updatedEmployee = await _employeeRepository.UpdateEmployeeAsync(employee);

            if (updatedEmployee == null)
            {
                return NotFound(new { message = "Employee not found." });
            }

            return Ok(new { 
                message = "Employee updated successfully.", 
                employee = updatedEmployee 
            }
            );
        }
        [Authorize(Roles = "HR Administator")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            var employee = await _employeeRepository.GetEmployeeAsync(id);

            if (employee == null)
            {
                return NotFound(new { message = "Employee not found." });
            }

            bool deleteResult = await _employeeRepository.DeleteEmployeeAsync(id);

            if (!deleteResult)
            {
                return BadRequest(new { message = "Error deleting employee." });
            }

            return Ok(new { message = "Employee deleted successfully." });
        }

    }
}
