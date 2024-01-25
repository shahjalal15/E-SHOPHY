import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us-eshopy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            E-Shophy stands as a beacon of innovation in the e-commerce
            landscape, offering a user-centric platform with a diverse product
            range. With its commitment to technological advancement, global
            accessibility, and sustainability, E-Shophy is poised to redefine
            online shopping. As it addresses challenges and embraces future
            trends, it remains dedicated to providing a seamless and enriching
            shopping experience for its users.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
