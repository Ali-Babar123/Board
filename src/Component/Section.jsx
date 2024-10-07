import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoEllipsisVertical } from 'react-icons/io5';
import Task from './Task.jsx';
import TopNav from './TopNav.jsx';

export default function Section({ sectionName, onDelete, onAddSection, sectionId, tasks: initialTasks, sections, setSections }) {
    const [isEditing, setIsEditing] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [addDropdownOpen, setAddDropdownOpen] = useState(false);
    const [tasks, setTasks] = useState(initialTasks || []);
    const dropdownRef = useRef(null);
    const addDropdownRef = useRef(null);
    const [currentSectionName, setCurrentSectionName] = useState(sectionName);

    // Adding a new section at the front
    const addSectionAtFront = () => {
        const newSection = { id: Date.now(), name: "Untitled Section" };
        setSections(prevSections => [newSection, ...prevSections]); // Add new section at the front
    };

    const handleNameChange = (event) => {
        setCurrentSectionName(event.target.value);
    };

    const handleNameClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (currentSectionName.trim() === "") {
            setCurrentSectionName("Untitled Section");
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current && !dropdownRef.current.contains(event.target) &&
            addDropdownRef.current && !addDropdownRef.current.contains(event.target)
        ) {
            setDropdownOpen(false);
            setAddDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDropdownOptionClick = (option) => {
        setDropdownOpen(false);
        if (option === "rename") {
            handleNameClick();
        } else if (option === "add to right") {
            onAddSection("right", sectionId);
        } else if (option === "add to left") {
            onAddSection("left", sectionId);
        }
    };

    const handleAddTask = (taskType) => {
        const newTask = { id: Date.now(), name: `Task ${Date.now()}`, type: taskType, };
        setTasks([newTask, ...tasks]);
    };

    const handleRemoveTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleAddTaskToFirstSection = (taskType) => {
        // Create a new task
        const newTask = { id: Date.now(), name: `Task ${Date.now()}`, type: taskType, };

        if (sections.length > 0) {
            const firstSectionId = sections[0].id;

            // Update the tasks for the first section
            setSections(prevSections =>
                prevSections.map(section =>
                    section.id === firstSectionId
                        ? { ...section, task: setTasks([newTask, ...tasks]) } // ensure tasks is an array
                        : section
                )
            );

        }
    };
    
    return (
        <div> <TopNav 
        handleAddTaskToFirstSection={handleAddTaskToFirstSection}
        addSectionAtFront={addSectionAtFront}
    />

            <div className="w-[20rem] h-full flex flex-col p-4">
                {/* TopNav now renders in Section and passes props */}

                <div className="flex justify-between items-center mb-4 h-auto">
                    {isEditing ? (
                        <input
                            type="text"
                            value={currentSectionName}
                            onChange={handleNameChange}
                            onBlur={handleBlur}
                            placeholder="New Section"
                            className="text-md font-bold border-2 border-blue-500 focus:outline-none focus:border-blue-500 px-3 rounded-md"
                        />
                    ) : (
                        <h2
                            onClick={handleNameClick}
                            className="text-md font-bold cursor-pointer px-4"
                        >
                            {currentSectionName}
                        </h2>
                    )}

                    <div className="relative flex items-center space-x-1 ">
                        <button onClick={() => handleAddTask("regular")} className="flex items-center p-2 rounded-md hover:bg-gray-300 transition">
                            <FaPlus />
                        </button>
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={toggleDropdown} className="flex items-center p-2 rounded-md hover:bg-gray-300 transition">
                                <IoEllipsisVertical />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute left-0 top-10 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                                        onClick={() => handleDropdownOptionClick("rename")}
                                    >
                                        <FaEdit className="text-gray-600" />
                                        <span>Rename Section</span>
                                    </button>
                                    <div
                                        className="relative"
                                        ref={addDropdownRef}
                                        onMouseEnter={() => setAddDropdownOpen(true)}
                                        onMouseLeave={() => setAddDropdownOpen(false)}
                                    >
                                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                                            <FaPlus className="text-gray-600" />
                                            <span>Add Section</span>
                                        </button>

                                        {addDropdownOpen && (
                                            <div className="absolute left-full top-0 ml-0 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                                                <button
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                                                    onClick={() => handleDropdownOptionClick("add to right")}
                                                >
                                                    <FaArrowRight className="text-gray-600" />
                                                    <span>Add to Right</span>
                                                </button>
                                                <button
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                                                    onClick={() => handleDropdownOptionClick("add to left")}
                                                >
                                                    <FaArrowLeft className="text-gray-600" />
                                                    <span>Add to Left</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                                        onClick={onDelete}
                                    >
                                        <FaTrashAlt className="text-red-500" />
                                        <span>Delete Section</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="h-[34rem] border-2 border-black bg-gray-200 rounded-md p-3 overflow-y-auto overflow-x-hidden">
                    {tasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            onRemoveTask={handleRemoveTask}
                            taskType={task.type}
                            id={task.id}
                        />
                    ))}

                    <button
                        onClick={() => handleAddTask("regular")}
                        className="w-full py-3 bg-transparent hover:bg-gray-300 transition text-gray-700 rounded flex justify-center items-center"
                    >
                        <FaPlus className="mr-2" />
                        <span>Add Task</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

