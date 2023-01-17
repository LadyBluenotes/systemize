import react, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { FaTrashAlt, FaCheck } from 'react-icons/fa';
import { EditTaskModal } from './EditTaskModal';

export default function TaskList() {

    const [tasks, setTasks] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const getTasks = async () => {
        const userId = localStorage.getItem('userId');
        const res = await fetch(`http://localhost:5000/${userId}/tasks`);
        const data = await res.json();

        return data.tasks;
    }

    useEffect(() => {
      const fetchTasks = async () => {
        const tasks = await getTasks();
        setTasks(tasks);
      };
      fetchTasks();
    }, []);

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE',
        });
        setTasks(tasks.filter((task) => task._id !== id));
    }

    const completeTask = async (id, status) => {
        await fetch(`http://localhost:5000/tasks/${id}/checkbox`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: {
                completed: status,
            } }),
        });
        setTasks(tasks.filter((task) => task._id !== id));
    }

    const dateFormat = (date) => {
        const dateArr = date.split('T');
        const dateArr2 = dateArr[0].split('-');
        let month = dateArr2[1];
        let day = dateArr2[2];
        const dayNum = parseInt(day);
        // let year = dateArr2[0];
        const dayOfWeek = new Date(date).getDay()+1;
        const monthNum = parseInt(month);
        const dayOfWeekArr = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
        const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        day = dayOfWeekArr[dayOfWeek];
        month = monthArr[monthNum - 1];
        return `${day}, ${month} ${dayNum}`;
    }

    const taskStatus = (dueDate, completed) => {
          const today = new Date();
          const todayFormat = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          dueDate = new Date(dueDate);
          const dueDateFormat = dueDate.getFullYear() + '-' + (dueDate.getMonth() + 1) + '-' + dueDate.getDate()+1;
          if (completed === "Yes") {
              return "Complete";
          } else if (completed === "No" && dueDateFormat === todayFormat) {
              return "Past Due";
          } else if (completed === "No" && dueDateFormat < todayFormat) {
              return "Due Today";
          } else if (completed === "No" && dueDateFormat === todayFormat + 1) {
              return "Due Tomorrow";
          } else if (completed === "No" && dueDateFormat <= todayFormat + 7) {
              return "Due Soon";
          } else if (completed === "No" && dueDateFormat > todayFormat + 7) {
              return "Incomplete";
          } else if (completed === "In Progress") {
              return "In Progress";
          }
    }

    const taskComplete = (status) => { 
      if (status === "Yes") {
        return <FaCheck />
      } else if (status === "No") {
        return <></>
      }
        
    }

  return(
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Status</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td>{taskComplete(task.completed)}</td>
              <td><Form.Text className="text-muted">{taskStatus(task.dueDate, task.completed)}</Form.Text></td>
              <td>{task.taskName}</td>
              <td>{task.description}</td>
              <td>{dateFormat(task.dueDate)}</td>
              <td>{task.priority}</td>
              <td>
                <EditTaskModal task={task} />
                <Button onClick={() => deleteTask(task._id)}><FaTrashAlt /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}