import { ITask } from '../interfaces/ITask';
import { tasksEndpoint } from '../utils/endpoints';

export const getTasks = async (quantity: number) => {
  try {
    let serviceResponse;
    const response = await fetch(tasksEndpoint + `?quantity=${quantity}`);
    const parsedResponse = await response.json();

    if (response.status === 200) {
      serviceResponse = { success: true, data: parsedResponse };
    } else {
      serviceResponse = { success: false, data: parsedResponse };
    }

    return serviceResponse;
  } catch (error) {
    console.log('Error while fetching tasks: ', error);
    return {
      success: false,
      data: error,
    }
  }
}

export const putTask = async (task: ITask) => {
  try {
    let serviceResponse;
    const response = await fetch(`${tasksEndpoint}/${task.id}`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ title: task.title, isComplete: task.isComplete})
    });
    const parsedResponse = await response.json();

    if (response.status === 200) {
      serviceResponse = { success: true, data: parsedResponse };
    } else {
      serviceResponse = { success: false, data: parsedResponse };
    }

    return serviceResponse;
  } catch (error) {
    console.log('Error updating a task: ', error);
    return {
      success: false,
      data: error,
    }
  }
}
