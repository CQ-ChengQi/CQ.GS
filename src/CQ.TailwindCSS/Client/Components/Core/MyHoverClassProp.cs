namespace CQ;

public class MyHoverClassProp : MyPseudoClassPropBase
{
    public MyHoverClassProp(string className)
    : base(className)
    {

    }

    public override MyPseudoClass PseudoClass => MyPseudoClass.Hover;
}
