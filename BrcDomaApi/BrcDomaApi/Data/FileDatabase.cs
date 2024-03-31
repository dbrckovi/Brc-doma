namespace BrcDomaApi.Data
{
  /// <summary>
  /// CRUD functions for working with text files
  /// </summary>
  public class FileDatabase
  {
    private string _directoryPath { get; set; }

    /// <summary>
    /// Creates a file database for specified directory path
    /// </summary>
    /// <param name="directoryPath">Directory path where files will be stored. Relative to application's base directory</param>
    public FileDatabase(string directoryPath)
    {
      _directoryPath = Path.Combine(AppContext.BaseDirectory, directoryPath);
      if (!Directory.Exists(_directoryPath)) Directory.CreateDirectory(_directoryPath);
    }

    /// <summary>
    /// Gets a list of text files in the directory
    /// </summary>
    /// <returns></returns>
    public string[] GetFileNames()
    {
      string[] files = Directory.GetFiles(_directoryPath, "*.txt");
      if (files != null)
      {
        List<string> ret = new List<string>();
        foreach(string file in files)
        {
          ret.Add(Path.GetFileNameWithoutExtension(file));
        }
        return ret.ToArray();
      }
      return null;
    }

    /// <summary>
    /// Returns content of a specified file
    /// </summary>
    /// <param name="fileName"></param>
    /// <returns></returns>
    public string ReadContent(string fileName)
    {
      return File.ReadAllText(ConstructFilePath(fileName));
    }

    /// <summary>
    /// Writes a content to a file name
    /// </summary>
    /// <param name="filename"></param>
    /// <param name="content"></param>
    public void WriteContent(string filename, string content)
    {
      if (string.IsNullOrEmpty(content)) content = "";
      string filePath = ConstructFilePath(filename);
      if (File.Exists(filePath)) File.Delete(filePath);
      File.WriteAllText(filePath, content);
    }

    /// <summary>
    /// Deletes a file if it exists
    /// </summary>
    /// <param name="filename"></param>
    public void DeleteFile(string filename)
    {
      string filePath = ConstructFilePath(filename);
      if (File.Exists(filePath)) File.Delete(ConstructFilePath(filename));
    }

    /// <summary>
    /// Constructs complete file path, from it's file name
    /// </summary>
    /// <param name="fileName"></param>
    /// <returns></returns>
    private string ConstructFilePath(string fileName)
    {
      return $"{Path.Combine(_directoryPath, fileName)}.txt";
    }
  }
}
