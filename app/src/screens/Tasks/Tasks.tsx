import React, { useEffect, useState } from 'react';
import { TaskList, Typography } from '../../components';
import Loader from "react-loader-spinner";
import { colors } from '../../utils/theme';
import { getTasks } from '../../services';
import { ITask } from '../../interfaces/ITask';
import { Button, Col, Form, Row } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';

const TasksScreen = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(3);
  const [amountOfTasks, setAmountOfTasks] = useState<number>(3);
  const [validated, setValidated] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false || !Number(amountOfTasks)) {
      event.stopPropagation();
    }

    setValidated(true);
    setQuantity(amountOfTasks);
    getTasksData(amountOfTasks);
  };

  const getTasksData = async (num: number) => {
    setLoading(true);
    try {
      const { success, data } = await getTasks(num);
      if (success) {
        setTasks([...data]);
      } else {
          setShowErrorAlert(true);
      }
    } catch (error) {
        console.log('Error getting tasks on Tasks Screen', error);
        setShowErrorAlert(true);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
      getTasksData(quantity);
  }, []);

  const closeAlert = () => {
    setShowErrorAlert(false);
  }

  if (loading) {
    return (
      <>
        <div style={{ marginTop: 100, alignItems: 'center', flex: 1, width: '100%', }}>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={10000} // 10 secs
          />
        </div>
      </>
    );
  } else {
    const handleAmountChange = (e) => {
      const value = e.target.value;
      setAmountOfTasks(value);
      if (!Number(value) || amountOfTasks < 3 || amountOfTasks > 1000) {
        setValidated(false);
      }
    };

    return (
      <>
        <SweetAlert danger title="Error!" show={showErrorAlert} onConfirm={closeAlert} onCancel={closeAlert}>
          Something went wrong while fetching tasks.
        </SweetAlert>
        <div style={{paddingLeft: '10%', paddingTop: 50}}>
          <Typography align='left' color={colors.independence} variant='bold' size={30}>Task Generation</Typography>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Amount of Tasks</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Please, enter a number"
                  value={amountOfTasks} 
                  onChange={handleAmountChange}
                  isInvalid={!Number(amountOfTasks) || amountOfTasks < 3 || amountOfTasks > 1000}
                />
                <Form.Control.Feedback type='valid'>Tasks were generated!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                    Please enter a valid number between 3 and 1000.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
              <Button type="submit" disabled={!Number(amountOfTasks) || amountOfTasks < 3 || amountOfTasks > 1000}>Generate Tasks</Button>
            </div>
          </Form> 
          <br />
          <Typography align='left' color={colors.independence} variant='bold' size={30}>List of Tasks</Typography>
          <TaskList tasks={tasks}></TaskList>
        </div>
      </>
    );
  }
};

export default TasksScreen;
