import React, { useState } from "react";
import ColorTokenEditor from "./ColorTokenEditor";
import TypographyTokenEditor from "./TypographyTokenEditor";
import SpacingTokenEditor from "./SpacingTokenEditor";
import { Download } from "lucide-react";

interface Token {
  id?: string;
  name: string;
  value: string | number;
  type: "color" | "typography" | "spacing";
  [key: string]: any;
}

interface TokenEditorProps {
  activeTab?: string;
  onExport?: (format: "css" | "scss" | "json") => void;
  tokens?: Token[];
  onTokensChange?: (tokens: Token[]) => void;
}

const TokenEditor = ({
  activeTab = "colors",
  onExport = () => {},
  tokens = [],
  onTokensChange = () => {},
}: TokenEditorProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleExport = (format: "css" | "scss" | "json") => {
    onExport(format);
  };

  return (
    <div className="token-editor">
      <div className="token-editor__header">
        <h1 className="token-editor__header-title">Token Editor</h1>
        <div className="token-editor__export-buttons">
          <button
            className="button button--outline"
            onClick={() => handleExport("css")}
          >
            <Download className="button__icon" />
            Export CSS
          </button>
          <button
            className="button button--outline"
            onClick={() => handleExport("scss")}
          >
            <Download className="button__icon" />
            Export SCSS
          </button>
          <button
            className="button button--outline"
            onClick={() => handleExport("json")}
          >
            <Download className="button__icon" />
            Export JSON
          </button>
        </div>
      </div>

      <div className="card">
        <div className="token-editor__tabs">
          <div className="token-editor__tabs-list">
            <button
              className={`token-editor__tabs-trigger ${currentTab === "colors" ? "token-editor__tabs-trigger--active" : ""}`}
              onClick={() => setCurrentTab("colors")}
            >
              Colors
            </button>
            <button
              className={`token-editor__tabs-trigger ${currentTab === "typography" ? "token-editor__tabs-trigger--active" : ""}`}
              onClick={() => setCurrentTab("typography")}
            >
              Typography
            </button>
            <button
              className={`token-editor__tabs-trigger ${currentTab === "spacing" ? "token-editor__tabs-trigger--active" : ""}`}
              onClick={() => setCurrentTab("spacing")}
            >
              Spacing
            </button>
          </div>

          <div className="token-editor__tabs-content">
            {currentTab === "colors" && (
              <ColorTokenEditor
                tokens={tokens.filter((t) => t.type === "color")}
                onTokensChange={(newTokens) => {
                  const updatedTokens = tokens
                    .filter((t) => t.type !== "color")
                    .concat(newTokens);
                  onTokensChange(updatedTokens);
                }}
              />
            )}

            {currentTab === "typography" && (
              <TypographyTokenEditor
                tokens={tokens.filter((t) => t.type === "typography")}
                onTokensChange={(newTokens) => {
                  const updatedTokens = tokens
                    .filter((t) => t.type !== "typography")
                    .concat(newTokens);
                  onTokensChange(updatedTokens);
                }}
              />
            )}

            {currentTab === "spacing" && (
              <SpacingTokenEditor
                tokens={tokens.filter((t) => t.type === "spacing")}
                onTokensChange={(newTokens) => {
                  const updatedTokens = tokens
                    .filter((t) => t.type !== "spacing")
                    .concat(newTokens);
                  onTokensChange(updatedTokens);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenEditor;
