import React from "react";
import { Palette, Type, Ruler, Download, ChevronRight } from "lucide-react";

interface SidebarProps {
  activeCategory?: string;
  onCategorySelect?: (category: string) => void;
}

const categories = [
  {
    id: "colors",
    label: "Colors",
    icon: <Palette className="sidebar__button-icon" />,
  },
  {
    id: "typography",
    label: "Typography",
    icon: <Type className="sidebar__button-icon" />,
  },
  {
    id: "spacing",
    label: "Spacing",
    icon: <Ruler className="sidebar__button-icon" />,
  },
  {
    id: "export",
    label: "Export",
    icon: <Download className="sidebar__button-icon" />,
  },
];

const Sidebar = ({
  activeCategory = "colors",
  onCategorySelect = () => {},
}: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h2>Design Tokens</h2>
        <div className="scroll-area">
          <div className="sidebar__nav">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`sidebar__button ${activeCategory === category.id ? "sidebar__button--active" : ""}`}
                onClick={() => onCategorySelect(category.id)}
              >
                <div className="sidebar__button-content">
                  {category.icon}
                  <span>{category.label}</span>
                </div>
                <ChevronRight
                  className={`sidebar__button-chevron ${activeCategory === category.id ? "sidebar__button-chevron--rotated" : ""}`}
                />
              </button>
            ))}
          </div>

          <div className="sidebar__separator" />

          <div className="sidebar__footer">
            <p>
              Design token management system for maintaining consistent styles
              across your application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
