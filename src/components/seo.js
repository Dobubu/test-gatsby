import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

const Seo = ({ title, description = "Page description" }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <title>
        {title} | {data.site.siteMetadata.title}
      </title>
      <meta name="description" content={description} />
    </>
  );
};

export default Seo;
