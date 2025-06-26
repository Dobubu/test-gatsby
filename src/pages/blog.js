import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      <p>My cool posts will go in here</p>
      <ul>
        {data.allFile.nodes.map((node) => (
          <li key={node.name}>{node.name}</li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query {
    site(siteMetadata: {}) {
      siteMetadata {
        title
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "blog" } }) {
      nodes {
        name
      }
    }
  }
`;

export const Head = ({ data }) => (
  <Seo title={`My Blog Posts | ${data.site.siteMetadata.title}`} />
);

export default BlogPage;
