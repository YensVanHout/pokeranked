import React from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";

const Home = (props: any) => {

  return (
    <div>
      <header>
        <img src="../header.jpg" alt="" width="100%" />
      </header>
      <main>
        <div className={styles.flex}>
          <div className={styles.linkButton}>
            <Link to="/pokedex/1" className="">
              Go to PokeDex
            </Link>
          </div>
          <div className={styles.linkButton}>
            <Link to="/favourites" className="">
              Go to favourites
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
