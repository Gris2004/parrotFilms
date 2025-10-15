using System.Diagnostics;
using System.Threading.Tasks;

namespace parrotFilms
{
    public partial class MainPage : ContentPage
    {

        public MainPage()
        {
            InitializeComponent();
        }

        private async void OnLoginClicked(object sender, EventArgs e)
        {
            ApiConnection _apiConnect = new ApiConnection();
            List<User> users = await _apiConnect.getUsersAsync();
            var userText = userEntry.Text ?? "";
            var pwdText = pwdEntry.Text ?? "";
            bool exists = users.Any(u => u.name == userText && u.password == pwdText);

            foreach (User user in users) { Debug.WriteLine(users); }
            if (exists) { await Navigation.PushAsync(new moviesPage()); }
            else await DisplayAlert("Error", "usuario o contraseña incorrectos", "OK");
        }
        private async void OnSigninClicked(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new SigninPage());
            SemanticScreenReader.Announce(loginBtn.Text);
        }
    }
}
