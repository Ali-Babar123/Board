import React, { useState, useEffect } from 'react';
import { FaUser, FaCalendarAlt, FaCheck, FaEdit, FaTrashAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, isToday, isAfter } from 'date-fns';
import '../Assets/style.css'

export default function Task({ task, onRemoveTask, taskType, id }) {
  const [taskName, setTaskName] = useState("Untitled Task");
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [dueDate, setDueDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskNameClick = () => {
    setIsEditingTask(true);
  };

  const handleTaskBlur = () => {
    setIsEditingTask(false);
    if (taskName.trim() === "") {
      setTaskName("Untitled Task");
    }
  };

  const handleCheckboxToggle = () => {
    if (taskType !== 'approval') {
      setIsChecked(!isChecked);
    }
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    setShowDropdown(true);
    setDropdownPosition({ x: event.clientX, y: event.clientY });
  };

  const handleEditTask = () => {
    setIsEditingTask(true);
    setShowDropdown(false);
  };

  const handleMarkComplete = () => {
    handleCheckboxToggle();
    setShowDropdown(false);
  };

  const handleRemoveTask = () => {
    onRemoveTask(id);
    setShowDropdown(false);
  };

  const handleClickOutside = () => {
    if (showDropdown) {
      setShowDropdown(false);
    }
  };

  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div
      className="flex flex-col justify-between bg-white border border-gray-50 hover:border-gray-500 transition rounded-lg p-4 my-2 w-full h-28 "
      onContextMenu={handleRightClick}
    >
      <div className="flex items-center space-x-4  ">

        <div className="relative flex items-center">
          <input
            type="checkbox"
            onChange={handleCheckboxToggle}
            checked={isChecked}
            className={`h-4 w-4 cursor-pointer
      ${taskType === 'regular'
                ? 'rounded-full border-2 border-gray-500'
                : taskType === 'milestone'
                  ? 'milestone-checkbox border-2 border-green-500'
                  : 'hidden'
              }`}
          />
          {taskType === 'approval' && <FaUser className="text-gray-600" />}
        </div>


        {isEditingTask ? (
          <input
            type="text"
            value={taskName}
            onChange={handleTaskNameChange}
            onBlur={handleTaskBlur}
            placeholder="New Task"
            className="text-md border-2 border-blue-500 focus:outline-none focus:border-blue-500 px-1 rounded-md"
          />
        ) : (
          <h3 onClick={handleTaskNameClick} className="text-md cursor-pointer">
            {taskName}
          </h3>
        )}
      </div>

      <div className="flex space-x-4 mt-2 text-gray-500">
        <div className="flex items-center justify-center border-dotted border-2 rounded-full p-2 h-8 w-8 border-gray-500">
          <FaUser className="text-gray-600" />
        </div>

        {/* Calendar / Due Date */}
        <div className={`relative flex items-center justify-center p-2 h-8 w-8 rounded-full ${dueDate ? 'border-none' : 'border-dotted border-2 border-gray-500'}`}>
          {dueDate ? (
            <div onClick={toggleCalendar} className="text-red-500 cursor-pointer">
              {format(dueDate, 'd MMM')}
            </div>
          ) : (
            <FaCalendarAlt className="cursor-pointer" onClick={toggleCalendar} />
          )}

          {/* Date picker */}
          {calendarOpen && (
            <div className="absolute z-10 mt-10 ml-20">
              <DatePicker
                selected={dueDate}
                onChange={(date) => {
                  if (date && (isToday(date) || isAfter(date, new Date()))) {
                    setDueDate(date);
                  }
                  setCalendarOpen(false);
                }}
                inline
                filterDate={(date) => isToday(date) || isAfter(date, new Date())}
              />
            </div>
          )}
        </div>
      </div>

      {showDropdown && (
        <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg" style={{ left: dropdownPosition.x, top: dropdownPosition.y }}>
          <button onClick={handleEditTask} className="flex items-center p-2 hover:bg-gray-200 w-full text-left">
            <FaEdit className="mr-2" />
            Edit Task
          </button>
          <button onClick={handleMarkComplete} className="flex items-center p-2 hover:bg-gray-200 w-full text-left">
            <FaCheck className="mr-2" />
            Mark Complete
          </button>
          <button onClick={() => onRemoveTask(task.id)} className="flex items-center p-2 hover:bg-gray-200 w-full text-left">
            <FaTrashAlt className="mr-2 text-red-500" />
            Remove Task
          </button>
        </div>
      )}
    </div>
  );
}
