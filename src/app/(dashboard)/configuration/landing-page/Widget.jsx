"use client";
import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaRegEdit, FaSave } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

const SECTION_TYPE = "SECTION";

const SectionCard = ({ section, index, number, moveSection, updateSection, toggleVisibility }) => {
  const [{ isDragging }, drag] = useDrag({
    type: SECTION_TYPE,
    item: { index, id: section.id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: SECTION_TYPE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveSection(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(section.heading_name);

  const handleSave = () => {
    updateSection(section.id, newName);
    setIsEditing(false);
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`position-relative d-flex align-items-center bg-white shadow-sm rounded p-3 ${isDragging ? "opacity-50" : ""}`}
    >
      {/* Background Counter */}
      <span
        className="position-absolute text-primary fw-bold"
        style={{
          fontSize: "5rem",
          opacity: 0.1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {number}
      </span>

      {/* Left Icon Box with Foreground Number */}
      <div
        className="bg-primary text-white d-flex align-items-center justify-content-center rounded-start p-3"
        style={{ width: "70px", height: "70px", zIndex: 1 }}
      >
        <div className="d-flex flex-column align-items-center">
          {/* <strong style={{ fontSize: "1.2rem" }}>{number}</strong> */}
          <div className="d-flex flex-column gap-1 mt-1">
            <div className="bg-light rounded-pill" style={{ width: "20px", height: "4px" }}></div>
            <div className="bg-light rounded-pill" style={{ width: "20px", height: "4px" }}></div>
            <div className="bg-light rounded-pill" style={{ width: "20px", height: "4px" }}></div>
          </div>
        </div>
      </div>

      {/* Section Content */}
      <div className="flex-grow-1 px-3" style={{ zIndex: 1 }}>
        {isEditing ? (
          <input type="text" className="form-control" value={newName} onChange={(e) => setNewName(e.target.value)} />
        ) : (
          <h5 className="mb-2">{section.heading_name}</h5>
        )}
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={section.active}
            onChange={() => toggleVisibility(section.id)}
            id={`toggle-${section.id}`}
          />
          <label className="form-check-label" htmlFor={`toggle-${section.id}`}>
            Show/Hide Section
          </label>
        </div>
      </div>

      {/* Edit/Save Button */}
      <button className="btn btn-light" onClick={() => setIsEditing(!isEditing)} style={{ zIndex: 1 }}>
        {isEditing ? <FaSave onClick={handleSave} /> : <FaRegEdit />}
      </button>
    </div>
  );
};

export default function Widget() {
  const instituteId = useSelector((state) => state.institute.instituteId);
  const [sections, setSections] = useState([]);
  const [configId, setConfigId] = useState(null);

  const getToken = () => {
    const cookieString = document.cookie.split("; ").find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    const token = getToken();
    const fetchSections = async () => {
      const token = getToken();
      if (!token) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configurations?institute_id=${instituteId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        const data = await response.json();
        setSections(
          Array.isArray(data[0].section_order) ? data[0].section_order : Object.values(data[0].section_order)
        );
        console.log(typeof data[0].section_order);
        setConfigId(data[0].conf_id);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    if (instituteId) fetchSections();
  }, [instituteId]);

  const moveSection = (fromIndex, toIndex) => {
    setSections((prev) => {
      const updatedSections = [...prev];
      const [movedItem] = updatedSections.splice(fromIndex, 1);
      updatedSections.splice(toIndex, 0, movedItem);
      saveSectionsOrder(updatedSections);
      return updatedSections;
    });
  };

  const updateSection = (id, newName) => {
    setSections((prev) => {
      const updatedSections = prev.map((s) =>
        s.id === id ? { ...s, heading_name: newName } : s
      );
      setTimeout(() => saveSectionsOrder(updatedSections), 0);
      return updatedSections;
    });
  };

  const toggleVisibility = (id) => {
    setSections((prev) => {
      const updatedSections = prev.map((s) =>
        s.id === id ? { ...s, active: !s.active } : s
      );
      setTimeout(() => saveSectionsOrder(updatedSections), 0);
      return updatedSections;
    });
  };

  const saveSectionsOrder = async (updatedSections) => {
    const token = getToken();
    if (!token) return;

    const sectionsObject = updatedSections.reduce((acc, section) => {
      acc[section.id] = section;
      return acc;
    }, {});

    try {
      const formData = new FormData();
      formData.append("section_order", JSON.stringify(sectionsObject));

      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configurations?conf_id=${configId}`,
        {
          method: "PATCH",
          headers: { Authorization: token },
          body: formData,
        }
      );
    } catch (error) {
      console.error("Error updating sections:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <DndProvider backend={HTML5Backend}>
        <div className="container mt-4">
          <div className="row g-3">
            {sections.map((section, index) => (
              <div key={section.id} className="col-md-6">
                <SectionCard
                  section={section}
                  index={index}
                  number={index + 1}
                  moveSection={moveSection}
                  updateSection={updateSection}
                  toggleVisibility={toggleVisibility}
                />
              </div>
            ))}
          </div>
        </div>
      </DndProvider>
    </>
  );
}
