namespace lublog.Models
{
    public class Blog
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;

        public Guid UserId { get; set; }
        public User User { get; set; } = null!;



    }
}
