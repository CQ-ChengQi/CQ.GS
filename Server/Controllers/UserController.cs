using AutoMapper;
using CQ.GS.Server.Services;
using CQ.GS.Shared;
using CQ.GS.Shared.Dtos.Filter;
using CQ.GS.Shared.Dtos.Output;
using CQ.GS.Shared.EnumModel;
using Microsoft.AspNetCore.Mvc;

namespace CQ.GS.Server.Controllers
{



    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly UserService _userService;


        public UserController(IMapper mapper, UserService userService)
        {
            _mapper = mapper;
            _userService = userService;
        }

        [HttpPost("query")]
        public Task<ApiResultList<UserInfoOutput>> Query(UserInfoFilter filter)
        {
            var list = _userService.GetUsers();
            var total = list.Count;

            if (!string.IsNullOrWhiteSpace(filter.Name))
            {
                list = list.Where(s => s.Name.Contains(filter.Name)).ToList();
            }

            if (!string.IsNullOrWhiteSpace(filter.UserName))
            {
                list = list.Where(s => s.UserName.Contains(filter.UserName)).ToList();
            }

            if (filter.Gender.HasValue)
            {
                list = list.Where(s => s.Gender == filter.Gender.Value).ToList();
            }

            list = list
                  .Skip(filter.PageSize * (filter.PageIndex - 1))
                  .Take(filter.PageSize)
                  .ToList();


            return Task.FromResult(new ApiResultList<UserInfoOutput>
            {
                Code = ResultCode.Success,
                Data = _mapper.Map<IList<UserInfoOutput>>(list),
                Total = total,
            });
        }
    }


}
