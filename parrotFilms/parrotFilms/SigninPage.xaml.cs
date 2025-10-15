namespace parrotFilms;

public partial class SigninPage : ContentPage
{
	public SigninPage()
	{
		InitializeComponent();
	}

	private async void OnSigninClicked(object sender, EventArgs e) 
	{
		ApiConnection _apiConnect = new ApiConnection();
		string user = userEntry.Text;
		string pwd = pwdEntry.Text;
		string[] arrayUser = { user, pwd };
		bool isCreated = await _apiConnect.CreateUserAsync(arrayUser);
		Navigation.PopAsync(true);
	}
	private async void OnCancelClicked(object sender, EventArgs e) 
	{
		Navigation.PopAsync(true);
	}
}