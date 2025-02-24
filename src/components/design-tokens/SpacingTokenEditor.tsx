import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Plus, Trash2 } from "lucide-react";

interface SpacingToken {
  id: string;
  name: string;
  value: number;
  unit: "px" | "rem" | "em";
}

interface SpacingTokenEditorProps {
  tokens?: SpacingToken[];
  onTokensChange?: (tokens: SpacingToken[]) => void;
}

const SpacingTokenEditor: React.FC<SpacingTokenEditorProps> = ({
  tokens = [
    { id: "1", name: "spacing-xs", value: 4, unit: "px" },
    { id: "2", name: "spacing-sm", value: 8, unit: "px" },
    { id: "3", name: "spacing-md", value: 16, unit: "px" },
  ],
  onTokensChange = () => {},
}) => {
  const [localTokens, setLocalTokens] = useState<SpacingToken[]>(tokens);

  const addNewToken = () => {
    const newToken: SpacingToken = {
      id: Date.now().toString(),
      name: `spacing-${localTokens.length + 1}`,
      value: 8,
      unit: "px",
    };
    const updatedTokens = [...localTokens, newToken];
    setLocalTokens(updatedTokens);
    onTokensChange(updatedTokens);
  };

  const removeToken = (id: string) => {
    const updatedTokens = localTokens.filter((token) => token.id !== id);
    setLocalTokens(updatedTokens);
    onTokensChange(updatedTokens);
  };

  const updateToken = (id: string, updates: Partial<SpacingToken>) => {
    const updatedTokens = localTokens.map((token) =>
      token.id === id ? { ...token, ...updates } : token,
    );
    setLocalTokens(updatedTokens);
    onTokensChange(updatedTokens);
  };

  return (
    <div className="p-6 bg-background w-full h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Spacing Tokens</h2>
        <Button onClick={addNewToken} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Token
        </Button>
      </div>

      <div className="space-y-4">
        {localTokens.map((token) => (
          <Card key={token.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <Label htmlFor={`name-${token.id}`}>Name</Label>
                  <Input
                    id={`name-${token.id}`}
                    value={token.name}
                    onChange={(e) =>
                      updateToken(token.id, { name: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeToken(token.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>
                  Value: {token.value}
                  {token.unit}
                </Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Slider
                      value={[token.value]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) =>
                        updateToken(token.id, { value: value[0] })
                      }
                    />
                  </div>
                  <select
                    value={token.unit}
                    onChange={(e) =>
                      updateToken(token.id, {
                        unit: e.target.value as "px" | "rem" | "em",
                      })
                    }
                    className="w-20 p-2 border rounded-md"
                  >
                    <option value="px">px</option>
                    <option value="rem">rem</option>
                    <option value="em">em</option>
                  </select>
                </div>
              </div>

              <div
                className="mt-4 border rounded-md"
                style={{
                  width: `${token.value}${token.unit}`,
                  height: "24px",
                  backgroundColor: "hsl(var(--primary))",
                }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SpacingTokenEditor;
