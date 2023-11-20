using System.ComponentModel.DataAnnotations;

namespace CQ;

public static class EnumExtension
{

    public static string GetDisplayName(this Enum value)
    {
        var displayNameAttribute = value.GetType()
            .GetField(value.ToString())
            ?.GetCustomAttributes(typeof(DisplayAttribute), false)
            .FirstOrDefault() as DisplayAttribute;

        return displayNameAttribute?.Name ?? value.ToString();
    }

}
