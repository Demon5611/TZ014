import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default function ModalEdit({ show, user, handleClose, setTableData }) {
  const [formData, setFormData] = useState({ soname: '', name: '', secondname: '' });

  useEffect(() => {
    // Set initial form data when the user prop changes
    setFormData({
      soname: user.soname || '',
      name: user.name || '',
      secondname: user.secondname || '',
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`/api/tableform/newtext/${user.id}`, formData);
      setTableData((prev) =>
        prev.map((item) => (item.id === user.id ? { ...item, ...formData } : item))
      );
      handleClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSoname">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              name="soname"
              value={formData.soname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Имя</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formSecondname">
            <Form.Label>Отчество</Form.Label>
            <Form.Control
              type="text"
              name="secondname"
              value={formData.secondname}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}