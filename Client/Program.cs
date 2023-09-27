using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using MudBlazor.Services;
using CQ.GS.Client;
using CQ.GS.Client.Services;
using MudBlazor;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddMudServices();

// 自定义服务 。
builder.Services.AddSingleton<AppSettings, AppSettings>();
builder.Services.AddTransient<UserService, UserService>();
builder.Services.AddTransient<MudLocalizer, MyMudLocalizerService>();

await builder.Build().RunAsync();
