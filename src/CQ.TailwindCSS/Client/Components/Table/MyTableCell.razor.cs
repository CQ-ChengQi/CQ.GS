using Microsoft.AspNetCore.Components;

namespace CQ;

public partial class MyTableCell : MyComponentBase
{



    /// <summary>
    /// 此属性指定 <td> 元素应跨越多少列。
    /// </summary>
    [Parameter]
    public int ColSpan { get; set; }


    /// <summary>
    /// 此属性指定 <td> 元素应跨越多少行。
    /// </summary>
    [Parameter]
    public int RowSpan { get; set; }
}