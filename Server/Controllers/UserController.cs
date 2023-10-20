using CQ.GS.Shared;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace CQ.GS.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly List<User> _list = new List<User>();


        public UserController()
        {
            var nameGenerator = new ChineseNameGenerator();
           
            for (int i = 0; i < 1000; i++)
            {
                var tupe = nameGenerator.GenerateRandomChineseNameWithGender();
                _list.Add(new Shared.User(tupe.Item1, tupe.Item2));
            }
        }


        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _list;
        }
    }

    public class ChineseNameGenerator
    {
        private static string[] FirstNames = { "张", "王", "李", "赵", "刘", "陈", "杨", "黄", "吴", "马" };
        private static string[] LastNames = { "小", "明", "伟", "静", "丽", "华", "强", "磊", "红", "敏" };
        private static string[] Genders = { "男", "女" };
        private Random random = new Random();

        public Tuple<string, string> GenerateRandomChineseNameWithGender()
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

            string gender = Genders[random.Next(Genders.Length)];
            return new Tuple<string, string>($"{firstName}{middleName}{lastName}", gender);
        }
    }
}
