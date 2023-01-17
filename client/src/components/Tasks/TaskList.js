import react, { useState, useEffect } from 'react';
import { Card, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

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
  
    const dateFormat = (date) => {

      // const today = 
      // const tomorrow = 
      // const thisWeek = 
      // const thisMonth = 
      // const thisYear = 
      // const future = 

      // return (date < tomorrow) ? 'Today' : (date < thisWeek) ? 'This Week' : (date < thisMonth) ? 'This Month' : (date < thisYear) ? 'This Year' : (date < future) ? 'Future' : 'Overdue';
    }

  return(
    <Card>
    <Card.Body>
      {tasks.map(task => (
          <div key={task._id}>
            <Card.Title>
                <h4>{task.title}</h4> 
            </Card.Title>
            <Card.Text>{task.description}</Card.Text>
            <Card.Text>Due Date: {dateFormat(task.date)}</Card.Text>
            <Card.Text>Priority: {task.priority}</Card.Text>
            <Button onClick={() => setEditMode(true)}>Edit</Button>
            <Button>Delete</Button>
          </div>
      ))}
    </Card.Body>
  </Card>
  )
}