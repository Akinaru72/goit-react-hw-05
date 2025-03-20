import axios from "axios";

const ACCESS_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzQxYmFhNTJlYjkxNGY1Y2QwMDI2OGU0NTdiZDY1MiIsIm5iZiI6MTc0MjI0NDMzNi4zMTYsInN1YiI6IjY3ZDg4OWYwZDNmODg4N2ZjZjg0MDJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2hIo-7eaS8bk6-5fVbhM-czugAM9a1drQokylCq3HwY";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers = {
  Authorization: `Bearer ${ACCESS_KEY}`,
  accept: "application/json",
};

const API_PATH = {
  trend: "/trending/movie/day?",
  movie: "/movie/",
  search: "/search/movie",
};

export const fetchMovies = async () => {
  const resp = await axios.get(API_PATH.trend, {});
  return resp.data.results;
};

export const fetchMovieById = async (id) => {
  const response = await axios.get(API_PATH.movie + id + "?");
  return response.data;
};

export const fetchMovieCredits = async (id) => {
  const response = await axios.get(API_PATH.movie + id + "/credits?");
  return response.data;
};

export const fetchMovieReviews = async (id) => {
  const response = await axios.get(API_PATH.movie + id + "/reviews?");
  return response.data;
};

export const fetchMovieSearch = async (query, page = 1) => {
  const response = await axios.get(API_PATH.search, {
    params: {
      query,
      page,
    },
  });

  return response.data;
};
