import React, { useState } from 'react';
import './ManageMenu.css';

function ManageMenu({ menuItems, setMenuItems }) {
    const [categories, setCategories] = useState(menuItems); 
    const [currentCategory, setCurrentCategory] = useState('');
    const [newItem, setNewItem] = useState({ name: '', price: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [activeForm, setActiveForm] = useState(''); 

    const addCategory = () => {
        if (currentCategory.trim()) {
            const updatedCategories = [...categories, { category: currentCategory, items: [] }];
            setCategories(updatedCategories);
            setMenuItems(updatedCategories); 
            setCurrentCategory('');
            setActiveForm(''); 
        }
    };

    const addItemToCategory = (categoryIndex) => {
        if (newItem.name.trim() && newItem.price) {
            const updatedCategories = [...categories];
            updatedCategories[categoryIndex].items.push({ ...newItem });
            setCategories(updatedCategories);
            setMenuItems(updatedCategories); 
            setNewItem({ name: '', price: '' });
            setActiveForm(''); 
        }
    };

    const saveMenu = () => {
        setMenuItems(categories);
        alert('Menu saved successfully!');
        setIsEditing(false);
    };

    const deleteItem = (categoryIndex, itemIndex) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            const updatedCategories = [...categories];
            updatedCategories[categoryIndex].items.splice(itemIndex, 1);
            setCategories(updatedCategories);
            setMenuItems(updatedCategories);
        }
    };

    const deleteCategory = (categoryIndex) => {
        if (window.confirm('Are you sure you want to delete this category? All items in this category will be deleted.')) {
            const updatedCategories = [...categories];
            updatedCategories.splice(categoryIndex, 1);
            setCategories(updatedCategories);
            setMenuItems(updatedCategories);
        }
    };

    return (
        <div className="manage-menu-container">
            <h1>Manage Menu</h1>
            <button className="edit-menu-button" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel Edit' : 'Edit Menu'}
            </button>

            <div className="menu-preview">
                {categories.length === 0 ? (
                    <p className="no-items-message">The menu is currently empty. Add items to it.</p>
                ) : (
                    categories.map((section, index) => (
                        <div key={index} className="menu-section">
                            <h3 className="menu-category">
                                {section.category}
                                {isEditing && (
                                    <button
                                        className="delete-button"
                                        onClick={() => deleteCategory(index)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </h3>
                            <ul className="menu-list">
                                {section.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="menu-item">
                                        {item.name} - ${item.price.toFixed(2)}
                                        {isEditing && (
                                            <button
                                                className="delete-button"
                                                onClick={() => deleteItem(index, itemIndex)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>

            {isEditing && (
                <>
                    <div className="layout-buttons">
                        <button className="add-item-button" onClick={() => setActiveForm('addItem')}>
                            Add Item
                        </button>
                        <button className="add-category-button" onClick={() => setActiveForm('addCategory')}>
                            Add Category
                        </button>
                        <button className="save-menu-button" onClick={saveMenu}>
                            Save
                        </button>
                    </div>

                    {activeForm === 'addItem' && (
                        <div className="add-item-form">
                            <input
                                type="text"
                                placeholder="Item Name"
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={newItem.price}
                                onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || '' })}
                            />
                            <div className="category-selection">
                                <span>Add item to:</span>
                                {categories.map((category, index) => (
                                    <button
                                        key={index}
                                        className="category-select-button"
                                        onClick={() => addItemToCategory(index)}
                                    >
                                        {category.category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeForm === 'addCategory' && (
                        <div className="add-category-form">
                            <input
                                type="text"
                                placeholder="Category Name"
                                value={currentCategory}
                                onChange={(e) => setCurrentCategory(e.target.value)}
                            />
                            <button className="add-category-button" onClick={addCategory}>
                                Add Category
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ManageMenu;
