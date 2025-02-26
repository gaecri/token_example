import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface ColorToken {
  id?: string;
  type: "color";
  name: string;
  value: string;
  description?: string;
}

interface ColorTokenEditorProps {
  tokens?: ColorToken[];
  onTokensChange?: (tokens: ColorToken[]) => void;
}

const ColorTokenEditor = ({
  tokens = [
    {
      id: "1",
      type: "color",
      name: "primary",
      value: "#3b82f6",
      description: "Primary brand color",
    },
    {
      id: "2",
      type: "color",
      name: "secondary",
      value: "#10b981",
      description: "Secondary brand color",
    },
  ],
  onTokensChange = () => {},
}: ColorTokenEditorProps) => {
  const [currentColor, setCurrentColor] = useState("#000000");
  const [tokenName, setTokenName] = useState("");
  const [tokenDescription, setTokenDescription] = useState("");
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);

  const addToken = () => {
    if (tokenName && currentColor) {
      const newToken = {
        id: Math.random().toString(),
        type: "color" as const,
        name: tokenName,
        value: currentColor,
        description: tokenDescription,
      };
      onTokensChange([...tokens, newToken]);
      setTokenName("");
      setTokenDescription("");
    }
  };

  const removeToken = (index: number) => {
    const newTokens = tokens.filter((_, i) => i !== index);
    onTokensChange(newTokens);
  };

  const updateHSL = () => {
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    setCurrentColor(color);
  };

  return (
    <div className="color-editor">
      <div className="color-editor__grid">
        <div className="color-editor__picker">
          <div
            className="color-editor__picker-preview"
            style={{ backgroundColor: currentColor }}
          />
          <div className="color-editor__picker-controls">
            <div className="form-group">
              <label className="label">Hue</label>
              <input
                type="range"
                className="slider"
                value={hue}
                max={360}
                onChange={(e) => {
                  setHue(Number(e.target.value));
                  updateHSL();
                }}
              />
            </div>

            <div className="form-group">
              <label className="label">Saturation</label>
              <input
                type="range"
                className="slider"
                value={saturation}
                max={100}
                onChange={(e) => {
                  setSaturation(Number(e.target.value));
                  updateHSL();
                }}
              />
            </div>

            <div className="form-group">
              <label className="label">Lightness</label>
              <input
                type="range"
                className="slider"
                value={lightness}
                max={100}
                onChange={(e) => {
                  setLightness(Number(e.target.value));
                  updateHSL();
                }}
              />
            </div>

            <div className="form-group">
              <label className="label">Token Name</label>
              <input
                type="text"
                className="input"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                placeholder="e.g., primary, secondary"
              />
            </div>

            <div className="form-group">
              <label className="label">Description</label>
              <input
                type="text"
                className="input"
                value={tokenDescription}
                onChange={(e) => setTokenDescription(e.target.value)}
                placeholder="Color token description"
              />
            </div>

            <button className="button button--primary" onClick={addToken}>
              <Plus className="button__icon" />
              Add Token
            </button>
          </div>
        </div>

        <div className="color-editor__tokens">
          <div className="color-editor__tokens-header">
            <h3>Color Tokens</h3>
          </div>
          <div className="color-editor__tokens-list">
            {tokens.map((token, index) => (
              <div key={token.id} className="card color-editor__token">
                <div className="color-editor__token-info">
                  <div className="color-editor__token-name">{token.name}</div>
                  <div className="color-editor__token-description">
                    {token.description}
                  </div>
                  <div className="color-editor__token-value">{token.value}</div>
                </div>
                <div className="color-editor__token-preview">
                  <div
                    className="color-editor__token-preview-color"
                    style={{ backgroundColor: token.value }}
                  />
                  <button
                    className="button button--ghost"
                    onClick={() => removeToken(index)}
                  >
                    <Trash2 className="button__icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorTokenEditor;
