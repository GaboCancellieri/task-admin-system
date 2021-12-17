import { colors } from "../../utils/theme";
import Typography from "../Typography";

import styles from './styles';
import { Badge, Button, Modal } from 'react-bootstrap/';
import { DefaultButton } from "..";
import { ITask } from "../../interfaces/ITask";

interface Props {
  number: number,
  task: ITask,
  show: boolean,
  handleClose: () => void,
  handleCompleteTask: () => void,
}

const TaskDetail = ({
  number,
  task,
  show = false,
  handleClose,
  handleCompleteTask,
}: Props) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Task #{number}</Modal.Title> 
          {(task.isComplete) && <Badge style={{ marginLeft: 10}} bg="primary">Tak complete!</Badge>}
      </Modal.Header>
      <Modal.Body>
          <Typography>{task.title}</Typography>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {
          (!task.isComplete) && <Button variant="primary" onClick={() => {handleCompleteTask(); handleClose()}}>
          Complete
        </Button>
        }
        
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDetail;
