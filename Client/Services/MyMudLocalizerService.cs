using Microsoft.Extensions.Localization;
using MudBlazor;

namespace CQ.GS.Client.Services
{
    public class MyMudLocalizerService : MudLocalizer
    {
        private Dictionary<string, string> _localization;

        public MyMudLocalizerService()
        {
            _localization = new()
            {
                { "MudDataGrid.Unsort", "取消排序"}
            };
        }

        public override LocalizedString this[string key]
        {
            get
            {
                var currentCulture = Thread.CurrentThread.CurrentUICulture.Parent.TwoLetterISOLanguageName;
                if (currentCulture.Equals("zh", StringComparison.InvariantCultureIgnoreCase)
                    && _localization.TryGetValue(key, out var res))
                {
                    return new(key, res);
                }
                else
                {
                    return new(key, key, true);
                }
            }
        }
    }
}
