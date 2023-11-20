using CQ.GS.Server.Data;
using CQ.GS.Server.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

#region /// ·þÎñ×¢Èë

builder.Services.AddTransient<IUserInfoService, UserInfoService>();

#endregion



builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMethods", builder =>
    {
        builder.AllowAnyMethod();
    });
});


#region /// MySQL ÅäÖÃ

var connectionString = "server=1.15.245.36;port=3307;user=root;password=!@#QWE;database=my-db";
var serverVersion = new MySqlServerVersion(new Version(8, 2));

builder.Services.AddDbContext<MyDbContext>(dbContextOptions => dbContextOptions
    .UseMySql(connectionString, serverVersion)
    .LogTo(Console.WriteLine, LogLevel.Information)
    .EnableSensitiveDataLogging()
    .EnableDetailedErrors());

#endregion


#region /// AutoMapper

builder.Services.AddAutoMapper(typeof(Program));

#endregion


var app = builder.Build();

app.UseCors("AllowMethods");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error");
}

app.UseBlazorFrameworkFiles();
app.UseStaticFiles();

app.UseRouting();


app.MapRazorPages();
app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
