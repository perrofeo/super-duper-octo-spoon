import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        featured {
            childImageSharp {
              fluid(maxWidth: 750) {
                ...GatsbyImageSharpFluid
              }
            }
          }
      }
      timeToRead
      html
    }
  }
`

const BlogPost = props => {
  return (
    <Layout>
      <div>
        <h1>{props.data.markdownRemark.frontmatter.title}</h1>
        <span>
          Posted on {props.data.markdownRemark.frontmatter.date}{" "}
          <span> / </span> {props.data.markdownRemark.timeToRead} min read
        </span>
        {props.data.markdownRemark.frontmatter.featured && (
          <Img
            fluid={props.data.markdownRemark.frontmatter.featured.childImageSharp.fluid}
            alt={props.data.markdownRemark.frontmatter.title}
          />
        )}
        <div
          dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
        >
</div>
      </div>
    </Layout>
  )
}

export default BlogPost