using BrcDomaApi.Data;
using BrcDomaApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BrcDomaApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TextBlockController : ControllerBase
  {
    private string _directoryPath = "App_Data\\TextBlocks";
    private FileDatabase _fileDatabase;

    public TextBlockController()
    {
      _fileDatabase = new FileDatabase(_directoryPath);
    }

    /// <summary>
    /// Gets a list of text blocks
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public IEnumerable<string> Get()
    {
      return _fileDatabase.GetFileNames();
    }

    /// <summary>
    /// Gets content of a specific text block
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    public TextBlock Get(string id)
    {
      try
      {
        string content = _fileDatabase.ReadContent(id);
        return new TextBlock() { Id = id, Text = content };
      }
      catch { return null; }
    }

    /// <summary>
    /// Creates or saves a specified text block
    /// </summary>
    /// <param name="value"></param>
    [HttpPost]
    public void Post([FromBody] TextBlock value)
    {
      _fileDatabase.WriteContent(value.Id, value.Text);
    }

    /// <summary>
    /// Deletes a specified text block
    /// </summary>
    /// <param name="id"></param>
    [HttpDelete("{id}")]
    public void Delete(string id)
    {
      _fileDatabase.DeleteFile(id);
    }
  }
}
