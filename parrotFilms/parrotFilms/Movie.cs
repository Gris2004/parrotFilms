using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace parrotFilms
{
    public class Movie
    {
        [JsonProperty("id_movie")]
        public int id { get; set; }

        [JsonProperty("title_movie")]
        public string title { get; set; }

        [JsonProperty("category_movie")]
        public string category { get; set; }

        [JsonProperty("duration_movie")]
        public string duration { get; set; }

        [JsonProperty("image_movie")]
        public string image { get; set; }

        [JsonProperty("video_movie")]
        public string video { get; set; }
    }
}
