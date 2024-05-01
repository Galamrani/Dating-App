using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    // Extension method to add application services
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // Adding DbContext with SQLite
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(); // Adding CORS services
            services.AddScoped<ITokenService, TokenService>();  // Adding scoped token service

            // allows other parts of the application to depend on IUserRepository abstraction and receive instances of UserRepository when needed.
            services.AddScoped<IUserRepository, UserRepository>();

            // Configuring AutoMapper to scan and register mappings from all assemblies in the current domain
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            return services;    // Returning modified service collection
        }
    }
}