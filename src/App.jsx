import Search from "./components/Search"
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;






const API_OPTIONS = {
  method:'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}



const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList,setMovieList] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  const fetchMovies = async (query="") =>{
    setIsLoading(true)
    setErrorMessage('')
    try{
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`: `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      console.log(endpoint,"endpoint")
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json()
      console.log(data,"data")

      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results|| [])


    } catch (error){
      console.error(`Error fetching movies: ${error}`)
      setErrorMessage(`Error fetching movies`)

    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() =>{
    fetchMovies(searchTerm);
  },[searchTerm]);

  return (
    <main>
      <div className="pattern"  />
     <div className="wrapper">
      <header>
        <img src="./hero.png" alt="Hero Banner"  />
        <h1>Find <span className="text-gradient">movies </span>your enjoy without the hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
      </header>
      <section className="all-movies">
        <h2 className="mt-[40px]">all movies</h2>
       {isLoading ? (
        <Spinner  />):
        errorMessage ?(
        <p>{errorMessage}</p>):(
          <ul>
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
        )}
      </section>
     
     </div>
    </main>
  )
}

export default App
