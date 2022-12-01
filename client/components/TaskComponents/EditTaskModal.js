import React, { Component, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";

function EditTaskModal(props) {
  const editableFields = [
    "provider_name",
    "due_date",
    "start_date",
    "end_date",
    "start_time",
    "end_time",
    "checkin_time",
    "start_location",
    "end_location",
    "description",
    "booking_num",
    "link",
    "status",
  ];
  const fieldMap = new Map();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit: {props.task.provider_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formTaskName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder={props.task.provider_name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Confirm Changes
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Delete Activity</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default connect(null)(EditTaskModal);
