namespace CQ;

public abstract class MyPseudoClassPropBase : MyClassPropBase
{

    private readonly string _className;

    public MyPseudoClassPropBase(string className)
    {
        _className = className;
    }

    /// <summary>
    /// 伪类样式。
    /// </summary>
    public abstract MyPseudoClass PseudoClass { get; }

    public override string GetClassName()
    {
        var prefix = PseudoClass.GetDisplayName();

        if (string.IsNullOrWhiteSpace(prefix) && !_className.Contains(prefix))
        {
            throw new ArgumentException($"TailwindCSS class=[{_className}] 前缀不匹配！");
        }

        return $"{_className}";
    }
}
