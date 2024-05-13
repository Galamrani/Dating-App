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
        private readonly IUserRepository userRepository;
        private readonly IMessageRepository messageRepository;
        private readonly IMapper mapper;
        public MessagesController(IUserRepository userRepository, IMessageRepository messageRepository, IMapper mapper)
        {
            this.mapper = mapper;
            this.messageRepository = messageRepository;
            this.userRepository = userRepository;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUsername();

            if (username == createMessageDto.RecipientUsername.ToLower()) return BadRequest("Cant send messages to yourself");

            var sender = await this.userRepository.GetUserByUsernameAsync(username);
            var recipient = await this.userRepository.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

            if (recipient == null) return NotFound();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessageDto.Content,
            };

            this.messageRepository.AddMessage(message);

            if (await this.messageRepository.SaveAllAsync()) return Ok(this.mapper.Map<MessageDto>(message));

            return BadRequest("Fialed to send message");
        }

        [HttpGet]
        public async Task<ActionResult<PageList<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username = User.GetUsername();

            var messages = await this.messageRepository.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(new PaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages));

            return messages;
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetMessageThread(string username)
        {
            var currentUserName = User.GetUsername();

            return Ok(await this.messageRepository.GetMessageThread(currentUserName, username));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var username = User.GetUsername();

            var message = await this.messageRepository.GetMessage(id);

            if (username != message.RecipientUsername && username != message.SenderUsername) return Unauthorized();

            if (message.SenderUsername == username) message.SenderDelete = true;
            if (message.RecipientUsername == username) message.RecipientDelete = true;

            if (message.SenderDelete && message.RecipientDelete)
            {
                this.messageRepository.DeleteMessage(message);
            }

            if (await this.messageRepository.SaveAllAsync()) return Ok();

            return BadRequest("Problem deleting the message");
        }
    }
}