namespace parrotFilms;

public partial class moviesPage : ContentPage
{
	public moviesPage()
	{
		InitializeComponent();
		ApiConnection _apiConnection = new ApiConnection();
		LoadMovies(_apiConnection);
	}
	private async void LoadMovies(ApiConnection apiConnect) 
	{
		var movies = await apiConnect.getMoviesAsync();
		MoviesCollection.ItemsSource = movies;
	}
	private async void OnDetailsClicked(object sender, EventArgs e) 
	{
		var button = sender as ImageButton;
		var movie = button?.BindingContext as Movie;
		if (movie != null) 
		{
			await Navigation.PushAsync(new DetailsPage(movie));
		}
	}
}