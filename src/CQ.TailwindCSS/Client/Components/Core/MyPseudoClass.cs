using System.ComponentModel.DataAnnotations;

namespace CQ;

public enum MyPseudoClass
{
    None,

    /// <summary>
    /// 鼠标移入元素时应用样式。
    /// </summary>
    [Display(Name = "hover:")]
    Hover,

    /// <summary>
    /// 元素获得焦点时应用样式。
    /// </summary>
    /// 
    [Display(Name = "focus-visible:")]
    FocusVisible,

    /// <summary>
    /// 元素被禁用时应用样式。
    /// </summary>
    [Display(Name = "disabled:")]
    Disabled,

    UserAttribute,
}
