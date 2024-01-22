import React, { useEffect, useState } from "react";
import { Row, Col, Container, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import logo from "./../images/logo.png";
import manufacturearrow from "./../images/manufacturearrow.png";
import expiryarrow from "./../images/expiryarrow.png";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./../pages/Home.css";

export default function Home() {
  const firstDay = new Date(moment().subtract(30, "days"));
  const lastDay = new Date(moment());

  const icons = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#45c7ff" viewBox="0 0 24 24">
      <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
    </svg>
  );

  const [sampleData, setSampleData] = useState({});
  const [filterDate, setFilterDate] = useState(new Date());

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchUserData = () => {
    const finalDate = moment(filterDate).format("DD-MM-YYYY");
    // fetch("https://jsonplaceholder.typicode.com/users")
    getJSON(finalDate);
  };

  async function getJSON(finalDate) {
    try {
      fetch(
        `https://api.teamwater.in/api/v2/water-tests/latest?date=${finalDate}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log("data ", data.data[0]);
          if (data?.data) {
            setSampleData(data && data?.data);
          } else {
            setSampleData({});
          }
        });
    } catch (error) {
      console.log("error ", error);
      setSampleData({});
    }
  }

  const formatData = (data) => {
    return data ? moment(data).format("DD-MM-YYYY") : "-";
  };

  useEffect(() => {
    fetchUserData();
  }, [filterDate]);

  return (
    <div className="entiresection-wrapper">
      <div className="header-wrapper">
        <Container>
          <Row className="justify-content-center">
            <img src={logo} />
          </Row>
        </Container>
      </div>
      <p className="test-report-title">QUALITY STANDARDS</p>
      <div className="table-wrapper">
        <Container>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th>Parameters</th>
                  <th>Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TDS</td>
                  <td>{sampleData && <h4>{sampleData?.tds}</h4>}</td>
                </tr>
                <tr>
                  <td>pH Value</td>
                  <td>{sampleData && <h4>{sampleData?.phValue}</h4>}</td>
                </tr>
                <tr>
                  <td>Calcium</td>
                  <td>{sampleData && <h4>{sampleData?.calcium}</h4>}</td>
                </tr>
                <tr>
                  <td>Magnesium</td>
                  <td>{sampleData && <h4>{sampleData?.magnesium}</h4>}</td>
                </tr>
                <tr>
                  <td>Water Test Report Download</td>
                  <td>
                    {sampleData && sampleData?.waterTestReportFileName && (
                      <Button
                        onClick={() =>
                          window.open(
                            `https://api.teamwater.in/${sampleData?.waterTestReportFileName}`
                          )
                        }
                        size="sm"
                        variant="primary"
                      >
                        Report
                      </Button>
                    )}
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
      <div className="testing-report-wrapper">
        <Container>
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
      <div className="testing-report-wrapper">
        <Container>
          <Row className="justify-content-center">
            <Col>
              {/* {sampleData && sampleData[0]?.name}
              {sampleData && sampleData?.expiryDate} */}
              {/* {sampleData.map((res) => {
                return <p>{res.name}</p>;
              })} */}
              <div
                style={{
                  textAlign: "center",
                  marginTop: "18px",
                  marginBottom: "9px",
                }}
              >
                <DatePicker
                  showIcon
                  wrapperClassName="datePicker"
                  // eslint-disable-next-line no-undef
                  minDate={firstDay}
                  maxDate={lastDay}
                  selected={filterDate}
                  dateFormat="dd-MM-yyyy"
                  // isClearable={true}
                  onChange={(date) => setFilterDate(date)}
                  icon={icons}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="modal-wrapper">
        <Container>
          <>
            <Button size="sm" variant="primary" onClick={handleShow}>
              Note
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Range Variable</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  <b>pH :</b> 6.0 - 8.5
                </p>
                <p>
                  <b>TDS Above :</b> 75 -90 mg/l
                </p>
                <p>
                  <b>If any queries</b>
                  <div>
                    <a href="mailto:teamwatermktg@drraoholdings.com">
                      teamwatermktg@drraoholdings.com
                    </a>
                  </div>
                  <a href="tel:044-24353954">044-24353954</a>
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button size="sm" variant="primary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
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
