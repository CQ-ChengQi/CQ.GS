using AutoMapper;
using CQ.GS.Shared;
using CQ.GS.Shared.Dtos.Output;
using CQ.GS.Shared.EnumModel;
using CQ.GS.Shared.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace CQ.GS.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly List<UserInfo> _list = new List<UserInfo>();
        private readonly IMapper _mapper;


        public UserController(IMapper mapper)
        {
            _mapper = mapper;

            var nameGenerator = new ChineseNameGenerator();

            for (int i = 0; i < 1000; i++)
            {
                var tupe = nameGenerator.GenerateRandomChineseNameWithGender();

                _list.Add(new UserInfo
                {
                    Name = tupe.Item1,
                    Gender = tupe.Item2,
                });
            }
        }


        [HttpGet]
        public ApiResultList<UserInfoOutput> Get()
        {
            var list = _mapper.Map<IList<UserInfoOutput>>(_list);
            return new ApiResultList<UserInfoOutput>
            {
                Code = ResultCode.Success,
                Data = list
            };
        }
    }

    public class ChineseNameGenerator
    {
        private static string[] FirstNames = { "张", "王", "李", "赵", "刘", "陈", "杨", "黄", "吴", "马" };
        private static string[] LastNames = { "小", "明", "伟", "静", "丽", "华", "强", "磊", "红", "敏" };
        private static Gender[] Genders = { Gender.Man, Gender.Girl };
        private Random random = new Random();

        public Tuple<string, Gender> GenerateRandomChineseNameWithGender()
        {
            string firstName = FirstNames[random.Next(FirstNames.Length)];
            string lastName = LastNames[random.Next(LastNames.Length)];

            // 生成一个随机长度的中文名字
            int nameLength = random.Next(1, 2); // 2到3个汉字
            var middleName = new StringBuilder();
            for (int i = 0; i < nameLength; i++)
            {
                char c = (char)random.Next(0x4e00, 0x9fff); // 生成随机的中文字符
                middleName.Append(c);
            }

            Gender gender = Genders[random.Next(Genders.Length)];
            return new Tuple<string, Gender>($"{firstName}{middleName}{lastName}", gender);
        }
    }
}
