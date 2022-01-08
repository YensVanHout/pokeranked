import React, { useContext } from 'react'
import { ThemeContext } from '../app/App'
import styles from './themecreatorbutton.module.css'
import { themeCreatorState } from "../../Types"

const ThemeCreatorButton = ({setThemeCreator, themeCreator} : themeCreatorState) => {
  const {theme, setTheme} = useContext(ThemeContext)

  return (
    <div className={`${styles.bttncontainer} ${theme === 'dark' ? styles.darkMode : ''}`}>
        <button onClick={() => themeCreator === 'show' ? setThemeCreator('hidden') : setThemeCreator('show')}>Theme Creator</button>
    </div>
  )
}
export default ThemeCreatorButton;