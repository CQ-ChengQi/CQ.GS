using CQ.GS.Server.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.



builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMethods", builder =>
    {
        builder.AllowAnyMethod();
    });
});


var connectionString = "server=1.15.245.36;port=3307;user=root;password=!@#QWE;database=my-db";
var serverVersion = new MySqlServerVersion(new Version(8, 2));

builder.Services.AddDbContext<MyDbContext>(dbContextOptions => dbContextOptions
    .UseMySql(connectionString, serverVersion)
    .LogTo(Console.WriteLine, LogLevel.Information)
    .EnableSensitiveDataLogging()
    .EnableDetailedErrors());

// 扩展
builder.Services.AddAutoMapper(typeof(Program));

// 自定义


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
