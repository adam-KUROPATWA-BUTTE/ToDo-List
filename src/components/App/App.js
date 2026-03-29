import React, { useState, useMemo } from 'react';
import backupData from '../../data/backup.json';
import Header from '../Header/Header';
import FilterBar from '../FilterBar/FilterBar';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';
import TaskForm from '../TaskForm/TaskForm';
import { ETAT_TERMINE } from '../../constants/etats';
import './App.css';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [folders, setFolders] = useState([]);
    const [relations, setRelations] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    const [sortBy, setSortBy] = useState('date_echeance'); 
    const [sortOrder, setSortOrder] = useState('desc');
    
    const [filters, setFilters] = useState({
        hideFinished: true,
        hideOldWeek: false,
        selectedFolders: [], 
        selectedStates: [] 
    });

    const handleLoadBackup = () => {
        const rawTasks = backupData.tasks;
        const rawFolders = backupData.categories;
        const rawRelations = backupData.relations;

        const enrichedTasks = rawTasks.map(task => {
            const taskRelations = rawRelations.filter(r => r.tache === task.id);
            const taskFolders = taskRelations
                .map(r => rawFolders.find(f => f.id === r.categorie))
                .filter(folder => folder !== undefined);
            
            return { ...task, folders: taskFolders };
        });

        setTasks(enrichedTasks);
        setFolders(rawFolders);
        setRelations(rawRelations);
        setIsInitialized(true);
    };

    const handleStartEmpty = () => {
        if (window.confirm("Êtes-vous sûr de vouloir repartir de zéro ?")) {
            setTasks([]);
            setFolders([]);
            setRelations([]);
            setIsInitialized(true);
        }
    };

    const processedTasks = useMemo(() => {
        let result = tasks.filter(task => {
            if (filters.hideFinished) {
                // Normalisation pour comparer sans les accents
                const normalizeString = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
                const normalizedTermines = ETAT_TERMINE.map(normalizeString);
                const taskEtat = normalizeString(task.etat);
                
                if (normalizedTermines.includes(taskEtat)) return false;
            }

            if (filters.hideOldWeek && task.date_echeance) {
                const echeanceDate = new Date(task.date_echeance);
                const limitDate = new Date();
                limitDate.setDate(limitDate.getDate() - 7);
                if (echeanceDate < limitDate) return false;
            }

            return true;
        });

        result.sort((a, b) => {
            let valueA = a[sortBy] || '';
            let valueB = b[sortBy] || '';

            if (sortBy.includes('date')) {
                valueA = new Date(valueA).getTime() || 0;
                valueB = new Date(valueB).getTime() || 0;
            } else if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return result;
    }, [tasks, filters, sortBy, sortOrder]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const handleSaveTask = (taskToSave) => {
        if (editingTask) {
            setTasks(tasks.map(t => t.id === taskToSave.id ? taskToSave : t));
        } else {
            setTasks([...tasks, taskToSave]);
        }
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleOpenCreateModal = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    if (!isInitialized) {
        return (
            <div className="app-container init-screen">
                <h1>Bienvenue sur la todolist de Mada</h1>
                <p>Comment souhaitez-vous démarrer votre experiance avec nous ?</p>
                <div className="init-buttons">
                    <button onClick={handleLoadBackup}>Charger le backup (JSON)</button>
                    <button onClick={handleStartEmpty}>Repartir de zéro</button>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <Header tasks={tasks} />
            
            <FilterBar 
                filters={filters} setFilters={setFilters}
                sortBy={sortBy} setSortBy={setSortBy}
                sortOrder={sortOrder} setSortOrder={setSortOrder}
            />
            
            <TaskList tasks={processedTasks} onEditTask={handleOpenEditModal} />
            
            <Footer onOpenModal={handleOpenCreateModal} />

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title={editingTask ? "Modifier la tâche" : "Créer une nouvelle tâche"}
            >
                <TaskForm 
                    key={editingTask ? editingTask.id : 'new'} 
                    initialData={editingTask}
                    onSave={handleSaveTask} 
                    onCancel={() => setIsModalOpen(false)} 
                />
            </Modal>
        </div>
    );
}