import Task from "../Task";
import { ITask } from "../../interfaces/ITask"
import { Row, Col } from "react-bootstrap";
import { putTask } from '../../services'
import SweetAlert from 'react-bootstrap-sweetalert';
import { useState } from "react";

interface Props {
  tasks: ITask[],
}

const TaskList = ({
  tasks,
}: Props) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

  const handleCompleteTask = async (taskToUpdate: ITask) => {
    taskToUpdate.isComplete = true;
    const { success, data } = await putTask(taskToUpdate);
    console.log(data);
    if (success) {
      const index = tasks.findIndex((task) => task.id === data.id)
      tasks[index] = Object.assign(data);
      setShowSuccessAlert(true);
    }
  }

  const closeAlert = () => {
    setShowSuccessAlert(false);
  }

  return (
      <>
        <SweetAlert success title="Success!" show={showSuccessAlert} onConfirm={closeAlert} onCancel={closeAlert}>
          Task completed successfully!
        </SweetAlert>
        <Row>
        {tasks.map(function(task, idx){
          return (
            <Col key={idx} lg={'auto'} md={'auto'} sm={'auto'}>
              <Task number={idx+1} task={task} handleCompleteTask={() => { handleCompleteTask(task) }}></Task>
            </Col>
          )
        })}
        </Row>
      </>
  );
};

export default TaskList;
