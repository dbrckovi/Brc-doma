using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

namespace BrcDomaClient
{
  public class Program
  {
    public static async Task Main(string[] args)
    {
      var builder = WebAssemblyHostBuilder.CreateDefault(args);
      builder.RootComponents.Add<App>("#app");
      builder.RootComponents.Add<HeadOutlet>("head::after");

      builder.Services.AddScoped(sp =>
        new HttpClient
        {
          BaseAddress = new Uri(builder.Configuration["FrontendUrl"] ?? "http://www.brc-doma.duckdns.org:81")
        });

      await builder.Build().RunAsync();
    }
  }
}
