import React, { useState, createContext } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Footer from "./footer/footer"
import "./layout.css"
import Nav from "../components/nav/nav";
import Contact from "../components/contact/contact";

export const ThemeDataContext = createContext()

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

const [themeData, setThemeData] = useState(ThemeData)

  return (
    <ThemeDataContext.Provider value={themeData}>
      <Nav/>
      <Contact/>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
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
