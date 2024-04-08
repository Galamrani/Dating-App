using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();  // Adding controller services
builder.Services.AddApplicationServices(builder.Configuration);  // Adding custom application services
builder.Services.AddIdentityServices(builder.Configuration); // Adding custom identity services

var app = builder.Build();  // Building the application

// Configure the HTTP request pipeline.

app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
