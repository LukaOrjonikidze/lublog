using lublog.Data;
using lublog.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Security.Claims;

namespace lublog.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BlogsController : Controller
    {
        private readonly BlogDbContext dbContext;

        public BlogsController(BlogDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetBlogs()
        {
            return Ok(await dbContext.Blogs.Include(b => b.User)
                        .Select(b => new {
                            b.Id,
                            b.Title,
                            b.Text,
                            User = new
                            {
                                b.User.Id,
                                b.User.Name,
                                b.User.Email
                            }
                        })
                        .ToListAsync());
        }

        [HttpGet]
        [Route("{id:guid}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetBlog([FromRoute] Guid id)
        {
            Blog? blog = await dbContext.Blogs.FindAsync(id);
            if (blog == null)
            {
                return BadRequest("Blog doesn't exist!");
            }
            return Ok(blog);
        }

        [HttpPost]
        public async Task<IActionResult> AddBlog(AddBlogRequest addBlogRequest)
        {
            string? email = User?.FindFirstValue(ClaimTypes.Email);
            User user = await dbContext.Users.Where(e => e.Email.Equals(email)).FirstAsync();
            Blog blog = new Blog()
            {
                Id = Guid.NewGuid(),
                Title = addBlogRequest.Title,
                Text = addBlogRequest.Text,
                UserId = user.Id,
                User = user
            };
            await dbContext.Blogs.AddAsync(blog);
            await dbContext.SaveChangesAsync();
            return Ok(blog);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateBlog([FromRoute] Guid id, UpdateBlogRequest updateBlogRequest)
        {
            Blog? blog = await dbContext.Blogs.FindAsync(id);
            if (blog == null)
            {
                return BadRequest("Blog doesn't exist!");
            }
            string? email = User?.FindFirstValue(ClaimTypes.Email);
            User user = await dbContext.Users.Where(e => e.Email.Equals(email)).FirstAsync();
            if (blog.UserId != user.Id)
            {
                return BadRequest("This blog doesn't belong to you!");
            }
            blog.Title = updateBlogRequest.Title;
            blog.Text = updateBlogRequest.Text;
            await dbContext.SaveChangesAsync();
            return Ok(blog);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteBlog([FromRoute] Guid id)
        {
            Blog? blog = await dbContext.Blogs.FindAsync(id);
            if (blog == null)
            {
                return BadRequest("Blog doesn't exist!");
            }
            string? email = User?.FindFirstValue(ClaimTypes.Email);
            User user = await dbContext.Users.Where(e => e.Email.Equals(email)).FirstAsync();
            if (blog.UserId != user.Id)
            {
                return BadRequest("This blog doesn't belong to you!");
            }
            dbContext.Remove(blog);
            await dbContext.SaveChangesAsync();
            return Ok(blog);
            
        }
    }
}
