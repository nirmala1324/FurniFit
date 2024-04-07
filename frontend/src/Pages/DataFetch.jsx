import React from "react";
import { useEffect, useState } from "react";
import { Deploy } from "../Component/Deploy/Deploy";

const DataFetch = () => {
  const [movie, setMovie] = useState({}); // Depends on the data passed(in array or object), gituch

  useEffect(() => {
    fetch("/api")
      .then((response) => {
        // I believe it's for fetching the movie data from flask
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => setMovie(data))
      .then((error) => console.log(error));
  }, []);

  return <div><Deploy prop={movie}/></div>;
};

export default DataFetch;
