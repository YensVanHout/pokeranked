import React, {  useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { IPullRequest } from '../../Types'

//components
import Navigation from '../navigation/navigation'
import Footer from '../footer/footer'

//pages
import PokeDex from '../../pages/pokedex/pokedex'
import Details from '../../pages/details/details'
import Home from '../../pages/home/home'
import Favourites from '../../pages/favourites/favourites'
import Contact from '../../pages/contact/contact'
import Themecreator from '../themecreator/themecreator'

export const ThemeContext = React.createContext({theme: 'light', setTheme: (theme: string) => {}});

function App() {

  const [theme, setTheme] = useState<string>('light')
  const [pokemon, setPokemon] = useState<IPullRequest>()
  const [themeCreator, setThemeCreator] = useState<string>('hidden')

  const savedTheme = () => {
    let savedTheme : string | null = localStorage.getItem('theme')
  
    if (savedTheme){
      setTheme(savedTheme)
    }
  }

  useEffect(() => {savedTheme()}, [])

  return (
    <ThemeContext.Provider value={{theme: theme, setTheme: setTheme}}>
      <div className={`container ${theme === 'dark' ? 'containerDark' : ''}`}>
        <Router>
          <Navigation setThemeCreator={setThemeCreator} themeCreator={themeCreator}/>
          <Themecreator setThemeCreator={setThemeCreator} themeCreator={themeCreator}/>
          <Routes>
            <Route path="" element={<Home />}/>
            <Route path="pokedex/:page" element={<PokeDex/>}/>
            <Route path="details/:tier/:name" element={<Details setPokemon={setPokemon} pokemon={pokemon}/>}/>
            <Route path="favourites" element={<Favourites />} /> 
            <Route path="contact" element={<Contact />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </ThemeContext.Provider>
  );
}

export default App;
