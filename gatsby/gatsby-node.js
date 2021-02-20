const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
 
// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local WordPress graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.

    
 
    // ==== PAGES (WORDPRESS NATIVE) ====
    graphql(
      `
        {
          allWordpressPage(filter:{slug:{ne:"home"}}) {
            edges {
              node {
                id
                wordpress_id
                slug
                status
                template
                title
                content
                template
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
 
        // Create Page pages.
        const pageTemplate = path.resolve("./src/templates/page.js");
        const workLandingTemplate = path.resolve("./src/templates/work-landing.js");
        // We want to create a detailed page for each
        // page node. We'll just use the WordPress Slug for the slug.
        // The Page ID is prefixed with 'PAGE_'
        _.each(result.data.allWordpressPage.edges, edge => {
          // Gatsby uses Redux to manage its internal state.
          // Plugins and sites can use functions like "createPage"
          // to interact with Gatsby.
 
          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/${edge.node.slug}/`,
            component: edge.node.template === "page-work.php" ? slash(workLandingTemplate) : slash(pageTemplate),
            context: edge.node,
          })
        })

        //resolve()
      })
      // ==== END PAGES ====
 
    // ==== WORK (WORDPRESS NATIVE AND ACF) ====
    .then(() => {
      graphql(
        `
        {
          allWordpressWpWork(filter: {slug: {ne: "dummy"}}) {
            edges {
              node {
                title
                slug
                wordpress_id
                date
                content
                featured_media {
                  source_url
                  localFile {
                    publicURL
                    childImageSharp {
                      fluid(pngQuality: 10) {
                        originalImg
                        src
                      }
                    }
                  }
                }
                acf {
                  main_technology
                  professions
                  project_website
                  project_year
                  technologies
                  layouts_work {
                    ... on WordPressAcf_video {
                      id
                      youtube_url
                      video_preview {
                        source_url
                        localFile {
                          publicURL
                        }
                      }
                      include_available_for_hire_cta
                      caption {
                        alignment
                        content
                      }
                    }
                    ... on WordPressAcf_images_block {
                      id
                      caption {
                        alignment
                        content
                      }
                      include_available_for_hire_cta
                      images {
                        make_as_window
                        has_bg
                        is_video
                        video {
                          localFile {
                            publicURL
                          }
                        }
                        image {
                          source_url
                          localFile {
                            publicURL
                          }
                        }
                      }
                    }
                    ... on WordPressAcf_content_block {
                      id
                      include_available_for_hire_cta
                      content
                      heading
                      alignment
                      cta_url
                      cta_text
                      jumbo_text
                    }
                  }
                }
              }
              previous {
                slug
                title
              }
              next {
                slug
                title
              }
            }
          }
        }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        const workTemplate = path.resolve("./src/templates/work.js")
        // We want to create a detailed page for each
        // post node. We'll just use the WordPress Slug for the slug.
        // The Post ID is prefixed with 'POST_'
        _.each(result.data.allWordpressWpWork.edges, edge => {
          createPage({
            path: `/work/${edge.node.slug}/`,
            component: slash(workTemplate),
            context: {content: edge.node, previous: edge.previous, next: edge.next},
          })
        })
        resolve()
      })
    })

    // ==== END WORK ====
  })
}