using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactWithBackend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ReactWithBackend.Web.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;

        public PeopleController(IConfiguration configuration )
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAll()
        {
            //Thread.Sleep(3000);
            var repo = new PeopleRepository(_connectionString);
            return repo.GetAll();
        }

        [Route("addperson")]
        [HttpPost]
        public void Add(Person person)
        {
            //Thread.Sleep(1000);
            var repo = new PeopleRepository(_connectionString);
            repo.Add(person);
        }

    }
}
