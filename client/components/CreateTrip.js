import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Form,
  Alert,
  Button,
  Modal,
  Toast,
  ToastContainer,
  Tab,
  Tabs,
  Card,
} from "react-bootstrap";
import { createNewTrip } from "../redux/tripReducer";
import { getCookie } from "../redux/users";

const CreateTrip = (props) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState([]);
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPalFmzItiv41uwG0LGteZ-243tFftPPUb1xfU8MQNo-iEOpBBT_Kflw56iuun22IgT-M&usqp=CAU"
  );
  const [status, setStatus] = useState("active");
  const [show, setShow] = useState(false);
  const [key, setKey] = useState("create");
  const [showSuccessToast, setSuccessToast] = useState(false);
  const [showErrorMessage, setErrorMessage] = useState(false);
  const userId = getCookie("userId");

  const [validated, setValidated] = useState(false);

  const stockTripImages = [
    "/stock-header-images/image1.jpg",
    "/stock-header-images/image5.jpg",
    "/stock-header-images/image4.jpg",
  ];

  const errorDictionary = {
    startDateError: [3, "Must set start date"],
    endDateError: [4, "Must set end date"],
    startDateBeforeError: [5, "Must set start date before setting end date"],
    endDateAfterError: [6, "End date must come after start date"],
  };

  //check if error exists already
  const inCurrentErrors = (errorId) => {
    const isACurrentError = errors.filter((error) => error[0] === errorId);
    if (isACurrentError.length) {
      return true;
    } else {
      return false;
    }
  };

  //if two error messages are not associated with that field, second errorId defaults to zero
  const getFilteredErrors = (errorId1, errorId2 = 0) => {
    const filteredErrors = errors.filter(
      (error) => error[0] !== errorId1 && error[0] !== errorId2
    );
    return filteredErrors;
  };

  //ERROR MESSAGE
  useEffect(() => {
    if (errors.length < 1) {
      setErrorMessage(false);
    }
  }, [errors]);

  // SPECIFIC ERROR HANDLING
  useEffect(() => {
    if (!start_date) {
      if (!inCurrentErrors(3)) {
        errors.push(errorDictionary.startDateError);
      }
    } else {
      setErrors(getFilteredErrors(3, 5));
    }

    if (!end_date) {
      if (!inCurrentErrors(4)) {
        errors.push(errorDictionary.endDateError);
      }
    } else {
      setErrors(getFilteredErrors(4, 6));
    }

    if (name && country && start_date && end_date) {
      setErrors(getFilteredErrors(3, 4));
    }
  }, [name, country, start_date, end_date]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    if (name && country && start_date && end_date) {
      if (errors.length === 0) {
        props.createNewTrip({
          name,
          city,
          state,
          country,
          start_date,
          end_date,
          imageUrl,
          status,
          userId,
        });
        setName("");
        setCity("");
        setState("");
        setCountry("");
        setStartDate("");
        setEndDate("");
        setStatus("active");
        setSuccessToast(true);
        setShow(false);
      }
    } else {
      setErrorMessage(true);
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "city") {
      setCity(event.target.value);
    } else if (event.target.name === "state") {
      setState(event.target.value);
    } else if (event.target.name === "country") {
      setCountry(event.target.value);
    }
  };

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDate = (newValue) => {
    if (!start_date) {
      if (!inCurrentErrors(5)) {
        errors.push(errorDictionary.startDateBeforeError);
      }
    } else {
      if (newValue < start_date) {
        if (!inCurrentErrors(6)) {
          errors.push(errorDictionary.endDateAfterError);
        }
      } else {
        setEndDate(newValue);
      }
    }
  };

  const handleImg = (event) => {
    setImageUrl(event.target.value);
  };

  const handleClose = () => {
    setShow(false);
    setErrorMessage(false);
  };

  const handleShow = () => setShow(true);

  return (
    <div>
      <ToastContainer position="top-end">
        <Toast
          bg="info"
          onClose={() => setSuccessToast(false)}
          show={showSuccessToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">trippn</strong>
            <small>Now</small>
          </Toast.Header>
          <Toast.Body>Pack your bags. You just created a trip.</Toast.Body>
        </Toast>
      </ToastContainer>
      <Button variant="primary" onClick={handleShow}>
        Create Trip
      </Button>
      <Modal show={show} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Create Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            id="create-trip-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            fill
          >
            <Tab eventKey="create" title="Create">
              <Form noValidate validated={validated}>
                <Form.Group className="mb-3" controlId="edit-trip-form">
                  <small style={{ float: "right", color: "red" }}>*</small>
                  <Form.Control
                    required
                    type="text"
                    name="name"
                    placeholder="Trip Name"
                    value={name}
                    onChange={handleChange}
                    style={{ width: "98%", margin: "auto" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Must add a trip name
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="edit-trip-form">
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="City"
                    value={city}
                    onChange={handleChange}
                    style={{ width: "98%", margin: "auto" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="edit-trip-form">
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder="State"
                    value={state}
                    onChange={handleChange}
                    style={{ width: "98%", margin: "auto" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="edit-trip-form">
                  <small style={{ float: "right", color: "red" }}>*</small>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    name="country"
                    value={country}
                    onChange={handleChange}
                    style={{
                      width: "98%",
                      margin: "auto",
                      background: "whitesmoke",
                    }}
                  >
                    <option value="">Select a country</option>

                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Aland Islands">Åland Islands</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">
                      Antigua & Barbuda
                    </option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bonaire, Sint Eustatius and Saba">
                      Caribbean Netherlands
                    </option>
                    <option value="Bosnia and Herzegovina">
                      Bosnia & Herzegovina
                    </option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">
                      British Indian Ocean Territory
                    </option>
                    <option value="Brunei Darussalam">Brunei</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">
                      Central African Republic
                    </option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos (Keeling) Islands">
                      Cocos (Keeling) Islands
                    </option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo - Brazzaville</option>
                    <option value="Congo, Democratic Republic of the Congo">
                      Congo - Kinshasa
                    </option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote D'Ivoire">Côte d’Ivoire</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Curacao">Curaçao</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czechia</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">
                      Dominican Republic
                    </option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands (Malvinas)">
                      Falkland Islands (Islas Malvinas)
                    </option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">
                      French Southern Territories
                    </option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and Mcdonald Islands">
                      Heard & McDonald Islands
                    </option>
                    <option value="Holy See (Vatican City State)">
                      Vatican City
                    </option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran, Islamic Republic of">Iran</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Korea, Democratic People's Republic of">
                      North Korea
                    </option>
                    <option value="Korea, Republic of">South Korea</option>
                    <option value="Kosovo">Kosovo</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao People's Democratic Republic">
                      Laos
                    </option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">Libya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macao">Macao</option>
                    <option value="Macedonia, the Former Yugoslav Republic of">
                      North Macedonia
                    </option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia, Federated States of">
                      Micronesia
                    </option>
                    <option value="Moldova, Republic of">Moldova</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar (Burma)</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Curaçao</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">
                      Northern Mariana Islands
                    </option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestinian Territory, Occupied">
                      Palestine
                    </option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn Islands</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Réunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">Russia</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Barthelemy">St. Barthélemy</option>
                    <option value="Saint Helena">St. Helena</option>
                    <option value="Saint Kitts and Nevis">
                      St. Kitts & Nevis
                    </option>
                    <option value="Saint Lucia">St. Lucia</option>
                    <option value="Saint Martin">St. Martin</option>
                    <option value="Saint Pierre and Miquelon">
                      St. Pierre & Miquelon
                    </option>
                    <option value="Saint Vincent and the Grenadines">
                      St. Vincent & Grenadines
                    </option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">
                      São Tomé & Príncipe
                    </option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Serbia and Montenegro">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Sint Maarten">Sint Maarten</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and the South Sandwich Islands">
                      South Georgia & South Sandwich Islands
                    </option>
                    <option value="South Sudan">South Sudan</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard and Jan Mayen">
                      Svalbard & Jan Mayen
                    </option>
                    <option value="Swaziland">Eswatini</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syrian Arab Republic">Syria</option>
                    <option value="Taiwan, Province of China">Taiwan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania, United Republic of">
                      Tanzania
                    </option>
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-Leste">Timor-Leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">
                      Trinidad & Tobago
                    </option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos Islands">
                      Turks & Caicos Islands
                    </option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands">
                      U.S. Outlying Islands
                    </option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Viet Nam">Vietnam</option>
                    <option value="Virgin Islands, British">
                      British Virgin Islands
                    </option>
                    <option value="Virgin Islands, U.s.">
                      U.S. Virgin Islands
                    </option>
                    <option value="Wallis and Futuna">Wallis & Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Must select a country
                  </Form.Control.Feedback>
                </Form.Group>

                <div>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    className="date-picker"
                  >
                    <DatePicker
                      minDate={new Date()}
                      label="Start Date"
                      name="start_date"
                      value={start_date}
                      onChange={handleStartDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <small style={{ position: "float", color: "red" }}>*</small>
                </div>
                <div>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    className="date-picker"
                  >
                    <DatePicker
                      minDate={new Date()}
                      label="End Date"
                      name="end_date"
                      value={end_date}
                      onChange={handleEndDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <small style={{ position: "float", color: "red" }}>*</small>
                </div>
              </Form>
              <small style={{ float: "right", color: "red" }}>
                * indicates required field
              </small>
            </Tab>
            <Tab eventKey="trip-image" title="Select Trip Image">
              <Form style={{ display: "flex", justifyContent: "center" }}>
                {stockTripImages.map((img) => (
                  <Card key={img} style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={img}
                      height="180rem"
                      fluid="true"
                    />
                    <Card.Body>
                      <Form.Check
                        type="radio"
                        id="default-radio"
                        label="Select"
                        name="image-radio"
                        value={img}
                        onClick={handleImg}
                      />
                    </Card.Body>
                  </Card>
                ))}
              </Form>
            </Tab>
          </Tabs>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
          <Alert show={showErrorMessage} variant="danger">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Alert.Heading>
                Please fix required fields before proceeding
              </Alert.Heading>
              <ul>
                {errors.map((error, i) => {
                  return <li key={i}>{error[1]}</li>;
                })}
              </ul>
            </div>
            <hr />
          </Alert>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    createNewTrip: (trip) => dispatch(createNewTrip(trip)),
  };
};

export default connect(null, mapDispatch)(CreateTrip);
