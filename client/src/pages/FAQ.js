import React from "react";
import Layout from "../components/Layout/Layout";
import AllCollapseExample from "../components/FAQN";

const FAQ = () => {
  return (
    <Layout title={"FAQ section"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/faq.webp"
            alt="contactus"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4">
          <AllCollapseExample />
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
