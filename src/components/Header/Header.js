import React from 'react';
import { ETAT_TERMINE } from '../../constants/etats';
import './Header.css';

export default function Header({ tasks }) {
    const totalTasks = tasks.length;

    const normalizeString = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
    const normalizedTermines = ETAT_TERMINE.map(normalizeString);

    const unfinishedTasks = tasks.filter(task => {
        return !normalizedTermines.includes(normalizeString(task.etat));
    }).length;

    const statsByState = tasks.reduce((acc, task) => {
        const etat = task.etat || 'Inconnu';
        acc[etat] = (acc[etat] || 0) + 1;
        return acc;
    }, {});

    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FDCB6E', '#6C5CE7'];
    let gradientStops = [];
    let currentPercentage = 0;
    
    Object.keys(statsByState).forEach((etat, index) => {
        const percentage = (statsByState[etat] / totalTasks) * 100;
        const color = colors[index % colors.length];
        gradientStops.push(`${color} ${currentPercentage}% ${currentPercentage + percentage}%`);
        currentPercentage += percentage;
    });

    return (
        <header className="app-header">
            <div className="header-stats">
                <h2>Tableau de bord</h2>
                <div className="stats-numbers">
                    <div className="stat-box">
                        <span className="stat-value">{totalTasks}</span>
                        <span className="stat-label">Tâches au total</span>
                    </div>
                    <div className="stat-box highlight">
                        <span className="stat-value">{unfinishedTasks}</span>
                        <span className="stat-label">Tâches en cours</span>
                    </div>
                </div>
            </div>

            {totalTasks > 0 && (
                <div className="header-pie-chart">
                    <div className="pie-chart" style={{ background: `conic-gradient(${gradientStops.join(', ')})` }}></div>
                    <div className="pie-legend">
                        {Object.entries(statsByState).map(([etat, count], index) => (
                            <div key={etat} className="legend-item">
                                <span className="color-dot" style={{ backgroundColor: colors[index % colors.length] }}></span>
                                {etat} ({count})
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}