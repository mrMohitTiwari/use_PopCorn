# UsePopcorn Movie App

UsePopcorn is a movie app built using React, leveraging various React features such as useState, state management, and useEffect hook for data fetching. This application allows users to discover and explore movies using the OMDB (Open Movie Database) API. Users can search for movies, view movie details, rate movies, and save them to a watchlist for future viewing.

## Features

- **Movie Search**: Users can search for movies using keywords or movie titles to find relevant movie results.

- **Movie Details**: Each movie in the search results displays essential information such as the title, release year, plot summary, and IMDb rating.

- **User Ratings**: Users can give their own ratings to the movies they have watched, allowing them to keep track of their personal preferences.

- **Watchlist**: UsePopcorn offers a watchlist feature where users can save movies they are interested in watching later.

## How to Use

1. **Search for Movies**: On the app's home screen, there will be a search bar where users can enter the name of a movie or relevant keywords. Press the "Search" button or hit "Enter" to see a list of movie results.

2. **Explore Movie Details**: From the search results, click on a movie poster or title to view more detailed information about the selected movie, including its plot summary, IMDb rating, and other relevant details.

3. **Rate Movies**: While viewing the movie details, users have the option to rate the movie based on their personal preference. The rating will be saved for the user to reference later.

4. **Save to Watchlist**: For movies users wish to watch in the future, they can add them to their watchlist by clicking the "Add to Watchlist" button available on the movie details page.

5. **Manage Watchlist**: Users can access their watchlist by navigating to the "Watchlist" section of the app. Here, they can view all the movies they have saved for future viewing.

6. **Remove from Watchlist**: If a user has already watched a movie from their watchlist or no longer wishes to keep it, they can remove it from the watchlist with the "Remove" button.

## Technologies Used

- **React**: The app is built using the React JavaScript library, providing a responsive and interactive user interface.

- **OMDB API**: UsePopcorn fetches movie data from the OMDB API, allowing users to access a vast collection of movie information.

- **Axios**: Axios is used to make API requests to the OMDB API and handle data retrieval.

- **LocalStorage**: User ratings and watchlist data are stored locally in the browser using LocalStorage for easy access and retrieval.

## Note

UsePopcorn is a personal project developed for educational purposes, and it does not store any user data or require any sign-up or authentication. The movie data is sourced from the public OMDB API, and the user's watchlist and ratings are stored locally on their device using the browser's LocalStorage.

Happy movie exploring with UsePopcorn! 🍿🎥
