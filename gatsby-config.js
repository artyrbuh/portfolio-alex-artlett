require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Alexander Artlett`,
    description: `Gatbsy build of Alexander Artlett's portfolio site`,
    author: `@artyrbruh`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-netlify`,
    {
      resolve: "gatsby-source-wordpress",
      options: {
        minimizeDeprecationNotice: true,
        baseUrl: process.env.API_URL,
        protocol: process.env.API_PROTOCOL,
        hostingWPCOM: false,
        useACF: true,
        verboseOutput: false,
        perPage: 100,
        concurrentRequests: 10,
        includedRoutes: [
          "**/categories",
          "**/posts",
          "**/pages",
          "**/media",
          "**/tags",
          "**/taxonomies",
          "**/users",
          "**/logo",
          "**/favicon",
          "**/menus",
          "**/work"
        ],
      },
    },
  ],
}
