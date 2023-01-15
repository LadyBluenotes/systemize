import react from 'react';

// show tasks from the user that are needed to be completed today, this week, this month, etc.
// show tasks from the user that are overdue
// allow tasks to be sorted by due date, priority, etc.
// allow tasks to be filtered by due date, priority, etc.
// allow tasks to be searched by name, description, etc.
// allow tasks to be grouped by due date, priority, etc.

// components should be 
// - Task
// - TaskList
// - TaskFilter
// - TaskSearch
// - TaskGroup

import TaskModal from '../components/Tasks/TaskModal';

export default function Tasks() {

    return (
        <>
            <h1>Hello World 2. </h1>
            <TaskModal />
        </>
    )
}