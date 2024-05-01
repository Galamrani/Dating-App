namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateOnly dob)
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var age = today.Year - dob.Year;

            // Adjusting the age if the birthday hasn't occurred yet this year
            if (dob.DayOfYear > today.DayOfYear)
            {
                age--;
            }

            return age;
        }
    }
}