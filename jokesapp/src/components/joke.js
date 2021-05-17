import { useEffect, useState } from "react";
import "./joke.css";

const Joke = () => {
  const [marvel, setMarvel] = useState();

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("marvel") === null) setMarvel("Loading...");
      else {
        console.log(localStorage.getItem("marvel"));
        setMarvel(localStorage.getItem("marvel"));
      }
    }

    fetch(
      "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=6e4bb7752b5ce5f9dc18439e08ad03b0&hash=94db9c9fbe60d225ae6c05e8fe0cb19d"
    )
      .then((res) => res.json())
      .then((res) => {
        setMarvel(res.data.results);
        localStorage.setItem("marvel", "No internet connection! Please check your connection, can´t load data.");
        console.log("Response", res.data.results);
      });
  }, []);

  return (
    <div>
      <h1>Marvel Characters</h1>
      <div>
        {Array.isArray(marvel)? (
          marvel.map((elem) => (
            <div>
              <h3>{elem.name}</h3>
              <img
                alt="marvel character"
                src={elem.thumbnail.path + "." + elem.thumbnail.extension}
                height="auto"
                width="50%"
              />
              {elem.description !== "" ? (
                <p className="des">{elem.description}</p>
              ) : (
                <p className="des">No available description</p>
              )}
              <p>Available comics: {elem.comics.available}</p>
            </div>
          ))
        ):marvel!==null?<p>{marvel}</p>:<>Loading...</>}
      </div>
    </div>
  );
};
export default Joke;
