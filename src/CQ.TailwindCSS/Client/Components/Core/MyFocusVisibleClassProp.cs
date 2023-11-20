namespace CQ;

public class MyFocusVisibleClassProp : MyPseudoClassPropBase
{
    public MyFocusVisibleClassProp(string className)
    : base(className)
    {

    }
 
    public override MyPseudoClass PseudoClass => MyPseudoClass.FocusVisible;
}