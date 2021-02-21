import React, {useContext, useState, useEffect} from 'react';
import {ThemeDataContext} from '../layout';
import SkewScrollContainer from '../ui/SkewScroll';
import FooterMenu from './footer-menu';

const Footer = () => {
  const themeData = useContext(ThemeDataContext);
  const menu = themeData.allWordpressWpApiMenusMenusItems.edges[0].node.items;
  const copyright = themeData.wordpressAcfOptions.options.copyright;
  
  const [isSingleWork, setIsSingleWork] = useState(false);

  useEffect(() => {
    if(typeof window !== "undefined" ) {
      if(window.location.pathname === "/work") {
        setIsSingleWork(true);
      }
    }
  }, []);


  return (
    <SkewScrollContainer>
      <footer className={isSingleWork ? 'work-landing-footer' : ''}>
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