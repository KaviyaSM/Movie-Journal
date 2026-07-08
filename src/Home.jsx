import { useState,useEffect } from "react";
import MovieCard from "./MovieCard";
import "./Home.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Navigate, useNavigate } from "react-router-dom";

function Home(){

   
   const apiKey=import.meta.env.VITE_TMDB_API_KEY;
   const [page ,setPage]=useState(1);
   const [totalPages, setTotalPages] = useState(0);
   const url=`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${page}`;
   const [movies,setMovie]=useState([]);
   const[search,Setsearch]=useState("");
   const[notFound,setNotfound]=useState(false);
   const[load,setLoad]=useState(true);
   const[error,seterror]=useState(false);
   const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
    });
    const [searched, setSearched] = useState(false);
   

    const navigate=useNavigate();
   
   
   
   useEffect(()=>{
    fetch(url).then(response=>{
        if (!response.ok) {
            throw new Error("Failed to fetch movies");
      }  
        return response.json()})
    .then(data=>{
        setMovie(data.results);
        setTotalPages(data.total_pages);
        setLoad(false);})
        .catch(error=>{
        console.log(error);
        seterror(true);
        setLoad(false);
    });
    
   },[page])

//    useEffect(() => {
//     const savedFavorites = localStorage.getItem("favorites");
     
//     console.log("Loaded:", savedFavorites);
//     if (savedFavorites) {
//         setFavorites(JSON.parse(savedFavorites));
//     }
//     }, []);

    useEffect(() => {
       
        localStorage.setItem("favorites", JSON.stringify(favorites));
     }, [favorites]);

   function handlesearch(){
       setSearched(true);
       setLoad(true);
       seterror(false);
       setNotfound(false);
       const searchUrl=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`;

       fetch(searchUrl)
       .then(response=>response.json())
       .then(data=>{
       
        setMovie(data.results);
      

        if(data.results.length==0){
            setNotfound(true);
        }
        else{
            setNotfound(false);
        }

         setLoad(false);
       }

       
    
    ).catch(error=>{
        console.log(error);
        seterror(true);
        setLoad(false);
    })
    
   }

   function goHome() {
    setSearched(false);
    Setsearch("");
    setPage(1);
    setNotfound(false);
    setLoad(true);

    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=1`)
        .then(response => response.json())
        .then(data => {
            setMovie(data.results);
            setTotalPages(data.total_pages);
            setLoad(false);
        })
        .catch(error => {
            console.log(error);
            seterror(true);
            setLoad(false);
        });
}

//    function addFavorite(movie){
//      const exists = favorites.some(fav => fav.id === movie.id);

//     if (!exists) {
//         setFavorites(prev => [...prev, movie]);
//     }
//    }
    function toggleFavorite(movie) {

    if (isFavorite(movie.id)) {

        setFavorites(
            favorites.filter((m) => m.id !== movie.id)
        );

    } else {

        setFavorites([...favorites, movie]);

    }

}

  


function isFavorite(id) {
    return favorites.some((movie) => movie.id === id);
}

  
   

   const MovieList=movies.map((movie)=><MovieCard key={movie.id} movie={movie} toggleFavorite={toggleFavorite} isFavorite={isFavorite(movie.id)} movieName={movie.title} overview={movie.overview} rating={movie.vote_average} release={movie.release_date} poster={movie.poster_path} id={movie.id} page="home"> </MovieCard>)

    if(load){
       return (<div className="text-center mt-5"><h2>Loading Movies ....</h2></div>);
    }

    if(error){
    return(
        <div className="text-center mt-5">
            <h2>Failed to load movies</h2>
        </div>
    )
}



    return(

        <>
        
<div className="top-bar">
        <InputGroup className="mb-3" >
      <Form.Control
        type="search"
        placeholder="search"
        aria-label="Recipient's username"
    
    className="search-input"
      value={search}
    onChange={(event)=>{Setsearch(event.target.value)}}
    onKeyDown={(event)=>{
        if(event.key==='Enter'){
            handlesearch();
        }
    }}
    
      />
      

      <Button variant="outline-secondary" id="button-addon2" onClick={handlesearch}>
        Search
      </Button>
    </InputGroup>

    {notFound&&<h2>No Movies Found</h2>}

    {searched && (
    <Button
        variant="secondary"
        onClick={goHome}
    >
        🏠 Home
    </Button>
)}

    <Button
    variant="dark"
    onClick={() => navigate("/My-movie-journal")}
    style={{}}
>
    ❤️ My Movie Journal
</Button> </div>
    
    
    
    
   
      <div className="Home" >
            <div className="movie-container">{MovieList}</div>
            
            </div>

        <div className="pagination">

    {page>1 && <button
        disabled={page === totalPages}
        onClick={() => setPage(page - 1)}
    >
        Previous
    </button>
}

    <span style={{ margin: "0 20px" }}>
         {page} / {totalPages}
    </span>

    <button
        onClick={() => setPage(page + 1)}
    >
        Next
    </button>
  

</div>

        
        </>
    );
}

export default Home