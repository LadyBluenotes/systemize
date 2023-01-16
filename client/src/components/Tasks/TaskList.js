import react, {useState} from 'react';
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


    return(
        <Card>
        <Card.Body>
          <Card.Title>
            <h4>Task</h4> 
                <DropdownButton id="dropdown-basic-button" title={"Not Completed"}>
                    <Dropdown.Item>Not Completed</Dropdown.Item>
                    <Dropdown.Item>In Progress</Dropdown.Item>
                    <Dropdown.Item>Completed</Dropdown.Item>
                </DropdownButton>
          </Card.Title>
          <Card.Text>Description</Card.Text>
          <Card.Text>Priority: Low</Card.Text>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </Card.Body>
      </Card>
    )

}