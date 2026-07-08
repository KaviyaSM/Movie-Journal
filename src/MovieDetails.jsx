import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

function MovieDetails(){
    

    const [detail,Setdetail]=useState(null);
    const {id}=useParams();
    
    const apiKey=import.meta.env.VITE_TMDB_API_KEY;
    const url=`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
    useEffect(()=>{
        fetch(url).then(response=>  response.json()).then(data=>Setdetail(data))
},[])


    
    
       

    return(
        <>
        {/* {detail && <div>
            <div>
            <img src={`https://image.tmdb.org/t/p/w500${detail.backdrop_path}` } alt="" style={{width:'100%'}}/>
            </div>
            <div style={{display:'inline-flex'}}>
                
            <img src={`https://image.tmdb.org/t/p/w500${detail.poster_path}` } alt="" style={{width:'300px',padding:'20px'}} />
            
            <h1 >{detail.title}</h1>
            <p>{detail.overview}</p>
            <p>Rating: {detail.vote_average}</p>
            <p>Released Date: {detail.release_date}</p>
            </div>
            </div>}</> */}
            
            {/* {detail && (
  <div>
    <img
      src={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`}
      alt={detail.title}
      style={{
        width: "100%",
        height: "400px",
        objectFit: "cover"
      }}
    />

    <div style={{ display: "flex", padding: "30px" }}>
      <img
        src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
        alt={detail.title}
        style={{
          width: "300px",
          borderRadius: "10px"
        }}
      />

      <div style={{ marginLeft: "30px" }}>
        <h1>{detail.title}</h1>

        <h3>{detail.tagline}</h3>

        <p>⭐ Rating: {detail.vote_average}</p>

        <p>📅 Release Date: {detail.release_date}</p>

        <p>⏱ Runtime: {detail.runtime} min</p>

        <p>🌐 Language: {detail.original_language}</p>

        <p>🎬 Status: {detail.status}</p>
      </div>
    </div>

    <div style={{ padding: "30px" }}>
      <h2>Overview</h2>
      <p>{detail.overview}</p>
    </div>
  </div>
)} */}
   

   {detail && (
  <div>

    <img
      src={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`}
      alt={detail.title}
      className="backdrop"
    />

    <div className="details-container">

      <img
        src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
        alt={detail.title}
        className="poster"
      />

      <div className="details-info">

        <h1>{detail.title}</h1>

        <h3>{detail.tagline}</h3>

        <p>⭐ Rating: {detail.vote_average}</p>

        <p>📅 Release Date: {detail.release_date}</p>

        <p>⏱ Runtime: {detail.runtime} min</p>

        <p>🌐 Language: {detail.original_language}</p>

        <p>🎬 Status: {detail.status}</p>

      </div>

    </div>

    <div className="overview">

      <h2>Overview</h2>

      <p>{detail.overview}</p>

    </div>

  </div>
)}
            
            </>
    );
}

export default MovieDetails