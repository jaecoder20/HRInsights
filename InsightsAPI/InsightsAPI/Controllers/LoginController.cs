using InsightsAPI.Entities;
using InsightsAPI.Repositories;
using InsightsAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InsightsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly ITokenService _tokenService;
        private readonly IUserRepository _userRepository;
        private readonly IEmployeeRepository _employeeRepository;
        public LoginController(IConfiguration config, ITokenService tokenService, IUserRepository userRepository, IEmployeeRepository employeeRepository)
        {
            _config = config;
            _tokenService = tokenService;
            _userRepository = userRepository;
            _employeeRepository = employeeRepository;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<User>> Login([FromBody] LoginRequest login)
        {
            //returns the USer object if the user is found in the database (name and password math)
            User currentUser = await _userRepository.LoginUserAsync(login.Email, login.PasswordHash);

            if (currentUser == null)
            {
                return NotFound(new { message = "User not found." });
            }
            Employee employeeAccount = await _employeeRepository.GetEmployeeByEmailAsync(currentUser.Email);
            
            if (employeeAccount == null)
            {
                //Users should not be able to login if they have an exisiting user account but not an existing employee account
                // There are some reasons why this is important:
                // 1. Allowing a user to login without an employee account will cause inconsistencies because we need employee information to render certain data on the frontend, these are not stored in the User table
                // 2. User Roles and Authorization are tied to the employee account, not the user account. And the role is factored into the generation of the token
                return NotFound(new { 
                    message = "User email does not match an employee email", 
                });
            }
            return Ok(new
            {
                message = "User logged in successfully",
                employee = employeeAccount,
                token = _tokenService.Generate(employeeAccount)
            });

        }
    }
}
