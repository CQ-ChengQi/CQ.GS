using CQ.GS.Shared.EnumModel;
using CQ.GS.Shared.Models;
using System.Text;

namespace CQ.GS.Server.Services
{
    public class UserService
    {
        private readonly List<UserInfo> _list;

        public UserService()
        {
            _list = new List<UserInfo>();

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

      



        public List<UserInfo> GetUsers()
        {
            return _list;
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
