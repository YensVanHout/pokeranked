import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './entry.module.css'
import {entryProps} from '../../Types'
import { ThemeContext } from '../../components/app/App'
import NatDex from '../nat_dex'


const Entry = ({dexstyle, spritestyle, pokemon} : entryProps) => {
    const {theme} = useContext(ThemeContext)

    let dex : number = 1

    const setDex = (searchName : string) => {
      NatDex.find((pokemon) => {
        let parsedname = pokemon.pokemon.toLowerCase()
        .replace('♂', '-m')
        .replace('♀', '-f')
        .replace('.','-')
        .replace('’','')
        .replace(' ', '-')
        .replace(':', '-')
        .replace('--', '-')
        .replace('é', 'e')
        .replace('é', 'e')

        if(searchName === parsedname){
          dex = pokemon.dex
        }else{
            return null
        }
      }
      )}

    let parsedName = pokemon.toLowerCase()
                    .replace('♂', '-m')
                    .replace('♀', '-f')
                    .replace('.','-')
                    .replace('’','')
                    .replace(' ', '-')
                    .replace(':', '-')
                    .replace('--', '-')
                    .replace('é', 'e')
                    .replace('é', 'e')
 
                    setDex(parsedName)

                    let parsedDex : string = ''

                    if(dex < 10){
                        parsedDex = '00' + dex
                    }else if (dex < 100){
                        parsedDex = '0' + dex
                    }else{
                        parsedDex = dex.toString()
                    }

    
    return (
        <div className={`${styles.slot} ${dexstyle === 'round' ? styles.rounded : ''}`} key={pokemon}>
            <Link className={styles.anchor} to={`/details/gen8ou/${parsedName}`}>
                {spritestyle === 'sprite' ? <div className={styles.sprite}><span className={`pokesprite pokemon ${parsedName} ${theme === 'dark' ? 'shiny' : ''}`}></span></div> : <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex}.png`} alt=""/>}
                <div className={styles.pokemon}>{pokemon}</div>
                <div className={styles.dex}>#{ parsedDex }</div>
            </Link>
        </div>
    )
}

export default Entry
