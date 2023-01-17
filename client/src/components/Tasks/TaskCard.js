import { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

export default function TaskCard({ date }) {

    const [tasks, setTasks] = useState([]);

    const noTaskMessages = [
        "Nothing to do today, just sit back and relax!",
        "You're all caught up! Enjoy the free time.",
        "Looks like you have a day off, take a break and smell the roses.",
        "Today's task list is empty, time to enjoy some 'me' time.",
        "All tasks completed, time to do what you love.",
        "It's a beautiful day, no tasks to complete, enjoy it!",
        "No to-do's for today, now go out and make some memories.",
        "Task list is clear, time to kick back and enjoy the day.",
        "Nothing on the agenda, time to make your own fun.",
        "No tasks, no stress, just pure relaxation.",
        "Task-free day ahead, make the most of it!",
        "All done for today, time to enjoy the little things.",
        "No tasks, no problem, time to do whatever you please.",
        "No deadlines today, take a deep breath and enjoy the peace.",
        "Free day ahead, go out and make some memories.",
        "No tasks, no rush, just enjoy the present moment.",
        "Today is all yours, make the most of it!",
        "Task list is empty, time to indulge in some self-care.",
        "No tasks, no pressure, just enjoy the day ahead."
      ];

      const getTasks = async () => {
        const userId = localStorage.getItem('userId');
        const res = await fetch(`http://localhost:5000/${userId}/tasks`);
        const data = await res.json();

        return data.tasks;
    }

    // useEffect(() => {
    //     const fetchTasks = async () => {
    //       const tasks = await getTasks();
    //       setTasks(tasks);
    //     };
    //     fetchTasks();
    //   }, []);

    // const todaysTasks = tasks.filter(task => {
    //     const today = new Date();
    //     const dueDate = new Date(task.dueDate);
    //     return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() === dueDate.getFullYear() + '-' + (dueDate.getMonth() + 1) + '-' + dueDate.getDate()+1;
    // });

    // console.log(todaysTasks);
    
    return(
        <>
            <Card className='card-style'>
                <Card.Header>Today's Tasks</Card.Header>
                {
                    tasks.length === 0 ? 
                        <Card.Body className='no-task-message'>
                            {noTaskMessages[Math.floor(Math.random() * noTaskMessages.length)]}
                        </Card.Body> : 
                        <ListGroup variant="flush">
                            {tasks.map((task, index) => ( <ListGroup.Item key={index}>{task}</ListGroup.Item>
                            ))}
                </ListGroup>
                }
            </Card>
        </>
    )
}