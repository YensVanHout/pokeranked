import {useContext} from 'react'
import {ThemeContext} from '../app/App'
import styles from './themecreator.module.css'
import {themeCreatorState} from '../../Types'

function Themecreator({setThemeCreator, themeCreator} : themeCreatorState) {
    const {theme, setTheme} = useContext(ThemeContext)
    
    let newdexstyle : string
    let newspritestyle : string
    let newtheme: string

    const applyTheme = () => {
        if(newdexstyle){
            localStorage.setItem('dexstyle', newdexstyle)
        }
        if(newspritestyle){
            localStorage.setItem('spritestyle', newspritestyle)
        }
        if(newtheme){
            localStorage.setItem('theme', newtheme)
        }
        window.location.reload()
    }

     return (
        <div
            className={`${styles.drawer} ${theme === 'dark'
            ? styles.darkMode
            : ''} ${themeCreator === 'hidden'
            ? styles.hidden
            : ''}`}>
            <div className={styles.theme}>
                <h3>Which theme would you like to use?:</h3>
                <div className={styles.flex}>
                    <div className={styles.option}>
                        <div className={styles.mode}>
                            <div className={styles.darkPrimary}></div>
                            <div className={styles.darkSecondary}></div>
                        </div>
                        <button className={styles.bttn} onClick={() => newtheme = 'dark'}>Dark</button>
                    </div>
                    <div className={styles.option}>
                        <div className={styles.mode}>
                            <div className={styles.lightPrimary}></div>
                            <div className={styles.lightSecondary}></div>
                        </div>
                        <button className={styles.bttn} onClick={() => newtheme = 'light'}>Light</button>
                    </div>
                </div>
            </div>
            <div className={styles.spritetype}>
                <h3>Which sprites would you like to use?:</h3>
                <div className={styles.flex}>
                    <div className={styles.option}>
                        <div className={styles.pikachu}>
                            <span className={`pokesprite pokemon pikachu`}></span>
                        </div>
                        <button className={styles.bttn} onClick={() => newspritestyle = 'sprite'}>Pixel</button>
                    </div>
                    <div className={styles.option}>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png`} height="128" alt="Pokeball theme image"/>
                        <button className={styles.bttn} onClick={() => newspritestyle = 'drawing'}>Drawing</button>
                    </div>
                </div>
            </div>
            <div className={styles.pokedextheme}>
                <h3>Which pokedex theme would you like to use?:</h3>
                <div className={styles.flex}>
                    <div className={styles.option}>
                        <div className={styles.dexstyle}>
                            <div className={styles.top}></div>
                            <div className={styles.bottom}></div>
                        </div>
                        <button className={styles.bttn} onClick={() => newdexstyle = 'corner'}>Corner</button>
                    </div>
                    <div className={styles.option}>
                        <div className={`${styles.dexstyle}`}>
                            <div className={styles.rounded}>
                            </div>
                        </div>
                        <button className={styles.bttn} onClick={() => newdexstyle = 'round'}>Round</button>
                    </div>
                </div>
            </div>
            <div className={styles.flex}>
                <button className={styles.bttn} onClick={() => applyTheme()}>Apply theme</button>
            </div>
            <div className={styles.flex}>
                <button className={styles.bttn} onClick={() => setThemeCreator('hidden')}>Cancel</button>
            </div>
        </div>
    )
}

export default Themecreator
