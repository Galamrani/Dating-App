using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entites;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        // secret key used to create and validate tokens
        private readonly SymmetricSecurityKey key;

        // receives a configuration object to get the secret key
        public TokenService(IConfiguration config)
        {
            // Get the secret key from configuration and convert it to bytes
            // Then assign it to the 'key' field
            this.key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }
        public string CreateToken(AppUser user)
        {
            // Define the claims for the token
            var claims = new List<Claim>
            {
                // Add the username as a claim
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

            // Create the credentials needed to sign the token
            var creds = new SigningCredentials(this.key, SecurityAlgorithms.HmacSha512Signature);

            // Define the properties of the token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims), // Set the information about the user (claims) 
                Expires = DateTime.Now.AddDays(7), // Set the expiration time 
                SigningCredentials = creds // Set the credentials needed to sign the token
            };

            // Create a token handler
            var tokenHandler = new JwtSecurityTokenHandler();
            // Generate the token based on the token descriptor
            var token = tokenHandler.CreateToken(tokenDescriptor);
            // Convert the token to a string and return it
            return tokenHandler.WriteToken(token);
        }
    }
}