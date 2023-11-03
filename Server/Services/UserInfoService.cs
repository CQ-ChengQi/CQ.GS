using AutoMapper;
using CQ.GS.Server.Data;
using CQ.GS.Shared.Dtos.Filter;
using CQ.GS.Shared.Dtos.Input;
using CQ.GS.Shared.Models;

namespace CQ.GS.Server.Services
{
    public class UserInfoService : IUserInfoService
    {

        private readonly MyDbContext _context;
        private readonly IMapper _mapper;

        public UserInfoService(MyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<UserInfo> GetUserInfoList(UserInfoFilter filter)
        {
            filter.Total = _context.Users
                .Where(filter.GenderExpression)
                .Count();

            return _context.Users.Where(filter.GenderExpression)
                .OrderByDescending(s => s.UpdatedDate)
                .Skip(filter.Skip)
                .Take(filter.PageSize)
                .ToList();
        }

        public async Task Add(UserInfoAddInput input)
        {
            _context.Add(_mapper.Map<UserInfo>(input));
            await _context.SaveChangesAsync();
        }

        public async Task Update(UserInfoUpdateInput input)
        {
            var entity = _context.Users.FirstOrDefault(m => m.Id == input.Id);
            if (entity != null)
            {
                entity = _mapper.Map<UserInfo>(input);
                await _context.SaveChangesAsync();
            }
        }

        public UserInfo? GetUserInfoById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }
    }
}
