import Search from "./components/Search"
import { useEffect, useState } from "react";

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

  const fetchMovies = async () =>{
    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      console.log(endpoint,"endpoint")
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json()
      console.log(data,"data")
      console.log(data);

    } catch (error){
      console.error(`Error fetching movies: ${error}`)
      setErrorMessage(`Error fetching movies`)

    }
  }

  useEffect(() =>{
    fetchMovies();
  },[]);
 
  return (
    <main>
      <div className="pattern"  />
     <div className="wrapper">
      <header>
        <img src="./hero.png" alt="Hero Banner"  />
        <h1>Find <span className="text-gradient">movies </span>your enjoy without the hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
      </header>
      <section>
        <h2>all movies</h2>
        {errorMessage && <p className="error-message text-red-500">{errorMessage}</p>}
      </section>
     
     </div>
    </main>
  )
}

export default App
