import { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { FaTrashAlt, FaCheck } from 'react-icons/fa';
import { EditTaskModal } from './EditTaskModal';

export default function TaskList() {

    const [tasks, setTasks] = useState([]);
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

    const completeTask = async (id) => {
        const task = tasks.find((task) => task._id === id);

        const res = await fetch(`http://localhost:5000/tasks/${id}/complete`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !task.completed }),
        });
        const data = await res.json();


        setTasks(
          tasks.map((task) =>
              task._id === id ? { ...task, completed: !data.completed } : task
              ));
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
      let todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const due = new Date(dueDate);
      let dueLocal = new Date(due.getFullYear(), due.getMonth(), due.getDate());
      dueLocal = dueLocal.setDate(dueLocal.getDate() + 1);
      dueLocal = new Date(dueLocal);
      if (completed === "Yes") {
        return "Completed"
      } else if (dueLocal < todayLocal) {
        return "Overdue"
      } else if (dueLocal > todayLocal) {
        return "Upcoming"
      } else {
        return "Due Today"
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
              <td><Form.Check 
                type="checkbox"
                id={task._id}
                checked={task.completed}
                onChange={() => completeTask(task._id)}
              /></td>
              <td><Form.Text className="text-muted">{taskStatus(task.dueDate, task.completed)}</Form.Text></td>
              <td>{task.taskName}</td>
              <td className='task-description'>{task.description}</td>
              <td>{dateFormat(task.dueDate)}</td>
              <td>{task.priority}</td>
              <td>
                <div className='action-buttons'>
                  <EditTaskModal task={task} />
                  <Button onClick={() => deleteTask(task._id)}><FaTrashAlt /></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}