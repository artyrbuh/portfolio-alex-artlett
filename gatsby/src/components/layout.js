import React, { useState, createContext } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Footer from "./footer/footer"
import "./layout.css"
import Nav from "../components/nav/nav";
import Contact from "../components/contact/contact";

export const ThemeDataContext = createContext(null);
export const ActiveMenu = createContext(null);

const Layout = ({ children }) => {

  const ThemeData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      wordpressAcfOptions {
        options {
          copyright
          designation
          email
          logo {
            url {
              source_url
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
      allWordpressWpApiMenusMenusItems(filter: {name: {eq: "Footer"}}) {
          edges {
              node {
                  name
                  items {
                      classes
                      target
                      title
                      url
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
  const toggleMenu = (menu)  => isMenu(menu) ? setActiveMenu("") : setActiveMenu(menu);
  const toggleMainMenu = () => toggleMenu("main");
  const toggleContactMenu = () => toggleMenu("contact");
  

  return (
    <ThemeDataContext.Provider value={themeData}>
      <ActiveMenu.Provider value={{toggleMainMenu, toggleContactMenu, isMenu}}>
        <Nav/>
        <Contact/>
      </ActiveMenu.Provider>
      <div>
        <main>{children}</main>
        <Footer/>
      </div>
    </ThemeDataContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
