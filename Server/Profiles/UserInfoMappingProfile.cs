using AutoMapper;
using CQ.GS.Shared.Dtos.Output;
using CQ.GS.Shared.Models;

namespace CQ.GS.Server.Profiles
{
    public class UserInfoMappingProfile : Profile
    {
        public UserInfoMappingProfile()
        {
            CreateMap<UserInfo, UserInfoOutput>()
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender.GetDisplayName()));
        }
    }
}
