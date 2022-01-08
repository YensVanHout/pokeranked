import { useParams } from "react-router-dom";
import { BuildPokemonProps, IPullRequest } from "../../Types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../components/app/App";
import NatDex from "../../components/nat_dex";
import Loader from "../../components/loader/loader"

//stylesheets
import "../../assets/pokesprite-pokemon-gen8.css";
import "../../assets/pokesprite-inventory.css";
import styles from "./details.module.css";

const Details = ({ setPokemon, pokemon }: BuildPokemonProps) => {
  const { theme } = useContext(ThemeContext);
  const spritestyle = localStorage.getItem("spritestyle");
  let { tier, name } = useParams<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const favourites = localStorage.getItem("favourites")?.split(";");

  let alreadyFavourited = "false";

  favourites?.find((fav) => {
    if (fav === pokemon?.pokemon) {
      alreadyFavourited = "true";
    } else {
      alreadyFavourited = "false";
    }
  });

  const getBuild = async () => {
    setLoading(true);
    setPokemon(undefined);
    let response = await axios.get<IPullRequest>(
      "https://smogon-usage-stats.herokuapp.com/" + tier + "/" + name
    );
    setPokemon(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getBuild();
  }, []);

  let dex: number = 0;

  const setDex = (searchName: string) => {
    NatDex.find((pokemon) => {
      let parsedname = pokemon.pokemon
        .toLowerCase()
        .replace("♂", "-m")
        .replace("♀", "-f")
        .replace(".", "-")
        .replace("’", "")
        .replace(" ", "-")
        .replace(":", "-")
        .replace("--", "-")
        .replace("é", "e")
        .replace("é", "e");

      if (searchName === parsedname) {
        dex = pokemon.dex;
      } else {
        return null;
      }
    });
  };

  if (name) {
    setDex(name);
  }

  return (
    <div>
      {loading === true ? (
        <Loader />
      ) : (
        <div className={`${styles.details}`}>
          <div
            className={`${styles.info} ${
              theme === "dark" ? styles.darkMode : ""
            }`}
          >
            <h2>Tier: {tier}</h2>
          </div>

          <div
            className={`${styles.info} ${
              theme === "dark" ? styles.darkMode : ""
            }`}
          >
            <h2>Pokemon: {pokemon?.pokemon || name}</h2>
          </div>

          <div
            className={`${styles.info} ${
              theme === "dark" ? styles.darkMode : ""
            }`}
          >
            <h3>Rank: {pokemon?.rank}</h3>
          </div>

          <div
            className={`${styles.info} ${
              theme === "dark" ? styles.darkMode : ""
            }`}
          >
            <h3>Usage: {pokemon?.usage}</h3>
          </div>
          {alreadyFavourited === "true" ? (
            //true
            <div
              className={`${styles.info} ${styles.fav} ${
                theme === "dark" ? styles.darkMode : ""
              }`}
              onClick={() => {
                if (favourites) {
                  for (var i = 0; i < favourites?.length; i++) {
                    if (favourites[i] == pokemon?.pokemon) {
                      favourites.splice(i, 1);
                    }
                  }

                  if (favourites.length > 0) {
                    localStorage.setItem("favourites", favourites.join(";"));
                  } else {
                    localStorage.removeItem("favourites");
                  }
                }
                alert(
                  pokemon?.pokemon + " has been removed from your favourites"
                );
                window.location.reload();
              }}
            >
              Remove from favourites
            </div>
          ) : (
            //false
            <div
              className={`${styles.info} ${styles.fav} ${
                theme === "dark" ? styles.darkMode : ""
              }`}
              onClick={() => {
                if (
                  pokemon?.pokemon &&
                  favourites &&
                  !favourites.find((fav) => pokemon?.pokemon === fav)
                ) {
                  localStorage.setItem(
                    "favourites",
                    localStorage.getItem("favourites") + ";" + pokemon?.pokemon
                  );
                  alert(
                    pokemon?.pokemon + " has been added to your favourites"
                  );
                  window.location.reload();
                } else if (
                  pokemon?.pokemon &&
                  !favourites?.find((fav) => pokemon?.pokemon === fav)
                ) {
                  localStorage.setItem("favourites", pokemon?.pokemon);
                  alert(
                    pokemon?.pokemon + " has been added to your favourites"
                  );
                  window.location.reload();
                } else {
                  alert(pokemon?.pokemon + " is already favourited");
                }
              }}
            >
              Add to favourites
            </div>
          )}
          <div className={styles.pokemon}>
            {spritestyle === "sprite" ? (
              <div className={styles.pokepic}>
                <span
                  className={`pokesprite pokemon ${
                    theme === "dark" ? "shiny" : ""
                  } ${name}`}
                ></span>
              </div>
            ) : (
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex}.png`}
                height="64px"
                alt=""
              />
            )}
          </div>

          <div className={styles.flex}>
            <div
              className={`${styles.box} ${
                theme === "dark" ? styles.darkMode : ""
              }`}
            >
              <h4>Abilities: </h4>
              {pokemon &&
                Object.keys(pokemon?.abilities!).map((ability) => (
                  <p key={ability}>
                    <b>{ability}</b> {pokemon?.abilities[ability as any]}
                  </p>
                ))}
            </div>

            <div
              className={`${styles.box} ${
                theme === "dark" ? styles.darkMode : ""
              }`}
            >
              <h4>Moves: </h4>
              {pokemon &&
                Object.keys(pokemon?.moves!)
                  .slice(0, 10)
                  .map((move) => (
                    <p key={move}>
                      <b>{move}</b> {pokemon?.moves[move as any]}
                    </p>
                  ))}
            </div>

            <div
              className={`${styles.box} ${
                theme === "dark" ? styles.darkMode : ""
              }`}
            >
              <h4>Items: </h4>
              {pokemon &&
                Object.keys(pokemon?.items!)
                  .slice(0, 8)
                  .map((item) => (
                    <div className={styles.itemFlex}>
                      <span
                        className={`pokesprite ${
                          item.includes("Berry") ? "berry" : "hold-item"
                        } ${
                          item !== "Other"
                            ? item
                                .toLowerCase()
                                .replace(" ", "-")
                                .replace("-berry", "")
                                .replace("'", "")
                            : styles.hidden
                        }`}
                      ></span>
                      <p key={item}>
                        <b>{item}</b> {pokemon?.items[item as any]}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
