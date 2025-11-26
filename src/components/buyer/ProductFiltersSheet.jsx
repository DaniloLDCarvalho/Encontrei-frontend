import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import { SlidersHorizontal, X , Heart} from "lucide-react";
import './ProductFiltersSheet.css';
import './ProductFilterSwitch.css'

export const ProductFiltersSheet = ({
                                        availableOptions,
                                        filters,
                                        toggleFilter,
                                        setPriceRange,
                                        clearFilters,
                                        totalResults
                                    }) => {

    const handleMinPrice = (e) => {
        const val = Number(e.target.value);
        setPriceRange([val, filters.priceRange[1]]);
    };

    const handleMaxPrice = (e) => {
        const val = Number(e.target.value);
        setPriceRange([filters.priceRange[0], val]);
    };

    const FilterSection = ({ title, options, type }) => (
        <div className="filter-section">
            <span className="filter-title">{title}</span>
            <div className="filter-options">
                {options.map((option) => {
                    const isActive = filters[type].includes(option);
                    return (
                        <button
                            key={option}
                            onClick={() => toggleFilter(type, option)}
                            className={`filter-chip ${isActive ? 'active' : ''}`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    const hasActiveFilters = filters.categories.length > 0 || filters.sizes.length > 0 || filters.colors.length > 0;

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="trigger-btn" aria-label="Abrir filtros">
                    <SlidersHorizontal className="w-6 h-6 text-white" />
                    {hasActiveFilters && <span className="trigger-badge"></span>}
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />

                <Dialog.Content className="DialogContent">

                    {/* Header */}
                    <div className="sheet-header">
                        <Dialog.Title className="sheet-title">
                            Filtros <small style={{fontSize: '0.8rem', fontWeight: 400}}>({totalResults})</small>
                        </Dialog.Title>

                        <Dialog.Close asChild>
                            <button style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                                <X size={24} color="#666" />
                            </button>
                        </Dialog.Close>
                    </div>

                    <div className="sheet-body">
                        <div className="filter-section">
                            <span className="filter-title">Faixa de Preço (R$)</span>
                            <div className="price-inputs">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.priceRange[0]}
                                    onChange={handleMinPrice}
                                    min={0}
                                />
                                <span style={{color: '#999'}}>-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.priceRange[1]}
                                    onChange={handleMaxPrice}
                                    max={availableOptions.maxPrice}
                                />
                            </div>
                        </div>

                        <hr style={{border: 0, borderTop: '1px solid #eee', margin: '16px 0'}}/>

                        <div className="filter-row-switch">
                            <label className="filter-row-label" htmlFor="fav-switch">
                                <Heart size={18} className="text-purple-600 fill-purple-600"/>
                                Favoritos
                            </label>

                            <Switch.Root
                                className="SwitchRoot"
                                id="fav-switch"
                                checked={filters.onlyFavorites}
                                onCheckedChange={(checked) => toggleFilter('onlyFavorites', checked)}
                            >
                                <Switch.Thumb className="SwitchThumb"/>
                            </Switch.Root>
                        </div>

                        <hr style={{border: 0, borderTop: '1px solid #eee', margin: '16px 0'}}/>

                        <FilterSection
                            title="Categorias"
                            options={availableOptions.categories}
                            type="categories"
                        />

                        <hr style={{border: 0, borderTop: '1px solid #eee', margin: '16px 0'}}/>

                        <FilterSection
                            title="Cores"
                            options={availableOptions.colors}
                            type="colors"
                        />

                        <hr style={{border: 0, borderTop: '1px solid #eee', margin: '16px 0'}}/>

                        <FilterSection
                            title="Tamanhos"
                            options={availableOptions.sizes}
                            type="sizes"
                        />
                    </div>

                    <div className="sheet-footer">
                        <button
                            className="btn-full btn-outline"
                            onClick={clearFilters}
                        >
                            Limpar
                        </button>

                        <Dialog.Close asChild>
                            <button className="btn-full btn-primary">
                                Ver Resultados
                            </button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};