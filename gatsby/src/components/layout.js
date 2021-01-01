import React, { useState, createContext } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Footer from "./footer/footer"
import "./layout.css"
import Nav from "../components/nav/nav";

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
    }
  `)

const [themeData, setThemeData] = useState(ThemeData)

  return (
    <ThemeDataContext.Provider value={themeData}>
      <Nav/>
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
