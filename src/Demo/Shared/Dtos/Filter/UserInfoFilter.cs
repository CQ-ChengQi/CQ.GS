﻿using CQ.GS.Shared.EnumModel;
using CQ.GS.Shared.Models;
using System.Linq.Expressions;

namespace CQ.GS.Shared.Dtos.Filter
{
    public class UserInfoFilter : PageInfo
    {
        /// <summary>
        /// 获取或设置 用户名。
        /// </summary>
        public string? UserName { get; set; }

        /// <summary>
        /// 获取或设置 名称。
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// 获取或设置 性别。
        /// </summary>
        public Gender Gender { get; set; }

        public int StartAge { get; set; }

        public int EndAge { get; set; }


        public Expression<Func<UserInfo, bool>> GenderExpression
        {
            get
            {
                var filter = PredicateBuilder.True<UserInfo>();

                if (!string.IsNullOrWhiteSpace(UserName))
                {
                    filter = filter.And(s => s.UserName.Contains(UserName));
                }

                if (!string.IsNullOrWhiteSpace(Name))
                {
                    filter = filter.And(s => s.Name.Contains(Name));
                }

                if (Gender != Gender.None)
                {
                    filter = filter.And(s => s.Gender == Gender);
                }

                if (StartAge > 0)
                {
                    filter = filter.And(s => s.Age >= StartAge);
                }

                if (EndAge > 0)
                {
                    filter = filter.And(s => s.Age <= EndAge);
                }

                return filter;
            }
        }

    }
}
