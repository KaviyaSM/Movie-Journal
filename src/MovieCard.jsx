import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './MovieCard.css';
import { useNavigate } from "react-router-dom";


function MovieCard({movie,movieName,toggleFavorite,isFavorite,overview,rating,release,poster,id,page}){

   const navigate=useNavigate(); 
   
    return(
        <>
        <div className='movie-container' onClick={()=>{navigate('/details/'+id)}}>
            <Card className='movie-card'>
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${poster}`} className='movie-poster' />
      <Card.Body className='movie-body'>
        <Card.Title className='movie-title'>{movieName}</Card.Title>
        {/* <Card.Text className='movie-overview'>
         {overview}
        </Card.Text> */}
        {/* <Card.Text className='movie-info'>
         Release Date: {release}
        </Card.Text> */}
        {/* <Card.Text className='movie-info'>
         Rating: {rating}
        </Card.Text> */}
        <Button variant="primary" className={isFavorite ? "favorite-added" : "favorite-btn"} onClick={(event)=>{
            event.stopPropagation();
             if (page === "favorites") {
        toggleFavorite(movie.id);
     } else {
        toggleFavorite(movie);
    }
            
            }}>
                {
       page === "favorites"
        ? "🗑 Remove"
        : isFavorite
        ? "❤️ Added"
        : "🤍 Add Favorite"
}
            </Button>
        
      </Card.Body>
    </Card>


       
        
        </div>
        </>
    );

}

export default MovieCard