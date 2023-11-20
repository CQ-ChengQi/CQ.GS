using Microsoft.AspNetCore.Components;

public abstract class MyComponentBase : ComponentBase
{
    /// <summary>
    /// 自定义类名称，多个用空格分割。
    /// </summary>
    [Parameter]
    public string? Class { get; set; }


    /// <summary>
    /// 子元素。
    /// </summary>
    [Parameter]
    public RenderFragment? ChildContent { get; set; }

    /// <summary>
    /// 将所有未被其他参数匹配的参数收集到一个字典中，并将其提供给你。这个字典的键是参数的名字，值是参数的值。
    /// </summary>
    [Parameter(CaptureUnmatchedValues = true)]
    public Dictionary<string, object?> UserAttributes { get; set; } = new Dictionary<string, object?>();

    /// <summary>
    /// 如果没有指定元素 ID，则自动生成一个 。
    /// </summary>
    public string FieldId => UserAttributes.ContainsKey("id") ? UserAttributes["id"]?.ToString() ?? $"myinput-{Guid.NewGuid()}" : $"myinput-{Guid.NewGuid()}";
}