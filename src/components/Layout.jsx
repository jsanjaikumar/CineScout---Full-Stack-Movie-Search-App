import React from "react";
import Header from "./Header.jsx";

const Layout = ({ children }) => (
  <>
    <Header />
    <div className="pt-16">
      {" "}
      {/* Add padding to account for fixed header */}
      {children}
    </div>
  </>
);

export default Layout;
