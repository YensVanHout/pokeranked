import styles from "./navigation.module.css"
import { NavLink } from 'react-router-dom'
import { ThemeContext } from '../app/App'
import { useContext } from 'react'
import ThemeCreatorButton from '../themecreatorbutton/themecreatorbutton'
import { themeCreatorState } from "../../Types"

const Navigation = ({setThemeCreator, themeCreator} : themeCreatorState) => {
  const {theme} = useContext(ThemeContext);

  return(
    <div className={`${styles.navigation} ${theme === 'dark' ? styles.navigationDark : ''}`}>
        <ul>
          <li><NavLink style={({ isActive }) => {return {textDecoration: isActive ? "underline" : ""}}} to="/">Home</NavLink></li>
          <li><NavLink style={({ isActive }) => {return {textDecoration: isActive ? "underline" : ""}}} to="/pokedex/1">PokeDex</NavLink></li>
          <li><NavLink style={({ isActive }) => {return {textDecoration: isActive ? "underline" : ""}}} to="/favourites">Favourites</NavLink></li>
          <li><NavLink style={({ isActive }) => {return {textDecoration: isActive ? "underline" : ""}}} to="/contact">Contact</NavLink></li>

          <ThemeCreatorButton setThemeCreator={setThemeCreator} themeCreator={themeCreator}/>
        </ul>
    </div>
    )
}

export default Navigation;