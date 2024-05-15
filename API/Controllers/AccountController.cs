using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService tokenService;
        private readonly IMapper mapper;
        private readonly UserManager<AppUser> userManager;

        public AccountController(ITokenService tokenService, IMapper mapper, UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
            this.mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            var user = this.mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();

            var result = await this.userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResults = await this.userManager.AddToRoleAsync(user, "Member");

            if (!roleResults.Succeeded) return BadRequest(roleResults.Errors);

            return new UserDto
            {
                UserName = user.UserName,
                Token = await this.tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender,
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await this.userManager.Users
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (user == null) return Unauthorized("invalid username");

            var result = await this.userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result) return Unauthorized("Invalid password");

            return new UserDto
            {
                UserName = user.UserName,
                Token = await this.tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender,
            };
        }

        private async Task<bool> UserExists(string userName)
        {
            return await this.userManager.Users.AnyAsync(x => x.UserName == userName.ToLower());
        }

    }
}