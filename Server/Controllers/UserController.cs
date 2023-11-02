using CQ.GS.Server.Data;
using Microsoft.AspNetCore.Mvc;

namespace CQ.GS.Server.Controllers
{



    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext _context;

        public UserController(MyDbContext context)
        {
            _context = context;
        }



        //    private readonly IMapper _mapper;
        //    private readonly UserService _userService;


        //    public UserController(IMapper mapper, UserService userService)
        //    {
        //        _mapper = mapper;
        //        _userService = userService;
        //    }

        //    [HttpGet]
        //    public Task<ApiResultList<UserInfoOutput>> Get([FromQuery] UserInfoFilter filter)
        //    {
        //        var list = _userService.GetUsers();
        //        var total = list.Count;

        //        list = list.Where(filter.GenderExpression.Compile())
        //              .Skip(filter.PageSize * (filter.PageIndex - 1))
        //              .Take(filter.PageSize)
        //              .ToList();

        //        return Task.FromResult(new ApiResultList<UserInfoOutput>
        //        {
        //            Code = ResultCode.Success,
        //            Data = _mapper.Map<IList<UserInfoOutput>>(list),
        //            Total = total,
        //        });
        //    }

        //    [HttpPost("query")]
        //    public Task<ApiResultList<UserInfoOutput>> Query(UserInfoFilter filter)
        //    {
        //        var list = _userService.GetUsers();
        //        var total = list.Count;

        //        if (!string.IsNullOrWhiteSpace(filter.Name))
        //        {
        //            list = list.Where(s => s.Name.Contains(filter.Name)).ToList();
        //        }

        //        if (!string.IsNullOrWhiteSpace(filter.UserName))
        //        {
        //            list = list.Where(s => s.UserName.Contains(filter.UserName)).ToList();
        //        }

        //        if (filter.Gender.HasValue)
        //        {
        //            list = list.Where(s => s.Gender == filter.Gender.Value).ToList();
        //        }

        //        list = list
        //              .Skip(filter.PageSize * (filter.PageIndex - 1))
        //              .Take(filter.PageSize)
        //              .ToList();


        //        return Task.FromResult(new ApiResultList<UserInfoOutput>
        //        {
        //            Code = ResultCode.Success,
        //            Data = _mapper.Map<IList<UserInfoOutput>>(list),
        //            Total = total,
        //        });
        //    }
    }


}
