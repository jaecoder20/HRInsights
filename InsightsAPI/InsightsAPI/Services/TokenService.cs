using InsightsAPI.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace InsightsAPI.Services
{
    public class TokenService : ITokenService
    {
        private IConfiguration _config;
        public TokenService(IConfiguration config)
        {
            _config = config;
        }
        public string Generate(Employee employee)
        {
            // Creating a symmetric security key using the secret key stored in the appsettings.json file
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Secret"]));
            // Creating signing credentials using the secret key and the HMACSHA256 algorithm
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            // Creating a list of claims to be added to the token
            //Pieces of information about the user will be encoded into the token
            var claims = new[]
            {
                new Claim(ClaimTypes.GivenName,employee.FirstName),
                new Claim(ClaimTypes.Surname,employee.LastName),
                new Claim(ClaimTypes.Email,employee.Email),
                new Claim(ClaimTypes.MobilePhone,employee.PhoneNumber),
                new Claim(ClaimTypes.Role,employee.Role)

            };
            // Create the token using the issuer, audience, claims, expiration time, and signing credentials
            var token = new JwtSecurityToken(
                issuer: _config["JwtSettings:Issuer"],
                audience: _config["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(5), // Token expiration time (valid for 5 minutes)
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
