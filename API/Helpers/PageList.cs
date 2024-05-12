using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
    public class PageList<T> : List<T>
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }

        public PageList(IEnumerable<T> items, int count, int pagesNumber, int pageSize)
        {
            this.CurrentPage = pagesNumber;
            this.TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            this.PageSize = pageSize;
            this.TotalCount = count;
            AddRange(items);
        }

        public static async Task<PageList<T>> CreateAsync(IQueryable<T> source, int pagesNumber, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pagesNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PageList<T>(items, count, pagesNumber, pageSize);
        }
    }
}