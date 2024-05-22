using SharedModels;
using Microsoft.AspNetCore.Mvc;
using BrcDomaApi.Data;
using System.Text.Json;

namespace BrcDomaApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ListController : ControllerBase
  {
    private string _directoryPath = "App_Data\\Lists";
    private FileDatabase _fileDatabase;

    public ListController()
    {
      _fileDatabase = new FileDatabase(_directoryPath);
    }

    /// <summary>
    /// Gets a list of lists
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public IEnumerable<string> Get()
    {
      return _fileDatabase.GetFileNames();
    }

    /// <summary>
    /// Gets content of a specific list
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    public IActionResult Get(string id)
    {
      if (string.IsNullOrEmpty(id)) return BadRequest("'id' is not specified");
      if (!_fileDatabase.FileExists(id)) return NotFound($"'{id}' does not exist");

      BrcList ret = new BrcList();
      ret.Id = id;
      string content = _fileDatabase.ReadContent(id);
      ret.Items = JsonSerializer.Deserialize<List<BrcListItem>>(content);

      return Ok(ret);
    }

    /// <summary>
    /// Creates or saves a specified List
    /// </summary>
    /// <param name="value"></param>
    [HttpPost]
    public IActionResult Post([FromBody] BrcList value)
    {
      try
      {
        if (string.IsNullOrEmpty(value.Id)) throw new Exception("'Id' may not be empty");
        _fileDatabase.WriteContent(value.Id, JsonSerializer.Serialize(value.Items));
        return Ok();
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    /// <summary>
    /// Deletes a specified list
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
