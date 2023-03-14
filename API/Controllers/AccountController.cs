using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Controllers
{
    public class AccountController:BaseApiController
    {
        private readonly DataContext context_;
        private readonly ITokenService tokenservice_;
        public AccountController(DataContext context,ITokenService tokenservice)
        {
            context_=context;
            tokenservice_=tokenservice;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await CheckUser(registerDto.Username)==true)
            return BadRequest("Username already taken");
            else
            Console.Write("Good Username");
            using var hashmethod=new HMACSHA512();
            var user=new UserClass
            {
                UserName=registerDto.Username,
                PasswordHash=hashmethod.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt=hashmethod.Key
            };

            context_.Users.Add(user);
            await context_.SaveChangesAsync();
            
            return new UserDto
            {
                Username=user.UserName,
                token=tokenservice_.CreateToken(user)
            };
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user=await context_.Users.SingleOrDefaultAsync(User=>User.UserName==loginDto.Username);
            if(user==null)
            return Unauthorized("User Invalid");
            var hash_method=new HMACSHA512(user.PasswordSalt);
            var hash_computed=hash_method.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for(int i=0;i<hash_computed.Length;i++)
            {
                if(hash_computed[i]!=user.PasswordHash[i])
                return Unauthorized("Invalid Password");
            }
            return new UserDto
            {
                Username=user.UserName,
                token=tokenservice_.CreateToken(user)
            };
        }
        private async Task<bool> CheckUser(string userpresent)
        {
            return await context_.Users.AnyAsync(user=>user.UserName==userpresent.ToLower());
        }
    }
}