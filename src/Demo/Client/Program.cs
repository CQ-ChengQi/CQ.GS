using CQ.GS.Client;
using CQ.GS.Client.Services;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using MudBlazor;
using MudBlazor.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddMudServices();

// 自定义服务 。
builder.Services.AddSingleton<AppSettings, AppSettings>();
builder.Services.AddTransient<MyHttpClient, MyHttpClient>();


builder.Services.AddTransient<UserService, UserService>();
builder.Services.AddTransient<MudLocalizer, MyMudLocalizerService>();

await builder.Build().RunAsync();
