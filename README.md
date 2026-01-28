# goit-react-hw-05

## General Requirements

- Create a repository named **goit-react-hw-05**
- When submitting the homework, provide two links:
  - a link to the source code repository
  - a link to the deployed project page (Vercel)
- The project must be created using [**Vite**](https://vite.dev/)
- There should be no errors or warnings in the console when running the application
- Each component in the `src/components` folder must have its own separate folder containing:
  - a JSX file of the React component
  - a styles file  
    The folder name, component file name (with `.jsx` extension), and styles file name (before `.module.css`) must match and follow the task requirements
- Each page in the `src/pages` folder must have its own separate folder containing:
  - a JSX file of the page
  - a styles file  
    Names must also match the task requirements
- Components must be exported using **export default**
- JS code should be clean and readable, use **Prettier**
- Styling must be done using **CSS modules**

---

# Movie Search 🎬

Create an application with routing for searching movies by title.  
![Image](https://github.com/user-attachments/assets/edf55070-b718-4552-8e8d-ef36186c0525)

---

## Movie Search Service

In this task, you will fetch movies from the **TMDB** service using HTTP requests.

### Preparation

1. Register on the [TMDB](https://www.themoviedb.org/) website  
   (you can enter any data)
2. Get access to the documentation and an [**API token**](https://developer.themoviedb.org/docs/getting-started)

### Useful Documentation Sections

- [**Trending movies**](https://developer.themoviedb.org/reference/trending-movies) – list of the most popular movies for the home page
- [**Search movie**](https://developer.themoviedb.org/reference/search-movie) – search movies by keyword
- [**Movie details**](https://developer.themoviedb.org/reference/movie-details) – full movie information
- [**Movie credits**](https://developer.themoviedb.org/reference/movie-credits) – cast information
- [**Movie reviews**](https://developer.themoviedb.org/reference/movie-reviews) – movie reviews

---

## Access Token

The access token must be included in every request as an HTTP **Authorization** header.

### Example:

```js
const url =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

const options = {
  headers: {
    // Replace api_read_access_token with your token
    Authorization: "Bearer api_read_access_token",
  },
};

axios
  .get(url, options)
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
```

## Getting an Access Token

The access token must be obtained in the  
**"API Read Access Token"** section on the API settings page of the [TMDB service](https://www.themoviedb.org/settings/api).

![image](./src/assets/react-5.png)

---

## Image Paths

The backend does not send a full image URL,  
but only the **file path**, for example, for a movie poster:

```js
/1E5baAaEse26fej7uHcjOgEE2t2.jpg
```

## Building a Full Image URL

To construct a full image URL, you need to review  
the corresponding section of the [TMDB documentation](https://developer.themoviedb.org/docs/image-basics).

In short, you must **manually add the base path**  
before the image file name.

As a result, you will get a complete image URL.

### Example:

```js
https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
```

## Application Navigation

The application must implement the following routes:

- `/` — **HomePage** component  
  Home page with a list of popular movies.

- `/movies` — **MoviesPage** component  
  Page for searching movies by keyword.

- `/movies/:movieId` — **MovieDetailsPage** component  
  Page with detailed information about a movie.

- `/movies/:movieId/cast` — **MovieCast** component  
  Cast information.  
  Rendered at the bottom of the **MovieDetailsPage**.

- `/movies/:movieId/reviews` — **MovieReviews** component  
  Reviews information.  
  Rendered at the bottom of the **MovieDetailsPage**.

If a user navigates to a non-existing route,  
you must display the **NotFoundPage** component,  
which contains a `Link` to the home page.

---

## Files, Folders, and Components

- Page component files:
  - `HomePage`
  - `MoviesPage`
  - `MovieDetailsPage`
  - `NotFoundPage`  
    must be stored in the following folder:

---

**Live page: [GitHub Pages](https://goit-react-hw-05-kappa-woad-23.vercel.app/)**
