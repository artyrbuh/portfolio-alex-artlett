import React from 'react';
import FooterMenu from './footer-menu';

const Footer = () => {
    return (
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
          <FooterMenu/>
        </footer>
    )
}

export default Footer;