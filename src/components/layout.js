import React, { useState, createContext, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Footer from "./footer/footer"
import "./layout.css"
import Nav from "../components/nav/nav";
import Contact from "../components/contact/contact";
import Cursor from "./ui/cursor"
import gsap from "gsap";

export const ThemeDataContext = createContext(null);
export const ActiveMenu = createContext(null);

const Layout = ({ children, classes }) => {
  let themeWrap = useRef(null);

  useEffect(() => {
    gsap.to(themeWrap, {
      duration: 0,
      opacity: 1,
      delay: 0.1
    })
  }, []);

  const ThemeData = useStaticQuery(graphql`
    query SiteTitleQuery {
      wordpressAcfOptions {
        options {
          copyright
          designation
          email
          name
          logo {
            url {
              source_url
              localFile {
                publicURL
              }
            }
          }
          professions {
            profession
          }
          technologies {
            technology
          }
        }
      }
      allWordpressWpApiMenusMenusItems(filter: {name: {eq: "Contact Menu"}}) {
          edges {
              node {  
                name
                items {
                  classes
                  target
                  title
                  object_slug
                }
              }
          }
      }
    }
  `)

  const [themeData] = useState(ThemeData)
  const [activeMenu, setActiveMenu] = useState("");
  const isMenu = (menu) => activeMenu === menu ? true : false;
  
  const [mainMenuActive, setMainMenuActive] = useState(false);
  const [contactMenuActive, setContactMenuActive] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const [initialClick, setInitialClick] = useState(false);

  //Determine if menu button should be disabled
  const disableMenu = () =>  {
      setDisabled(!disabled);

      setTimeout(() => {
        setDisabled(false);
      }, 2000)
  }

  const toggleMenu = (menu)  => { 
    //only when this is set, will useEffect close menus
    setInitialClick(true);
    
    //prevent user from clicking menu when menu is animating in
    disableMenu();

    /* Keep track of which menu is active */
    if(menu === "main") {
      setMainMenuActive(true);
    }

    if(menu === "contact") {
      setContactMenuActive(true);
    }

    if(menu === "") {
      setMainMenuActive(false);
      setContactMenuActive(false);
    }

    //toggle the menu 
    isMenu(menu) ? setActiveMenu("") : setActiveMenu(menu);
  };

  const toggleMainMenu = () => toggleMenu("main");
  const toggleContactMenu = () => toggleMenu("contact");
  
  return (
    <div className={`theme-wrap`} ref={el => themeWrap = el}>
      <ThemeDataContext.Provider value={themeData}>
          <Cursor />
        <ActiveMenu.Provider value={{toggleMainMenu, toggleContactMenu, isMenu, activeMenu, mainMenuActive, setMainMenuActive, contactMenuActive, setContactMenuActive, disabled, initialClick}}>
          <Nav/>
          <Contact/>
        </ActiveMenu.Provider>
        <div className={`${classes ? classes : ''}`}>
          <main>{children}</main>
          <Footer/>
        </div>
      </ThemeDataContext.Provider>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
