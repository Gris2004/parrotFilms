using CommunityToolkit.Maui.Views;
using CommunityToolkit.Maui;
namespace parrotFilms;

public partial class DetailsPage : ContentPage
{
	public DetailsPage(Movie movie)
	{
		InitializeComponent();

		//configuración de los elementos
		titleLabel.Text = movie.title;
		categoryLabel.Text = movie.category;
		durationLabel.Text = movie.duration;

		//Asigna el video
		videoPlayer.Source = movie.video;

        var html = $@"
            <html>
                <body style='margin:0; padding:0;'>
                    <video width='100%' height='200' controls>
                        <source src='{movie.video}' type='video/mp4'>
                        Tu navegador no soporta video.
                    </video>
                </body>
            </html>";
        //videoPlayer.Source = new HtmlWebViewSource { Html = html };
    }
}