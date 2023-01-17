import react, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export default function TaskModal() {
    const [show, setShow] = useState(false);
    const [task, setTask] = useState({
        taskName: "",
        description: "",
        priority: "Low",
        dueDate: Date.now,
        completed: "No",
        userId: "",
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");

        try {
            const res = await fetch(`http://localhost:5000/addtask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: {
                    taskName: task.taskName,
                    description: task.description,
                    priority: task.priority,
                    dueDate: task.dueDate,
                    completed: task.completed,
                    userId: userId,
                } }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            handleClose();
            window.location.reload();
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create Task
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTaskName">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter task" name="taskName" value={task.taskName} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formTaskDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" name="description" value={task.description} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formTaskPriority">
                            <Form.Label>Priority</Form.Label>
                            <Form.Control as="select" name="priority" value={task.priority} onChange={handleChange}>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formTaskDueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formTaskCompleted">
                            <Form.Label>Completed</Form.Label>
                            <Form.Control as="select" name="completed" value={task.completed} onChange={handleChange}>
                                <option>Yes</option>
                                <option>No</option>
                                <option>In Progress</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}