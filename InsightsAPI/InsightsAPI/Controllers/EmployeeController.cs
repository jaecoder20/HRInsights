using InsightsAPI.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InsightsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetAllEmployees()
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
    }
}
