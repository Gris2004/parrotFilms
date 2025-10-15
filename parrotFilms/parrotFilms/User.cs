using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace parrotFilms
{
    internal class User
    {
        [JsonProperty("id_user")]
        public int id { get; set; }
        [JsonProperty("name_user")]
        public string name { get; set; }
        [JsonProperty("pwd_user")]
        public string password { get; set; }
    }
}
