﻿namespace CQ.GS.Client.Services
{
    public class AppSettings
    {
        public AppSettings()
        {
            this.NavMenuWidth = "20em";
            this.AppBarHeight = "10em";
        }

        /// <summary>
        /// 获取或设置 菜单宽度。
        /// </summary>
        public string NavMenuWidth { get; set; }

        /// <summary>
        /// 获取或设置 AppBar 高度。
        /// </summary>
        public string AppBarHeight { get; set; }
    }
}
