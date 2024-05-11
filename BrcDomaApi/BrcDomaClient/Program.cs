using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http.Json;

namespace BrcDomaClient
{
  public class Program
  {
    public static async Task Main(string[] args)
    {
      var builder = WebAssemblyHostBuilder.CreateDefault(args);
      builder.RootComponents.Add<App>("#app");
      builder.RootComponents.Add<HeadOutlet>("head::after");

      Settings settings = await LoadSettings(builder);

      builder.Services.AddScoped(sp =>
        new HttpClient
        {
          BaseAddress = new Uri(settings.ApiBasePath)
        });

      builder.Services.AddScoped(sp => settings);

      await builder.Build().RunAsync();
    }

    private static async Task<Settings> LoadSettings(WebAssemblyHostBuilder builder)
    {
      var http = new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) };

      return await http.GetFromJsonAsync<Settings>("settings.json");
    }
  }
}
