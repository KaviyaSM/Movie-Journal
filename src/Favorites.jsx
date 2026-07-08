import { useState , useEffect } from "react";
import MovieCard from "./MovieCard";
import Home from "./Home";
import "./Home.css";
import "./MovieCard.css";

function Favorites(){

    const [favorites,setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });
    const [notes, setNotes] = useState({});
    const [savedMessage, setSavedMessage] = useState({});

//     function toggleFavorite(movie) {

//     if (isFavorite(movie.id)) {

//         setFavorites(
//             favorites.filter((m) => m.id !== movie.id)
//         );

//     } else {

//         setFavorites([...favorites, movie]);

//     }

// }

useEffect(() => {
    const temp = {};

    favorites.forEach(movie => {
        temp[movie.id] = movie.note || "";
    });

    setNotes(temp);
}, []);


function saveNote(id) {

    const updatedFavorites = favorites.map(movie =>
        movie.id === id
            ? {
                ...movie,
                note: notes[id]
            }
            : movie
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
    );

    setSavedMessage(prev => ({
        ...prev,
        [id]: true
    }));

    setTimeout(() => {
        setSavedMessage(prev => ({
            ...prev,
            [id]: false
        }));
    }, 2000);
}

function removeFavorite(id){

    const updatedFavorites =
        favorites.filter(movie => movie.id !== id);

    setFavorites(updatedFavorites);

    localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
    );

    const updatedNotes = { ...notes };
    delete updatedNotes[id];
    setNotes(updatedNotes);
}

// function saveNote(id) {

//     const updatedFavorites = favorites.map(movie =>

//         movie.id === id
//             ? {
//                 ...movie,
//                 note: notes[id]
//             }
//             : movie

//     );

//     setFavorites(updatedFavorites);

//     localStorage.setItem(
//         "favorites",
//         JSON.stringify(updatedFavorites)
//     );

//     alert("Note saved!");
// }


  const favoritelist=favorites.map(movie => (
                    
//                      <MovieCard
//     key={movie.id}
//     movie={movie}
//     movieName={movie.title}
//     poster={movie.poster_path}
//     rating={movie.vote_average}
//     release={movie.release_date}
//     id={movie.id}
//     isFavorite={true}
//     toggleFavorite={() => removeFavorite(movie.id)

//     }
//     page="favorites"
    
// />
   <div key={movie.id} className="movie-card">

    <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="movie-poster"
    />

    <h3>{movie.title}</h3>

    <p>⭐ {movie.vote_average}</p>

    <textarea
        rows={5}
        placeholder="Write your thoughts about this movie..."
        value={notes[movie.id] || ""}
        onChange={(e) => 
            setNotes({
            ...notes,
            [movie.id]: e.target.value
        })
        }
        onKeyDown={(e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            saveNote(movie.id);

        }

    }}
    />

    <br />

    <button
    onClick={() => saveNote(movie.id)}
>
    💾 Save Note
</button>
 {savedMessage[movie.id] && (
    <p
        style={{
            color: "green",
            marginTop: "8px",
            fontWeight: "bold"
        }}
    >
        ✓ Saved
    </p>
)}

    <button
        onClick={() => removeFavorite(movie.id)}
    >
        Remove
    </button>

</div>

                ))
    return(
        <>
        <h1>My Movie Journal</h1>
        <div>
         <div className="Home" >
            <div className="movie-container">{favoritelist}</div>
            
            </div>  

         {/* {
                favorites.map(movie => (

                    <div key={movie.id}>
                        <h3>{movie.title}</h3>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            width="200"
                        />
                        <button onClick={() => removeFavorite(movie.id)}>Remove</button>
                    </div>

                ))
            } */}
            
            </div>
                
            
        </>
    );
}

export default Favorites