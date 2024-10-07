import React, { useState, useEffect, useRef } from 'react';
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { FaObjectUngroup } from "react-icons/fa6";
import { buttonStyles } from './Utilities.jsx';

export default function TopNav({ handleAddTaskToFirstSection, addSectionAtFront }) {
    const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setMainDropdownOpen(false);
            setFilterDropdownOpen(false);
            setSortDropdownOpen(false);
            setGroupDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = (dropdown) => {
        setMainDropdownOpen(false);
        setFilterDropdownOpen(false);
        setSortDropdownOpen(false);
        setGroupDropdownOpen(false);

        switch (dropdown) {
            case 'main':
                setMainDropdownOpen(!mainDropdownOpen);
                break;
            case 'filter':
                setFilterDropdownOpen(!filterDropdownOpen);
                break;
            case 'sort':
                setSortDropdownOpen(!sortDropdownOpen);
                break;
            case 'group':
                setGroupDropdownOpen(!groupDropdownOpen);
                break;
            default:
                break;
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-white border-b-2 border-black h-auto w-full">
            <div className="flex items-center">
                <button
                    className="flex items-center bg-white text-black rounded-l border border-gray-300 border-r-0 hover:bg-gray-100 transition-all h-9 px-4"
                    onClick={() => handleAddTaskToFirstSection("regular")}
                >
                    <FaPlus className="mr-1" />
                    <span className="text-sm ml-2">Add Task</span>
                </button>

                <div className="relative" ref={dropdownRef}>
                    <button
                        className="flex items-center justify-center bg-white text-black rounded-r border border-gray-300 hover:bg-gray-100 transition-all h-9 px-3"
                        onClick={() => toggleDropdown('main')}
                    >
                        <IoIosArrowDown />
                    </button>

                    {mainDropdownOpen && (
                        <div className="flex flex-col absolute left-0 top-10 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => { addSectionAtFront(); setMainDropdownOpen(false); }}
                            >
                                Add Section
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => { handleAddTaskToFirstSection("milestone"); setMainDropdownOpen(false); }}
                            >
                                Add Milestone
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => { handleAddTaskToFirstSection("approval"); setMainDropdownOpen(false); }}
                            >
                                Add Approval
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex space-x-3">
                {/* Filter Dropdown */}
                <div className="relative">
                    <button className={buttonStyles} onClick={() => toggleDropdown('filter')}>
                        <IoFilterOutline className="text-xl" />
                        <span className="text-sm">Filter</span>
                    </button>
                    {filterDropdownOpen && (
                        <div className="flex flex-col absolute left-0 top-10 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100" >Incomplete Tasks</button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100" >Completed Tasks</button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100" >Due This Week</button>
                        </div>
                    )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                    <button className={buttonStyles} onClick={() => toggleDropdown('sort')}>
                        <BiSortAlt2 className="text-xl" />
                        <span className="text-sm">Sort</span>
                    </button>
                    {sortDropdownOpen && (
                        <div className="flex flex-col absolute left-0 top-10 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100" >Start Date</button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100" >Due Date</button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100" >Alphabetical</button>
                        </div>
                    )}
                </div>

                {/* Group Dropdown */}
                <div className="relative">
                    <button className={buttonStyles} onClick={() => toggleDropdown('group')}>
                        <FaObjectUngroup className="text-xl" />
                        <span className="text-sm">Group</span>
                    </button>
                    {groupDropdownOpen && (
                        <div style={{ transform: 'translateX(-20%)' }} className="flex flex-col absolute left-0 top-10 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100" >Group By Section</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
