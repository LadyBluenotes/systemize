import { useState, useEffect } from 'react';
import { Card, ListGroup, Form } from 'react-bootstrap';

export default function TaskCard() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        fetch(`http://localhost:5000/${userId}/tasks`)
            .then(res => res.json())
            .then(data => {
                setTasks(data.tasks);

            })
            .catch(err => console.log(err));
        }, []);

        // filter if task is today
        const today = new Date();
        const todayTasks = tasks.filter(task => {
            // any task that is due today or before today will be included in today's tasks
            return new Date(task.dueDate) <= today;
        });

        // function to change task status to completed
        // const changeTaskStatus = (e) => {


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
    
    return(
        <>
            <Card className='card-style'>
                <Card.Header>Today's Tasks</Card.Header>
                {
                    todayTasks && todayTasks.length === 0 ? 
                        <Card.Body className='no-task-message'>
                            {noTaskMessages[Math.floor(Math.random() * noTaskMessages.length)]}
                        </Card.Body> : 
                        <ListGroup variant="flush">
                            {todayTasks.map((task, index) => (
                                <ListGroup.Item key={index}
                                    className={task.priority === "High" ? "high-priority" : task.priority === "Medium" ? "medium-priority" : ""}
                                >
                                    <h4 className='today-task-name'>
                                        {task.priority ? (task.priority === "High" ? "!!! " : task.priority === "Medium" ? "! " : "") : ""}
                                        {task.taskName.charAt(0).toUpperCase() + task.taskName.slice(1)}
                                        <div className='checkbox-container'>
                                        <Form.Check 
                                            type="checkbox" 
                                            // onClick={changeTaskStatus}
                                            />
                                    </div>
                                    </h4>
                                    <p>{task.description}</p>
                                    
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                }
            </Card>
        </>
    )
}