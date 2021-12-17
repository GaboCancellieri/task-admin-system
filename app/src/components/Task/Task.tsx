import { useState } from "react";
import { ITask } from "../../interfaces/ITask";
import { colors } from "../../utils/theme";
import TaskDetail from "../TaskDetail";
import Typography from "../Typography";

import styles from './styles';

interface Props {
  number: number,
  task: ITask,
  handleCompleteTask: () => void,
}

const Task = ({
  number,
  task,
  handleCompleteTask,
}: Props) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  
  const handleClose = () => {
    setShowDetail(false);
  }

  return (
    <>
      <div style={styles.mainContainer} onClick={() => setShowDetail(true)}>
        <Typography size={20} color={colors.white} variant="italic">Task #{number}</Typography>
        <Typography size={18} variant="bold">{task.title}</Typography>
      </div>
      <TaskDetail number={number} task={task} show={showDetail} handleClose={handleClose} handleCompleteTask={handleCompleteTask}></TaskDetail>
    </>
  );
};

export default Task;