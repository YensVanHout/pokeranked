import React from 'react'
import styles from './contact.module.css'

function Contact() {
    let currentTheme = localStorage.getItem('theme')

    return (
        <div className={`${currentTheme === 'dark' ? styles.darkMode : ''}`}>
            <h1>Contact:</h1>
            <form className={styles.form} action='mailto:vanhoutyens@gmail.com'>
                <label htmlFor="firstName">First Name</label>
                <input className={styles.input} type="text" id="fname" name="firstname" placeholder="Your name.."/>

                <label htmlFor="lname">Last Name</label>
                <input className={styles.input} type="text" id="lname" name="lastname" placeholder="Your last name.."/>
                
                <label htmlFor="email">E-Mail</label>
                <input className={styles.input} type="email" id="email" name="email" placeholder="Your E-Mail.."/>

                <label htmlFor="subject">Subject</label>
                <textarea className={styles.textarea} id="subject" name="subject" placeholder="Message..."/>

                <input className={styles.submit} type="submit" value="Submit"/>
            </form>
            
      </div>
    )
}

export default Contact;
