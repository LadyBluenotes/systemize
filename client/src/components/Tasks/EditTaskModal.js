import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';

export function EditTaskModal({ task }) {
    const [show, setShow] = useState(false);
    const [taskData, setTaskData] = useState({
        taskName: task.taskName,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        completed: task.completed,
        userId: task.userId,
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = (e) => {
        setTaskData({
            ...taskData,
            [e.target.name]: e.target.value,
        });
    }
    const handleSave = async (e) => {
        e.preventDefault();

        const taskId = task._id;

        try {
            const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: {
                    taskName: taskData.taskName,
                    description: taskData.description,
                    priority: taskData.priority,
                    dueDate: taskData.dueDate,
                    completed: taskData.completed,
                    userId: taskData.userId,
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
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="formTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control type="text" placeholder="Enter task" name="taskName" value={taskData.taskName} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formTaskDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" name="description" value={taskData.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formTaskPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control as="select" name="priority" value={taskData.priority} onChange={handleChange}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTaskDueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" name="dueDate" value={taskData.dueDate} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formTaskCompleted">
                <Form.Label>Completed</Form.Label>
                <Form.Control as="select" name="completed" value={taskData.completed} onChange={handleChange}>
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
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}