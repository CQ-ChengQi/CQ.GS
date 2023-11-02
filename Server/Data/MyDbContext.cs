using CQ.GS.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace CQ.GS.Server.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<UserInfo> Users { get; set; }
    }
}
