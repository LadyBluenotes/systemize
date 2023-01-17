import react, { useState, useEffect } from 'react';
import { Card, Button, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import TaskModal from './TaskModal';

// show tasks based on the filter selected
// display filter selected as the title
// use react-bootstrap to display the tasks in a card format
    // card title should be the task name with priority and due date as subtext
    // card text should include the task description, and a button to edit or delete the task
    // card footer should include the ability to mark a task as completed, in progress, or not started

export default function TaskList({ filter }) {

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

    const editTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
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
    

  return(
    <Table striped bordered hover>
      <thead>
        <tr>
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
            <td>{task.taskName}</td>
            <td>{task.description}</td>
            <td>{dateFormat(task.dueDate)}</td>
            <td>{task.priority}</td>
            <td>
              <Button onClick={() => setEditMode(true)}>Edit</Button>
              <Button onClick={() => deleteTask(task._id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}