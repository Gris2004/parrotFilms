using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Diagnostics;

namespace parrotFilms
{
    class ApiConnection
    {
        private readonly HttpClient _client;
        private const string baseUrl = "http://192.168.1.88:3000/api/tables";

        public ApiConnection()
        {
            _client = new HttpClient();
        }

        public async Task<bool> CreateUserAsync(string[] values)
        {
            try
            {
                //se crea el objeto json
                var body = new { values = values };
                var json = JsonConvert.SerializeObject(body);

                //Se convierte el StringContent para enviarlo como si fuera un Body
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                //Enviamos POST a la ruta
                var response = await _client.PostAsync($"{baseUrl}/users", content);
                return response.IsSuccessStatusCode;
            }
            catch (Exception ex) 
            { 
                Debug.Write(ex.Message);
                return false;
            }
        }

        public async Task<List<Movie>> getMoviesAsync()
        {
            try
            {
                var response = await _client.GetAsync($"{baseUrl}/movies");

                if (!response.IsSuccessStatusCode)
                {
                    Debug.WriteLine($"❌ Error HTTP: {response.StatusCode}");
                    return new List<Movie>();
                }

                var json = await response.Content.ReadAsStringAsync();
                Debug.WriteLine($"✅ JSON recibido: {json.Substring(0, Math.Min(json.Length, 200))}...");

                var movies = JsonConvert.DeserializeObject<List<Movie>>(json);
                return movies ?? new List<Movie>();
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"❌ Excepción en getMoviesAsync: {ex.Message}");
                return new List<Movie>();
            }
        }
        public async Task<List<User>> getUsersAsync()
        {
            try
            {
                var response = await _client.GetAsync($"{baseUrl}/users");
                if (!response.IsSuccessStatusCode)
                {
                    Debug.WriteLine($"error al consultar usuarios: {response.StatusCode}");
                    return new List<User>();
                }
                var json = await response.Content.ReadAsStringAsync();
                Debug.WriteLine($"Json recibido: {json}");

                var users = JsonConvert.DeserializeObject<List<User>>(json);
                return users ?? new List<User>();
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error al consultar usuarios {ex.Message}");
                return new List<User>();
            }
        }
    }
}   