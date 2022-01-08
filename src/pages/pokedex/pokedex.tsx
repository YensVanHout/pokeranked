import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pokedex, pokedexentry } from "../../Types";
import { ThemeContext } from "../../components/app/App";
import axios from "axios";
import styles from "./pokedex.module.css";
import Entry from "../../components/entry/entry";
import Loader from "../../components/loader/loader";

const Pokedex = () => {
  const { page } = useParams();
  const { theme } = useContext(ThemeContext);
  const spritestyle = localStorage.getItem("spritestyle");
  const dexstyle = localStorage.getItem("dexstyle");

  const [loading, setLoading] = useState<boolean>(false);
  const [dex, setDex] = useState<pokedexentry[]>([]);

  let i: number;

  if (page) {
    i = +page * 45 - 45 + 0;
  }

  const getPage = async () => {
    setLoading(true);
    setDex([]);
    if (page) {
      let offset: number = +page * 45 - 45;
      let response = await axios.get<pokedex>(
        "https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=45"
      );
      setDex(response.data.results);
      console.log(response.data.results);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPage();
  }, []);

  return (
    <div>
      {loading === true ? (
        <Loader />
      ) : (
        <div
          className={`${styles.flex} ${
            theme === "dark" ? "containerDark" : ""
          }`}
        >
          {dex.map((pokemon) => {
            i++;
            return (
              <Entry
                dexstyle={dexstyle}
                spritestyle={spritestyle}
                pokemon={pokemon.name}
              />
            );
          })}
          <div className={styles.pagination}>
            {page && +page > 1 ? (
              <a href={`/pokedex/${+page - 1}`}>Previous</a>
            ) : null}
            {page ? <a href={`/pokedex/${+page + 1}`}>Next</a> : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokedex;
