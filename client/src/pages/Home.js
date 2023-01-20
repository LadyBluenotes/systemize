import { useEffect, useState } from 'react';
import TaskCard from '../components/Tasks/TaskCard';

export default function Home() {

    const greeting = () => {
        const today = new Date();
        const hour = today.getHours();
        if (hour < 12) {
            return `Good morning!`;
        } else if (hour < 18) {
            return `Good afternoon!`;
        } else {
            return `Good evening!`;
        }
    }

    return (
        <>
            <h1 className='greeting-title'>{greeting()}<span></span></h1>
            <TaskCard />
        </>
    )
}