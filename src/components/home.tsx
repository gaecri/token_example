import React, { useState } from "react";
import Sidebar from "./design-tokens/Sidebar";
import TokenEditor from "./design-tokens/TokenEditor";
import PreviewPanel from "./design-tokens/PreviewPanel";

interface HomeProps {
  initialCategory?: string;
}

const Home = ({ initialCategory = "colors" }: HomeProps) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
  };

  const handleExport = (format: "css" | "scss" | "json") => {
    // Placeholder for export functionality
    console.log(`Exporting in ${format} format`);
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
      />
      <div className="flex-1 flex">
        <div className="flex-1">
          <TokenEditor activeTab={activeCategory} onExport={handleExport} />
        </div>
        <div className="w-[500px]">
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
};

export default Home;
