import { useContext } from 'react'
import { ThemeContext } from '../../components/app/App'
import styles from './favourites.module.css'
import Entry from '../../components/entry/entry'

const Favourites = () => {
    
    const {theme} = useContext(ThemeContext)
    const spritestyle = localStorage.getItem('spritestyle')
    const dexstyle = localStorage.getItem('dexstyle')
    const favourites = localStorage.getItem('favourites')?.split(';')

    return (
        <div>
            <div className={`${styles.flex} ${theme === 'dark' ? 'containerDark' : ''}`}>
            <h1>Favourites</h1>
            {favourites === undefined ? <h1>Try adding some new favourites on the detail page</h1> : null}
            {favourites?.map(pokemon =>{
                return(
                        <Entry dexstyle={dexstyle} spritestyle={spritestyle} pokemon={pokemon} />
                    )
                })}
            </div>
        </div>
    )
}

export default Favourites 