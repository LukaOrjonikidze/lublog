using lublog.Data;
using lublog.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace lublog.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly BlogDbContext dbContext;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthController(BlogDbContext dbContext, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            this.dbContext = dbContext;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;

        }

        [HttpGet, Authorize]
        public async Task<IActionResult> GetMe()
        {
            string? email = User?.FindFirstValue(ClaimTypes.Email);
            User? user = await dbContext.Users.FromSql($"SELECT * FROM [Users] WHERE email = {email}").FirstAsync();
            return Ok(user);
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterUserRequest registerUserRequest)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(registerUserRequest.Password);
            User user = new User()
            {
                Id = Guid.NewGuid(),
                Name = registerUserRequest.Name,
                Email = registerUserRequest.Email,
                PasswordHash = passwordHash
            };
            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginUserRequest loginUserRequest)
        {
            User? user = await dbContext.Users.FromSql($"SELECT * FROM [Users] WHERE email = {loginUserRequest.Email}").FirstAsync();
            if (user == null)
            {
                return BadRequest("User doesn't exist!");
            }
            if (!BCrypt.Net.BCrypt.Verify(loginUserRequest.Password, user.PasswordHash))
            {
                return BadRequest("Invalid Password!");
            }
            string token = CreateToken(user);
            _httpContextAccessor?.HttpContext?.Response.Headers.Add("Authorization", "Bearer " + token);
            string response = "Success";
            
            return Ok(new {response, user});

        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email)
            };
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Key").Value!));

            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            JwtSecurityToken token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );
            string jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
