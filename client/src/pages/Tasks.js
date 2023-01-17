import react from 'react';

import TaskModal from '../components/Tasks/TaskModal';
import TaskList from '../components/Tasks/TaskList';

export default function Tasks() {

    return (
        <>
            <h1>Tasks</h1>
            <TaskModal />
            <TaskList />
        </>
    )
}