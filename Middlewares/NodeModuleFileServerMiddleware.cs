using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ReactDemo.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ReactDemo.Middlewares
{
    public class NodeModuleFileServerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHostingEnvironment _hostingEnvironment;
        
        private ILogger<NodeModuleFileServerMiddleware> _logger;
        private IOptions<NodeModulesOptions> _options;

        public NodeModuleFileServerMiddleware(RequestDelegate next, IHostingEnvironment hostingEnvironment, ILogger<NodeModuleFileServerMiddleware> logger, IOptions<NodeModulesOptions> options)
        {
            _next = next;
            _hostingEnvironment = hostingEnvironment;
            _logger = logger;
            _options = options;
        }

        public async Task Invoke(HttpContext context)
        {
            string requestedFileName = Path.GetFileName(context.Request.Path);
            
            if (_options.Value.Resolve.ContainsKey(requestedFileName))
            {
                this._logger.LogDebug($"Serving node_module {requestedFileName}");
                try {
                    await context.Response.WriteAsync(
                        File.ReadAllText(
                            this._hostingEnvironment.ContentRootPath + _options.Value.Resolve[requestedFileName]
                        )
                    );
                }
                catch (Exception e)
                {
                    this._logger.LogError($"Failed to serve node_module {requestedFileName}. Reason: {e.Message}");
                }
                return;
            }
            

            await this._next(context);
        }
    }
}
