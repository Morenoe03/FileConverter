using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Formats.Gif;
using System.IO;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileConverterController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public FileConverterController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpPost("convert")]
        public async Task<IActionResult> ConvertFile(IFormFile file, string format)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

                //Uploads Folder
                var uploadsPath = Path.Combine(_env.WebRootPath ?? _env.ContentRootPath, "uploads");
                Directory.CreateDirectory(uploadsPath);

                //Save Original File
                var originalFilePath = Path.Combine(uploadsPath, file.FileName);
                using (var stream = new FileStream(originalFilePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                //Create the new file
                var convertedFileName = $"converted_{DateTime.UtcNow.Ticks}.{format}";
                var convertedFilePath = Path.Combine(uploadsPath, convertedFileName);

                //load the conentent and convert
                using (var image = Image.Load(originalFilePath))
                {
                    switch (format.ToLower())
                    {
                        case "jpeg":
                            image.Save(convertedFilePath, new JpegEncoder());
                            break;
                        case "png":
                            image.Save(convertedFilePath, new PngEncoder());
                            break;
                        case "webp":
                            image.Save(convertedFilePath, new WebpEncoder());
                            break;
                        case "gif":
                            image.Save(convertedFilePath, new GifEncoder());
                            break;
                        default: 
                            return BadRequest("Unsupported format.");
                    }
                }

                //save a reacord
                var record = new ConvertedFileModel
                {
                    OriginalFileName = file.FileName,
                    ConvertedFileName = convertedFileName,
                    Format = format,
                    ConvertedAt = DateTime.UtcNow,
                    FilePath = convertedFilePath
                };

                _context.ConvertedFiles.Add(record);
                await _context.SaveChangesAsync();

                //read the converted file
                var fileBytes = await System.IO.File.ReadAllBytesAsync(convertedFilePath);

                //reaturn the file as a downloadable
                return File(fileBytes, "application/octet-stream", convertedFileName);
        }
    }
}
