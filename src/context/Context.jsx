import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export let shata = createContext(0);
export default function Context({ children }) {
  const [dataMovie, setdataMovie] = useState(null);
  const [dataTv, setdataTV] = useState(null);
  const [datainput, setdatainput] = useState("");
  let show = datainput ? "search" : "discover";
  function getDataInput(e) {
    console.log("Coder");

    setdatainput(e.target.value);
  }

  async function getDataMovie() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${show}/movie?api_key=8ae7ede60f494ac004b69d732032d55f`,
      {
        params: {
          query: datainput,
        },
      }
    );

    setdataMovie(data.results);
  }
  async function getDataTv() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${show}/tv?api_key=8ae7ede60f494ac004b69d732032d55f`,
      {
        params: {
          query: datainput,
        },
      }
    );

    console.log(data.results);

    setdataTV(data.results);
  }
  useEffect(() => {
    getDataMovie();
    getDataTv();
  }, [datainput]);

  return (
    <shata.Provider
      value={{ getDataInput, datainput, setdatainput, dataMovie, dataTv }}
    >
      {children}
    </shata.Provider>
  );
}
