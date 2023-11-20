namespace CQ;

public class MyClassBuild
{
    private readonly IList<MyClassPropBase> _myClassPropBases;

    public MyClassBuild()
    {
        _myClassPropBases = new List<MyClassPropBase>();
    }

    public void AppendClass(MyClassPropBase prop)
    {
        _myClassPropBases.Add(prop);
    }

    public string Build(){
        return string.Join(" ",_myClassPropBases.Select(s=>s.GetClassName()));
    }

    public void Clear()
    {
        _myClassPropBases.Clear();
    }
}