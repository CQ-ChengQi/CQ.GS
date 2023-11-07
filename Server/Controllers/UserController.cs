using AutoMapper;
using CQ.GS.Server.Services;
using CQ.GS.Shared;
using CQ.GS.Shared.Dtos.Filter;
using CQ.GS.Shared.Dtos.Input;
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
        private readonly IUserInfoService _userInfoService;


        public UserController(IMapper mapper, IUserInfoService userInfoService)
        {
            _mapper = mapper;
            _userInfoService = userInfoService;
        }

        [HttpGet]
        public Task<ApiResultList<UserInfoOutput>> Get([FromQuery] UserInfoFilter filter)
        {
            var list = _userInfoService.GetUserInfoList(filter);

            return Task.FromResult(new ApiResultList<UserInfoOutput>
            {
                Code = ResultCode.Success,
                Data = _mapper.Map<IList<UserInfoOutput>>(list),
                Total = filter.Total,
            });
        }

        [HttpGet("{id}")]
        public Task<ApiResult<UserInfoUpdateInput>> Get(int id)
        {
            Thread.Sleep(3000);
            var entity = _userInfoService.GetUserInfoById(id);

            if (entity == null)
            {
                return Task.FromResult(new ApiResult<UserInfoUpdateInput>
                {
                    Code = ResultCode.Error,
                    Message = "无数据"
                });
            }

            return Task.FromResult(new ApiResult<UserInfoUpdateInput>
            {
                Code = ResultCode.Success,
                Data = _mapper.Map<UserInfoUpdateInput>(entity),
            });
        }

        [HttpPut("{id}")]
        public async Task<ApiResult> Put(long id, [FromBody] UserInfoUpdateInput input)
        {
            try
            {
                await _userInfoService.Update(id, input);
                return new ApiResult { Code = ResultCode.Success, Message = "修改用户信息成功！" };
            }
            catch (Exception ex)
            {
                return new ApiResult { Code = ResultCode.Error, Message = ex.Message };
            }
        }

        [HttpPost]
        public Task<ApiResult> Add([FromBody] UserInfoAddInput input)
        {
            try
            {
                _userInfoService.Add(input);
                return Task.FromResult(new ApiResult { Code = ResultCode.Success, Message = "添加用户信息成功！" });
            }
            catch (Exception ex)
            {
                return Task.FromResult(new ApiResult { Code = ResultCode.Error, Message = ex.Message });
            }
        }

    }
}
