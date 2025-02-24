import React, { useState } from "react";
import Sidebar from "./design-tokens/Sidebar";
import TokenEditor from "./design-tokens/TokenEditor";
import PreviewPanel from "./design-tokens/PreviewPanel";

interface HomeProps {
  initialCategory?: string;
}

interface Token {
  id?: string;
  name: string;
  value: string | number;
  type: "color" | "typography" | "spacing";
  [key: string]: any;
}

const Home = ({ initialCategory = "colors" }: HomeProps) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [tokens, setTokens] = useState<Token[]>([
    { id: "1", type: "color", name: "primary", value: "#3b82f6" },
    { id: "2", type: "color", name: "secondary", value: "#10b981" },
    {
      id: "3",
      type: "typography",
      name: "heading-1",
      value: "32px",
      fontFamily: "Inter",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    { id: "4", type: "spacing", name: "space-4", value: 16, unit: "px" },
  ]);

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
  };

  const handleTokensChange = (newTokens: Token[]) => {
    setTokens(newTokens);
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
          <TokenEditor
            activeTab={activeCategory}
            onExport={handleExport}
            tokens={tokens}
            onTokensChange={handleTokensChange}
          />
        </div>
        <div className="w-[500px]">
          <PreviewPanel tokens={tokens} />
        </div>
      </div>
    </div>
  );
};

export default Home;
