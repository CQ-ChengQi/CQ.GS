
using CQ.GS.Shared.Utils.Attributes;

namespace CQ.GS
{
    public static class EnumExtension
    {
        public static string GetDisplayName(this Enum value)
        {
            var displayNameAttribute = value.GetType()
                .GetField(value.ToString())
                ?.GetCustomAttributes(typeof(DisplayNameAttribute), false)
                .FirstOrDefault() as DisplayNameAttribute;

            return displayNameAttribute?.DisplayName ?? value.ToString();
        }
    }
}
