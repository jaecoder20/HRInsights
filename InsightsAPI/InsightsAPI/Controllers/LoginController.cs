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
        public async Task<ActionResult<User>> Login([FromBody] User user)
        {
            var currentUser = await _userRepository.LoginUserAsync(user.Username, user.PasswordHash);

            if (currentUser == null)
            {
                return NotFound(new { message = "User not found." });
            }
            var employeeAccount = await _employeeRepository.GetEmployeeAsync(currentUser.Email);
            if (employeeAccount == null)
            {
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
