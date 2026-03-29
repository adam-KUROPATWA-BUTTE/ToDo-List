import React, { useState } from 'react';
import './TaskItem.css';

export default function TaskItem({ task, onEditTask }) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const formattedDate = new Date(task.date_echeance).toLocaleDateString('fr-FR');
    const displayedFolders = isExpanded ? (task.folders || []) : (task.folders ? task.folders.slice(0, 2) : []);

    return (
        <div className={`task-item ${isExpanded ? 'expanded' : ''}`}>
            <div className="task-header" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="task-main-info">
                    <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
                    <h3>{task.title}</h3>
                    <span className="task-date">🗓️ {formattedDate}</span>
                    <span className={`task-status status-${task.etat ? task.etat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : 'inconnu'}`}>
                        {task.etat}
                    </span>
                </div>
                
                <div className="task-folders">
                    {displayedFolders.map(folder => (
                        <span key={folder.id} className="folder-badge" style={{ backgroundColor: folder.color || '#ccc' }}>
                            {folder.icon && <span className="folder-icon">{folder.icon}</span>}
                            {folder.title}
                        </span>
                    ))}
                    {!isExpanded && task.folders && task.folders.length > 2 && (
                        <span className="folder-badge extra-folders">+{task.folders.length - 2}</span>
                    )}
                </div>
            </div>

            {isExpanded && (
                <div className="task-details">
                    <hr />
                    <div className="task-description">
                        <strong>Description :</strong>
                        <p>{task.description ? task.description : <span className="empty-text">Aucune description fournie.</span>}</p>
                    </div>
                    
                    {task.equipiers && task.equipiers.length > 0 && (
                        <div className="task-team">
                            <strong>Équipe :</strong> {task.equipiers.map(e => e.name).join(', ')}
                        </div>
                    )}

                    <div className="task-actions">
                        <button className="edit-btn" onClick={(e) => { e.stopPropagation(); onEditTask(task); }}>
                            ✏️ Modifier la tâche
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}