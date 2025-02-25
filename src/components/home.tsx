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
    const exportData = {
      css: generateCSSExport(tokens),
      scss: generateSCSSExport(tokens),
      json: generateJSONExport(tokens),
    }[format];

    const blob = new Blob([exportData], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `design-tokens.${format}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const generateCSSExport = (tokens: Token[]) => {
    const cssVars = tokens
      .map((token) => {
        if (token.type === "color") {
          return `  --${token.name}: ${token.value};`;
        } else if (token.type === "typography") {
          return `  --${token.name}-size: ${token.fontSize}px;
  --${token.name}-weight: ${token.fontWeight};
  --${token.name}-line-height: ${token.lineHeight};`;
        } else if (token.type === "spacing") {
          return `  --${token.name}: ${token.value}${token.unit};`;
        }
      })
      .join("\n");

    return `:root {\n${cssVars}\n}`;
  };

  const generateSCSSExport = (tokens: Token[]) => {
    const scssVars = tokens
      .map((token) => {
        if (token.type === "color") {
          return `${token.name}: ${token.value};`;
        } else if (token.type === "typography") {
          return `${token.name}: (\n  size: ${token.fontSize}px,\n  weight: ${token.fontWeight},\n  line-height: ${token.lineHeight}\n);`;
        } else if (token.type === "spacing") {
          return `${token.name}: ${token.value}${token.unit};`;
        }
      })
      .join("\n\n");

    return scssVars;
  };

  const generateJSONExport = (tokens: Token[]) => {
    const tokensByType = tokens.reduce(
      (acc, token) => {
        if (!acc[token.type]) {
          acc[token.type] = [];
        }
        acc[token.type].push(token);
        return acc;
      },
      {} as Record<string, Token[]>,
    );

    return JSON.stringify(tokensByType, null, 2);
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
