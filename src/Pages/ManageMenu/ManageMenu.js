import React, { useState, useEffect } from 'react';
import { getMenuCategories, createCategory, deleteCategory, createMenuItem, deleteMenuItem } from '../../api/api';
import './ManageMenu.css';

function ManageMenu() {
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');
    const [newItem, setNewItem] = useState({ name: '', price: '', description: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [activeForm, setActiveForm] = useState('');

    useEffect(() => {
        getMenuCategories().then(data => setCategories(data));
    }, []);

    const handleAddCategory = async () => {
        if (currentCategory.trim()) {
            const newCategory = await createCategory({ name: currentCategory });
            setCategories([...categories, newCategory]);
            setCurrentCategory('');
            setActiveForm('');
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category? All items in this category will be deleted.')) {
            await deleteCategory(categoryId);
            setCategories(categories.filter(category => category.id !== categoryId));
        }
    };

    const handleAddItemToCategory = async (categoryId) => {
        if (newItem.name.trim() && newItem.price) {
            const newMenuItem = await createMenuItem({
                name: newItem.name,
                price: parseFloat(newItem.price),
                description: newItem.description, // Include description
                category: categoryId,
            });

            setCategories(categories.map(category =>
                category.id === categoryId
                    ? { ...category, items: [...category.items, newMenuItem] }
                    : category
            ));

            setNewItem({ name: '', price: '', description: '' });
            setActiveForm('');
        }
    };

    const handleDeleteItem = async (categoryId, itemId) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            await deleteMenuItem(itemId);

            setCategories(categories.map(category =>
                category.id === categoryId
                    ? { ...category, items: category.items.filter(item => item.id !== itemId) }
                    : category
            ));
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
                    categories.map(category => (
                        <div key={category.id} className="menu-section">
                            <h3 className="menu-category">
                                {category.name}
                                {isEditing && (
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </h3>
                            <ul className="menu-list">
                                {category.items?.map(item => (
                                    <li key={item.id} className="menu-item">
                                        {item.name} - ${Number(item.price).toFixed(2)}
                                        <p>{item.description}</p> {/* Display description */}
                                        {isEditing && (
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDeleteItem(category.id, item.id)}
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
                                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                            />
                            <input
                                placeholder="Description"
                                value={newItem.description}
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            />
                            <div className="category-selection">
                                <span>Add item to:</span>
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        className="category-select-button"
                                        onClick={() => handleAddItemToCategory(category.id)}
                                    >
                                        {category.name}
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
                            <button className="add-category-button" onClick={handleAddCategory}>
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
