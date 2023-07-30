import { useEffect, useRef, useState } from "react";
import { useMovies } from "./useMovies";
import StarRating from "./starRating";
import { useLocalStorage } from "./useLocalStorage";
import { useKey } from "./useKey";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
// creating navbar
function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
function NumSearchResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  useKey("enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current?.focus();
    setQuery("");
  });
  // useEffect(
  //   function () {
  //     function callback(e) {
  //       // if already focused
  //       if (document.activeElement === inputEl.current) return;
  //       if (e.code === "Enter") {
  //         inputEl.current.focus();
  //         setQuery("");
  //       }
  //     }
  //     document.addEventListener("keydown", callback);
  //   },
  //   [setQuery]
  // );
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      // now we are telling that ref that this is that element in which we want to have dom manupilation and now we will use effect hook and this ref will take valuw only after the component is loaded
      ref={inputEl}
    />
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}
// my key for omdb api
const KEY = "9b49783b";
// const tempQuery = "love";
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const { movies, isLoading, error } = useMovies(query);

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useLocalStorage([], "watched");
  // const [watched, setWatched] = useState(function () {
  //   const storeValue = localStorage.getItem("watched");
  //   return JSON.parse(storeValue);
  // });
  // creating handle function to selecting movie
  function handleSelectMovie(id) {
    // setSelectedId(id);
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((previouslyWatched) => [...previouslyWatched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // starting with data fetching
  // creating local storage
  // useEffect(
  //   function () {
  //     localStorage.setItem("watched", JSON.stringify(watched));
  //   },
  //   [watched]
  // );

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />

        <NumSearchResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MoviesList movies={movies} />} */}
          {/* now there are 3 possibilies of error */}
          {/* 1. loading is happening with no error so loader will run */}
          {isLoading && <Loader />}
          {/*2.now loading is done and fetching is also done without error */}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {/* 3.error occured is true */}
          {error && <ErrorMessage errorMessage={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function MoviesList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onSelectMovie={onSelectMovie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
function Movie({ movie, onSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function Box({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const countRef = useRef(0);
  // const [averageRating, setAverageRating] = useState(0);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  // as all the data key is in capital letter converting it into smaller letter
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAddMovie() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating,
      runtime: Number(runtime.split(" ").at(0)),
      ratingDecisionCount: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
    // setAverageRating(Number(imdbRating));
    // setAverageRating((averageRating) => (averageRating + userRating) / 2);
  }
  useEffect(() => {
    // we use if beacuse it should only add 1 if there is already a user rating
    if (userRating) countRef.current = countRef.current + 1;
  }, [userRating]);
  useKey("Escape", onCloseMovie);
  // useEffect(
  //   function () {
  //     function callback(e) {
  //       if (e.code === "Escape") {
  //         onCloseMovie();
  //       }
  //     }
  //     document.addEventListener("keydown", callback);
  //     return document.removeEventListener("keydown", callback);
  //   },
  //   [onCloseMovie]
  // );
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "usePopCorn";
      };
    },
    [title]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          const data = await res.json();
          setIsLoading(false);
          // console.log(data);
          setMovie(data);
        } catch (error) {}
      }
      getMovieDetails();
    },
    [selectedId]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          {/* <p>{averageRating}</p> */}
          <section>
            <div className="rating">
              {!isWatched ? (
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
              ) : (
                <p>You rated this movie with {watchedUserRating} ⭐</p>
              )}
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAddMovie}>
                  + Add To List
                </button>
              )}
            </div>
            <p>
              <em>{plot} </em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed By {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
function WatchedList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie?.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          {" "}
          ❌
        </button>
      </div>
    </li>
  );
}
function Loader() {
  return <p className="loader">Loading..</p>;
}
function ErrorMessage({ errorMessage }) {
  return (
    <p className="error">
      <span>⚠️</span> {errorMessage}
    </p>
  );
}
// as creating a async function directly inside a use effect will give us warning so we should use another function and then wrap the async function inside it
// adding a loader to our website by introducing a new state in our app
// we will set it to false and then when fetching occurs we will set it to true
// setting error handling
// now making the query var as tempQuery so we can take query from the input field
// now we are implementing the select movie functionality which is when we clcik on any movie so it needs a piece of space as selecting happens in the left box while it's reult is displayed on theright box means the state should leave in the parent
// so every movie is coming with its imbd id so we will use it to makae another api request
// we are adding a componet to display the selected id
// now we will close the movie  if click on the already selected movie
// implementing the fetch function movieDetails
//changing the tittle of the page with the movie we are currently in
// changing the tittle is a sideeffect
// as we are clicking on any movie we are getting the movie with its tittle on tittle bar but when we are closing or coming back then it is not changing so now we will learn about cleanup function in use effect
// as when we search in search bar many request happens at the same time so we will use cleanup by using
// abort controller given by the browser
// now we want to display the average of the rating user give and the og rating so we need new piece of state
// we will add that functionality when the user cliked on the add button
// so it was just for learning about state now we will make local storage use
// using hooks with callback
// so we will update the local storage each time the watchedMovie state is updated
// we can do this by just adding it in handle watched movir or using use effect hook
// we are trying both the ways
// so now we have created a sideEffect for storing the data in local storage andd now we can think that we should use another side effect when we are updating the watched hook with local storage but we do have an alternative we will make a callbak function inside useState of watched movie
// now crating a ref for countRafing how many times user have clicked on the rating user Rating
