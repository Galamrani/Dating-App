namespace API.Errors
{
    public class ApiExcepetion
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }

        public ApiExcepetion(int statusCode, string message, string details)
        {
            this.StatusCode = statusCode;
            this.Message = message;
            this.Details = details;
        }

    
    }
}