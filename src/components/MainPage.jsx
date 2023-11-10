import React, { useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function MainPage({ users, user }) {
  const [err, setErr] = useState(null);
  const [tableData, setTableData] = useState(users);

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(`/api/tableform/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error deleting post');
      }
      setTableData((prev) => prev.filter((el) => el.id !== id));
    } catch (error) {
      console.error('Error in deleteHandler Users:', error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      soname: formData.get('soname'),
      name: formData.get('name'),
      secondname: formData.get('secondname'),
    };

    try {
      const res = await axios.post('/api/tableform/new', data);
      if (res.status === 200) {
        const newData = [...tableData, res.data];
        setTableData(newData);
        e.target.reset();
      }
    } catch (error) {
      setErr(error.response.data.message);
    }
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formSoname">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control type="text" name="soname" placeholder="введите фамилию" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Имя</Form.Label>
          <Form.Control type="text" name="name" placeholder="введите имя" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSecondname">
          <Form.Label>Отчество</Form.Label>
          <Form.Control type="text" name="secondname" placeholder="введите отчество" />
        </Form.Group>

        <Row className="justify-content-center mt-3 mb-3 text-center">
          <Col>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.soname}</td>
              <td>{row.name}</td>
              <td>{row.secondname}</td>

              <td>
                <Button
                  type="button"
                  variant="outline-secondary"
                  // Other attributes and onClick handlers for the Edit button
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="outline-primary"
                  onClick={() => deleteHandler(row.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default MainPage;
