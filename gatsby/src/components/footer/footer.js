import React from 'react';
import {ThemeDataContext} from '../layout';
import FooterMenu from './footer-menu';

const Footer = () => (
      <ThemeDataContext.Consumer>
        {themeData => {
          const menu = themeData.allWordpressWpApiMenusMenusItems.edges[0].node.items;
          const copyright = themeData.wordpressAcfOptions.options.copyright;

          return (
            <footer>
              <div className="container">
                <div className="columns">
                  <div className="column column--copyright">
                    <p>{copyright}</p>
                  </div>
                  <div className="column column--menu">
                    <FooterMenu menu={menu}/>
                  </div>
                </div>
              </div>
            </footer>
          )
        }}
      </ThemeDataContext.Consumer>
);

export default Footer;