import React from 'react';
import './Footer.css';

export default function Footer({ onOpenModal }) {
    return (
        <footer className="app-footer">
            <button className="add-button" onClick={onOpenModal} title="Ajouter une tâche">+</button>
        </footer>
    );
}
