using CQ.GS.Shared;
using Microsoft.AspNetCore.Mvc;

namespace CQ.GS.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return new[] { new User(name: "Zhang San"), new User(name: "Li Si") };
        }
    }
}
