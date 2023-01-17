import react from 'react';

import TaskModal from '../components/Tasks/TaskModal';
import TaskList from '../components/Tasks/TaskList';

export default function Tasks() {

    return (
        <>
            <h1 className='task-page-title'>Tasks</h1>
            <div className='task-page-functions'>
                <TaskModal />
            </div>
            <div className='task-list-container'>
                <TaskList />
            </div>
            
        </>
    )
}