using Microsoft.AspNetCore.Components;

namespace CQ;

/// <summary>
/// 外观变种 。
/// </summary>
public enum MyToggleVariant
{
    /// <summary>
    /// 默认。
    /// </summary>
    Default,

    /// <summary>
    /// 外边框线。
    /// </summary>
    Outline
}

public enum MyToggleSize
{
    Default,
    SM,
    LG
}

public partial class MyToggle : MyComponentBase
{

    private IList<MyClassPropBase> _myClassProps = new List<MyClassPropBase>();


    private string _class => string.Join(" ", _myClassProps.Select(s => s.GetClassName()));


    [Parameter]
    public bool Checked { get; set; }

    [Parameter]
    public EventCallback<bool> CheckedChanged { get; set; }

    [Parameter]
    public MyToggleVariant Variant { get; set; }

    [Parameter]
    public MyToggleSize Size { get; set; }


    private string CheckedStatus => Checked ? "on" : "off";

    protected override async Task OnParametersSetAsync()
    {
        await BuilderClass();
    }

    private Task BuilderClass()
    {
        _myClassProps.Clear();

        _myClassProps.Add(new MyCommonClassProp("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors"));
        _myClassProps.Add(new MyFocusVisibleClassProp("focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"));
        _myClassProps.Add(new MyDisabledClassProp("disabled:pointer-events-none disabled:opacity-50"));
        _myClassProps.Add(new MyCommonClassProp("data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"));
        _myClassProps.Add(new MyCommonClassProp("bg-transparent h-10 px-3"));


        switch (Variant)
        {
            case MyToggleVariant.Outline:
                _myClassProps.Add(new MyCommonClassProp("border border-input"));
                _myClassProps.Add(new MyHoverClassProp("hover:bg-accent hover:text-accent-foreground"));
                break;
            default:
                _myClassProps.Add(new MyHoverClassProp("hover:bg-muted hover:text-muted-foreground"));
                break;
        }


        switch (Size)
        {
            case MyToggleSize.LG:
                _myClassProps.Add(new MyCommonClassProp("h-10 px-3"));
                break;
            case MyToggleSize.SM:
                _myClassProps.Add(new MyCommonClassProp("h-8 px-2"));
                break;
            default:
                _myClassProps.Add(new MyCommonClassProp("h-9 px-3"));
                break;
        }

        return Task.CompletedTask;
    }


    protected async void HandlerClick()
    {
        Checked = !Checked;

        if (CheckedChanged.HasDelegate)
        {
            await CheckedChanged.InvokeAsync(Checked);
        }
    }
}
