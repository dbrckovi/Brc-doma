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
    public IActionResult Get(string id)
    {
      if (string.IsNullOrEmpty(id)) return BadRequest("'id' is not specified");
      if (!_fileDatabase.FileExists(id)) return NotFound($"'{id}' does not exist");

      string content = _fileDatabase.ReadContent(id);
      return Ok(new TextBlock() { Id = id, Text = content });
    }

    /// <summary>
    /// Creates or saves a specified text block
    /// </summary>
    /// <param name="value"></param>
    [HttpPost]
    public IActionResult Post([FromBody] TextBlock value)
    {
      try
      {
        if (string.IsNullOrEmpty(value.Id)) throw new Exception("'Id' may not be empty");
        _fileDatabase.WriteContent(value.Id, value.Text);
        return Ok();
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    /// <summary>
    /// Deletes a specified text block
    /// </summary>
    /// <param name="id"></param>
    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
      if (string.IsNullOrEmpty(id)) return BadRequest("'id' is not specified");
      if (!_fileDatabase.FileExists(id)) return NotFound($"'{id}' does not exist");
      _fileDatabase.DeleteFile(id);
      return Ok();
    }
  }
}
