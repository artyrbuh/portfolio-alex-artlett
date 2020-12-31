import React from "react"
import {graphql, StaticQuery, Link} from 'gatsby';
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import "../assets/styles/index.scss"

const IndexPage = () => (
  <StaticQuery query={graphql`
        {
          allWordpressPage(filter: {slug: {eq: "home"}}, limit: 1) {
            edges {
              node {
                content
                wordpress_id
                slug
                title
                acf {
                  header {
                    content
                    heading
                  }
                  selected_showcase {
                    heading
                    view_all_cta_text
                    showcase {
                      selected_work {
                        post_title
                        wordpress_id
                        acf {
                          thumbnail_image {
                            source_url
                          }
                        }
                      }
                    }
                  }
                  about_block {
                    content
                    heading
                  }
                  experience_block {
                    experience_list {
                      company
                      description
                      end_year
                      start_year
                    }
                    heading
                  }
                  moving_text
                }
              }
            }
          }
        }
    `} render={props => {
        console.log(props);
        return (
          <Layout>
            <div className="container">
              <div className="columns">
                <div className="column">
                  <SEO title="Home" />
                  <h1>Hi people</h1>
                  <p>Welcome to your new Gatsby site.</p>
                  <p>Now go build something great.</p>
                  <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
                    <Image />
                  </div>
                  <Link to="/page-2/">Go to page 2</Link> <br />
                  <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
                </div>
              </div>
            </div>
          </Layout>
          )
        }
        }/>
)

export default IndexPage
