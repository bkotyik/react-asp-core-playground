using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactDemo.Configuration
{
    public class NodeModulesOptions
    {
        public NodeModulesOptions()
        {
            Resolve = new Dictionary<string, string>();
        }
        public Dictionary<string, string> Resolve { get; set; }
    }
}
