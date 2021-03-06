/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import LocalStats from './local-stats';
import "../css/global.css";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          community
          authorName
          authorLink
        }
      }
      communityLogo: file(relativePath: { eq: "community-icon.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `);

  return (
    <>
      <div className="container mx-auto max-w-2xl sm:px-0 px-4">
        <Header
          siteTitle={data.site.siteMetadata.title}
          siteLogo={data.communityLogo}
          siteCommunity={data.site.siteMetadata.community}
        >
            <div className="ml-auto">
              <LocalStats/>
            </div>
        </Header>

        <main>{children}</main>
        <footer className="text-sm pt-10 pb-3 w-full flex flex-row">
          <div className="justify-start">
            &copy; {new Date().getFullYear()} built with
            {` `}
            <a className="text-blue-600" href="https://www.gatsbyjs.org">
              Gatsby
            </a>
            {" "}by{" "}
            <a className="text-blue-600" href={data.site.siteMetadata.authorLink}>
              {data.site.siteMetadata.authorName}
            </a>.
          </div>
          <div className="ml-auto">
            <a className="text-blue-600" href="https://www.servicerelief.us/">
              Build one for your community.
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
