import Accordion from "react-bootstrap/Accordion";

function AllCollapseExample() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>What about E-Shophy?</Accordion.Header>
        <Accordion.Body>
          E-Shophy: A cutting-edge web-based e-commerce platform, redefining
          online shopping with innovation, global accessibility, and
          sustainability at its core.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>About Service Availability?</Accordion.Header>
        <Accordion.Body>24*7 all over the world.</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AllCollapseExample;
