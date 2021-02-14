import React, {useContext} from 'react';
import {ThemeDataContext} from '../layout';
import SkewScrollContainer from '../ui/SkewScroll';
import FooterMenu from './footer-menu';

const Footer = () => {
  const themeData = useContext(ThemeDataContext);
  const menu = themeData.allWordpressWpApiMenusMenusItems.edges[0].node.items;
  const copyright = themeData.wordpressAcfOptions.options.copyright;

  return (
    <SkewScrollContainer>
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
    </SkewScrollContainer>
  );
}

export default Footer;