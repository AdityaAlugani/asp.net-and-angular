using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey key_;
        public TokenService(IConfiguration config)
            {
                key_=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            }
        
        public string CreateToken(UserClass user)
        {
            var claims=new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId,user.UserName)
            };
            var creds=new SigningCredentials(key_,SecurityAlgorithms.HmacSha512Signature);
            var tokendescriptor=new SecurityTokenDescriptor
            {
                Subject=new ClaimsIdentity(claims),
                SigningCredentials=creds,
                Expires=DateTime.Now.AddDays(7)
            };
            var tokenhandler=new JwtSecurityTokenHandler();
            var token=tokenhandler.CreateToken(tokendescriptor);
            return tokenhandler.WriteToken(token);
        }
    }
}