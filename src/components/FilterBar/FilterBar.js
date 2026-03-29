import React from 'react';
import './FilterBar.css';

export default function FilterBar({ filters, setFilters, sortBy, setSortBy, sortOrder, setSortOrder }) {
    return (
        <div className="filter-bar">
            <div className="filter-group">
                <label>Trier par :</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="date_echeance">Date d'échéance</option>
                    <option value="date_creation">Date de création</option>
                    <option value="title">Nom</option>
                </select>
                <button className="sort-order-btn" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    {sortOrder === 'asc' ? '⬆️ Croissant' : '⬇️ Décroissant'}
                </button>
            </div>

            <div className="filter-group">
                <label>Filtres :</label>
                <label className="checkbox-label">
                    <input 
                        type="checkbox" 
                        checked={filters.hideFinished} 
                        onChange={(e) => setFilters({...filters, hideFinished: e.target.checked})}
                    />
                    Masquer terminés
                </label>
                <label className="checkbox-label">
                    <input 
                        type="checkbox" 
                        checked={filters.hideOldWeek} 
                        onChange={(e) => setFilters({...filters, hideOldWeek: e.target.checked})}
                    />
                    Masquer Superieru 1 semaine
                </label>
            </div>
        </div>
    );
}