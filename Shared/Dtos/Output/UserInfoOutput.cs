﻿namespace CQ.GS.Shared.Dtos.Output
{
    public class UserInfoOutput : PageInfo
    {
        public string UserName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Gender { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
    }
}
