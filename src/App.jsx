import Search from "./components/Search"
import { useState } from "react";

const API_BASE_URL = 'https://api.moviedb.org/3';
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

    } catch (error){
      console.error(`Error fetching movies: ${error}`)
      setErrorMessage(`Error fetching movies`)

    }
  }

  return (
    <main>
      <div className="pattern"  />
     <div className="wrapper">
      <header>
        <img src="./hero.png" alt="Hero Banner"  />
        <h1>Find <span className="text-gradient">movies </span>your enjoy without the hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
      </header>
     
     </div>
    </main>
  )
}

export default App
