using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MessagesController : BaseApiController
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        public MessagesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUsername();

            if (username == createMessageDto.RecipientUsername.ToLower()) return BadRequest("Cant send messages to yourself");

            var sender = await this.unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var recipient = await this.unitOfWork.UserRepository.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

            if (recipient == null) return NotFound();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessageDto.Content,
            };

            this.unitOfWork.MessageRepository.AddMessage(message);

            if (await this.unitOfWork.Complete()) return Ok(this.mapper.Map<MessageDto>(message));

            return BadRequest("Fialed to send message");
        }

        [HttpGet]
        public async Task<ActionResult<PageList<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username = User.GetUsername();

            var messages = await this.unitOfWork.MessageRepository.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(new PaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages));

            return messages;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var username = User.GetUsername();

            var message = await this.unitOfWork.MessageRepository.GetMessage(id);

            if (username != message.RecipientUsername && username != message.SenderUsername) return Unauthorized();

            if (message.SenderUsername == username) message.SenderDelete = true;
            if (message.RecipientUsername == username) message.RecipientDelete = true;

            if (message.SenderDelete && message.RecipientDelete)
            {
                this.unitOfWork.MessageRepository.DeleteMessage(message);
            }

            if (await this.unitOfWork.Complete()) return Ok();

            return BadRequest("Problem deleting the message");
        }
    }
}