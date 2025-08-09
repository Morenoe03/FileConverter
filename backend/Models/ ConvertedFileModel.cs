using System;

namespace backend.Models
{
    public class ConvertedFileModel
    {
        public int? Id { get; set; }
        public string? OriginalFileName { get; set; }
        public string? ConvertedFileName { get; set; }
        public string? Format { get; set; }
        public DateTime? ConvertedAt { get; set; } 
        public string? FilePath { get; set; }
    }
}