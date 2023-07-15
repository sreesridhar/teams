import React, { useEffect, useState } from "react";
import { Row, Col, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./../pages/Home.css";
import logo from "./../images/logo.png";
import manufacturearrow from "./../images/manufacturearrow.png";
import expiryarrow from "./../images/expiryarrow.png";
import moment from "moment";

export default function Home() {
  const [sampleData, setSampleData] = useState({});
  const fetchUserData = () => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    fetch("http://162.240.232.39:8181/api/v2/water-tests/latest")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data ", data.data[0]);
        setSampleData(data && data?.data[0]);
      });
  };

  const formatData = (data) => {
    return data ? moment(data).format("DD.MM.YYYY") : "-";
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="entiresection-wrapper">
      <div className="header-wrapper">
        <Container>
          <Row className="justify-content-center">
            <img src={logo} />
          </Row>
        </Container>
      </div>
      <div className="testing-report-wrapper">
        <Container>
          <Row className="justify-content-center">
            <Col>
              <p className="test-report-title">Water Testing Report</p>
              {/* {sampleData && sampleData[0]?.name}
              {sampleData && sampleData?.expiryDate} */}
              {/* {sampleData.map((res) => {
                return <p>{res.name}</p>;
              })} */}
            </Col>
          </Row>
          <Row className="justify-content-center report-container">
            <Col sm={6} xs={6}>
              <div className="manufacture-date manufacture-container">
                <span>
                  <img src={manufacturearrow} className="m-2" />
                </span>
                <p>Manufacturing Date : </p>
                {/* <h4>{formatData("2023-06-15T12:09:44.102Z")}</h4> */}
                {sampleData && (
                  <h4>{formatData(sampleData?.manufacturerDate)}</h4>
                )}
              </div>
            </Col>
            <Col sm={6} xs={6}>
              <div className="manufacture-date expiry-container">
                <span>
                  <img src={expiryarrow} className="m-2" />
                </span>
                <p>Expiry Date: </p>
                {/* <h4>{formatData("2023-06-15T12:09:44.102Z")}</h4> */}
                {sampleData && <h4>{formatData(sampleData?.expiryDate)}</h4>}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="table-wrapper">
        <Container>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th>Categery</th>
                  <th>Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TDS</td>
                  <td>
                    {sampleData && <h4>{sampleData?.tds}</h4>}
                  </td>
                </tr>
                <tr>
                  <td>PH Value</td>
                  <td>
                    {sampleData && <h4>{sampleData?.phValue}</h4>}
                  </td>
                </tr>
                <tr>
                  <td>Calcium</td>
                  <td>
                    {sampleData && <h4>{sampleData?.calcium}</h4>}
                  </td>
                </tr>
                <tr>
                  <td>Magnesium</td>
                  <td>
                    {sampleData && <h4>{sampleData?.magnesium}</h4>}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row className="justify-content-center link-wrapper">
            <Link to="https://www.teamwater.in/" target="_blank">
              teamwater.in
            </Link>
          </Row>
        </Container>
      </div>
      <div className="copyright-section">
        <Container>
          <p>
            Design and Developed by{" "}
            <Link to="https://www.webdads2u.com/" target="_blank">
              {" "}
              WEBDADS2U PVT LTD{" "}
            </Link>
          </p>
        </Container>
      </div>
    </div>
  );
}
