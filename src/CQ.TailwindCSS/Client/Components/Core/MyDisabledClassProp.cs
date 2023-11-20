namespace CQ;

public class MyDisabledClassProp : MyPseudoClassPropBase
{
    public MyDisabledClassProp(string className)
    : base(className)
    {

    }

    public override MyPseudoClass PseudoClass => MyPseudoClass.Disabled;
}
