/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, createContext } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer/footer"
import "./layout.css"

export const UserStateContext = createContext()

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
    <UserStateContext.Provider value={themeData}>
      <Header siteTitle={ThemeData.site.siteMetadata.title} />
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
    </UserStateContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
