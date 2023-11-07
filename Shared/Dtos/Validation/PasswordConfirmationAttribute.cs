using System.ComponentModel.DataAnnotations;

namespace CQ.GS.Shared.Dtos.Validation
{
    public class PasswordConfirmationAttribute : ValidationAttribute
    {
        private readonly string _comparisonProperty;

        public PasswordConfirmationAttribute(string comparisonProperty)
        {
            _comparisonProperty = comparisonProperty;
            ErrorMessage = "密码和确认密码不匹配!";
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var currentValue = value as string;
            var valType = validationContext.ObjectType.GetProperty(_comparisonProperty);
            if (valType == null)
            {
                return new ValidationResult("指定属性为 NULL");
            }
            var comparisonValue = valType.GetValue(validationContext.ObjectInstance) as string;

            if (currentValue != comparisonValue)
            {
                return new ValidationResult(ErrorMessage);
            }

            return ValidationResult.Success;
        }
    }
}
