import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { AALink, PageTransition } from "../core/page-transition"

const NotFoundPage = () => (
  <PageTransition>
    <Layout>
      <SEO title="404: Not found" />

      <div className="container py-5">
        <h1 className="py-5 h1-jumbo">
          404<br/>
          <span className="aa-red--text">PAGE NOT FOUND.</span> <br/>
          ERROR <span>🤪 😂 🙈 😜 😳</span>!
        </h1>
        
        <p className="mt-5 mb-5">M-m-maybe stay with me on my site <br/> by 
        going to the <AALink to="/">home page</AALink>?</p>

        <h1 className="mb-5">
          &nbsp; &nbsp;<span>🥺</span> <br/>
          <span>👉 👈</span>
        </h1>



      </div>
    </Layout>
  </PageTransition>
)

export default NotFoundPage
