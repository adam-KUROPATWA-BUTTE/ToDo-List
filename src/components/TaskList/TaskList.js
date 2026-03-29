import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import './TaskList.css';

export default function TaskList({ tasks, onEditTask }) {
    if (tasks.length === 0) {
        return <div className="task-list-empty">Aucune tache a afficher pour ses critères.</div>;
    }

    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} onEditTask={onEditTask} />
            ))}
        </div>
    );
}