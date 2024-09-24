import React from 'react';
import {  FaTelegram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { styles } from "../styles";



const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <section className="footer__section">

        <div className="footer__contact-info">
        <h3 className={styles.sectionText}>Follow Me</h3>
          <p className='py-4 font-medium text-slate-300 text-4xl'>
            <a href="tel:123-456-7890">+855 667 33434</a>
          </p>
          <p className='font-medium text-slate-300 text-4xl'>
            <a href="mailto:al9725755@gmail.com">al9725755@gmail.com</a>
          </p>
        </div>
        <div className="footer__social-media text-xl px-4">
          <ul>
            <li><a href="https://t.me/yuujin168"><FaTelegram /> Telegram</a></li>
            <li><a href="https://www.linkedin.com/in/nikola-limpet-64a68227a/"><FaLinkedin /> Linked In</a></li>
            <li><a href="https://github.com/Nikola-Limpet"><FaGithub /> GitHub</a></li>
          </ul>
        </div>
      </section>
      <p className="footer__copyright">&copy; {currentYear} Nikola Limpet. All rights reserved.</p>
    </footer>
  );
};

export default Footer;