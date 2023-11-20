namespace CQ;

public class MyCommonClassProp : MyClassPropBase
{
    private readonly string _className;
    public MyCommonClassProp(string className)
    {
        _className = className;
    }

    public override string GetClassName()
    {
        return _className;
    }
}
