import React, { useState } from 'react';
import Section from './Section.jsx';
import { FaPlus } from "react-icons/fa";
// import { TaskProvider, useTasks } from './Utilities.jsx'; 

export default function Main() {
    const [sections, setSections] = useState([{ id: Date.now(), name: "Untitled Section", tasks: [] }]);

    const deleteSection = (id) => {
        setSections((prevSections) => prevSections.filter(section => section.id !== id));
    };

    const addSection = (position, id) => {
        const newSection = { id: Date.now(), name: "Untitled Section", tasks: [] };
        setSections((prevSections) => {
            const index = prevSections.findIndex(section => section.id === id);
            if (position === "right") {
                return [
                    ...prevSections.slice(0, index + 1),
                    newSection,
                    ...prevSections.slice(index + 1),
                ]; 
            } else {
                return [
                    ...prevSections.slice(0, index),
                    newSection,
                    ...prevSections.slice(index),
                ]; 
            }
        });
    };

    return (
        // <TaskProvider>
            <div className="w-full h-full flex flex-row flex-grow pt-20 ">
                <div className="flex flex-row whitespace-nowrap">
                    {sections.map(section => (
                        <div key={section.id} className="inline-block">
                            <Section 
                                sectionName={section.name} 
                                taskss={section.tasks} 
                                onDelete={() => deleteSection(section.id)} 
                                onAddSection={addSection} 
                                sectionId={section.id} 
                                sections={sections}          
                                setSections={setSections}   
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-3">
                    <button 
                        onClick={() => addSection("left", sections[0]?.id)} 
                        className="text-md px-4 py-2 rounded hover:bg-gray-200 transition flex flex-row items-center justify-center font-bold"
                    >
                        <FaPlus className="mr-2" />
                        <span>Add Section</span>
                    </button>
                </div>
            </div>
        // </TaskProvider>
    );
}
