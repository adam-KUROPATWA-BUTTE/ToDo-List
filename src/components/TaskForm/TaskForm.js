import React, { useState } from 'react';
import { ETATS } from '../../constants/etats';
import './TaskForm.css';

export default function TaskForm({ onSave, onCancel, initialData }) {
    const [title, setTitle] = useState(initialData ? initialData.title : '');
    const [description, setDescription] = useState(initialData ? initialData.description : '');
    const [dateEcheance, setDateEcheance] = useState(initialData ? initialData.date_echeance : '');
    const [etat, setEtat] = useState(initialData ? initialData.etat : ETATS.NOUVEAU);
    const [equipiersInput, setEquipiersInput] = useState(
        initialData && initialData.equipiers ? initialData.equipiers.map(e => e.name).join(', ') : ''
    );
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.trim().length < 5) {
            setError("L'intitulé doit faire au moins 5 caractères."); return;
        }
        if (!dateEcheance) {
            setError("La date d'échéance est obligatoire."); return;
        }

        const equipiersArray = equipiersInput.split(',').map(e => e.trim()).filter(e => e.length > 0).map(name => ({ name }));

        const taskToSave = {
            id: initialData ? initialData.id : Date.now(), 
            title: title.trim(),
            description: description.trim(),
            date_creation: initialData ? initialData.date_creation : new Date().toISOString().split('T')[0],
            date_echeance: dateEcheance,
            etat: etat,
            equipiers: equipiersArray,
            folders: initialData ? initialData.folders : [] 
        };

        onSave(taskToSave);
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}
            <div className="form-group">
                <label>Intitulé (min 5 car.) *</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3"></textarea>
            </div>
            <div className="form-group">
                <label>Date d'échéance *</label>
                <input type="date" value={dateEcheance} onChange={(e) => setDateEcheance(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Statut</label>
                <select value={etat} onChange={(e) => setEtat(e.target.value)}>
                    {Object.values(ETATS).map(statut => <option key={statut} value={statut}>{statut}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label>Équipier</label>
                <input type="text" value={equipiersInput} onChange={(e) => setEquipiersInput(e.target.value)} />
            </div>
            <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={onCancel}>Annuler</button>
                <button type="submit" className="btn-submit">{initialData ? 'Enregistrer les modifications' : 'Créer la tâche'}</button>
            </div>
        </form>
    );
}