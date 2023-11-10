import React, { useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Col, Row, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ModalEdit from '../UI/ModalEdit';
import {
  styleOuter,
  innerContainer,
  nestedContainer,
  nestedContainer2,
  nestedContainer3,
} from '../../styles';

function MainPage({ users, user }) {
  const [err, setErr] = useState(null);
  const [tableData, setTableData] = useState(users);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserData, setEditUserData] = useState({}); // Store edited user data

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/tableform/user/${id}`);
      setTableData((prev) => prev.filter((el) => el.id !== id));
    } catch (error) {
      console.error('Error in deleteHandler Users:', error);
    }
  };

  const openEditModal = (user) => {
    setIsEditing(true);
    setEditUserData(user);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditUserData({});
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      soname: formData.get('soname'),
      name: formData.get('name'),
      secondname: formData.get('secondname'),
    };
    const isDuplicate = (newUserData) =>
      tableData.some(
        (user) =>
          user.soname === newUserData.soname &&
          user.name === newUserData.name &&
          user.secondname === newUserData.secondname,
      );
    if (isDuplicate(data)) {
      setErr('Пользователь с такими ФИО уже существует.');
      alert('Пользователь с такими ФИО уже существует.');
      return;
    }

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
      <h3 style={{paddingTop: '3ch'}}>Задание №2 Таблица клиентов</h3>
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
                  onClick={() => openEditModal(row)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="outline-primary"
                  onClick={() => deleteHandler(row.id)}
                  style={{ marginLeft: '1ch' }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalEdit
        show={isEditing}
        user={editUserData}
        handleClose={closeEditModal}
        setTableData={setTableData}
      />
      <h3>Задание № 3</h3>
      <div className="outer-container" style={styleOuter}>
        <div className="inner-container" style={innerContainer}>
          <div className="nested-container" style={nestedContainer}>
            <div className="nested-container2" style={nestedContainer2}>
              <div className="nested-container3" style={nestedContainer3}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
