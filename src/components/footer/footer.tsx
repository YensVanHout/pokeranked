import React, { useContext } from 'react'
import { ThemeContext } from '../app/App'
import styles from './footer.module.css'

function Footer() {
    const {theme} = useContext(ThemeContext);

    return (
        <div>
            <footer className={`${styles.footer} ${theme === 'dark' ? styles.footerDark : ''}`}>
                <p>Yens Van Hout &copy;PokeRanked 2021</p>
            </footer>
        </div>
    )
}

export default Footer
