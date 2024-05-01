using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        //Class that generates errors - for development

        private readonly DataContext context;
        public BuggyController(DataContext context)
        {
            this.context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> Get401Error()
        {
            return "text";
        }

        [HttpGet("not-found")]
        public ActionResult<string> GetNotFoundError()
        {
            return NotFound();
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var thing = this.context.Users.Find(-1).ToString();
            return "text";
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequestError()
        {
            return BadRequest("bad-request");
        }


    }
}