import { useState, useEffect } from "react";
const KEY = "9b49783b";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(
    function () {
      //   callback?.();
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading((t) => (t = true));
          setError((e) => (e = ""));
          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went Wrong With fetching Movies");
          const data = await res.json();
          // now what if the searched movie is not avialble
          if (data.Response === "False") throw new Error("movie not found");
          setMovies((movies) => (movies = data.Search));
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error(error.name);
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      // checking if query is there with min lenegth of three
      if (query.length <= 3) {
        setError("");
        setMovies([]);
        return;
      }
      fetchMovies();
      return function () {
        // controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
