import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Slider } from "../ui/slider";
import { Plus, Trash2 } from "lucide-react";

interface ColorToken {
  name: string;
  value: string;
  description?: string;
}

interface ColorTokenEditorProps {
  tokens?: ColorToken[];
  onTokensChange?: (tokens: ColorToken[]) => void;
  isOpen?: boolean;
}

const ColorTokenEditor = ({
  tokens = [
    { name: "primary", value: "#3b82f6", description: "Primary brand color" },
    {
      name: "secondary",
      value: "#10b981",
      description: "Secondary brand color",
    },
  ],
  onTokensChange = () => {},
  isOpen = true,
}: ColorTokenEditorProps) => {
  const [selectedTab, setSelectedTab] = useState("picker");
  const [currentColor, setCurrentColor] = useState("#000000");
  const [tokenName, setTokenName] = useState("");
  const [tokenDescription, setTokenDescription] = useState("");
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);

  const addToken = () => {
    if (tokenName && currentColor) {
      const newToken = {
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
    <div className="p-6 bg-background w-full h-full min-h-[600px]">
      <h2 className="text-2xl font-bold mb-6">Color Token Editor</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Tabs
            defaultValue={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="picker">Color Picker</TabsTrigger>
              <TabsTrigger value="manual">Manual Input</TabsTrigger>
            </TabsList>

            <TabsContent value="picker" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Hue</Label>
                  <Slider
                    value={[hue]}
                    max={360}
                    step={1}
                    onValueChange={(value) => {
                      setHue(value[0]);
                      updateHSL();
                    }}
                  />
                </div>
                <div>
                  <Label>Saturation</Label>
                  <Slider
                    value={[saturation]}
                    max={100}
                    step={1}
                    onValueChange={(value) => {
                      setSaturation(value[0]);
                      updateHSL();
                    }}
                  />
                </div>
                <div>
                  <Label>Lightness</Label>
                  <Slider
                    value={[lightness]}
                    max={100}
                    step={1}
                    onValueChange={(value) => {
                      setLightness(value[0]);
                      updateHSL();
                    }}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="manual">
              <div className="space-y-4">
                <div>
                  <Label>Color Value</Label>
                  <Input
                    type="text"
                    value={currentColor}
                    onChange={(e) => setCurrentColor(e.target.value)}
                    placeholder="#000000 or rgb(0,0,0)"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 space-y-4">
            <div
              className="h-24 rounded-md"
              style={{ backgroundColor: currentColor }}
            />

            <div className="space-y-4">
              <div>
                <Label>Token Name</Label>
                <Input
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  placeholder="e.g., primary, secondary"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  value={tokenDescription}
                  onChange={(e) => setTokenDescription(e.target.value)}
                  placeholder="Color token description"
                />
              </div>
              <Button onClick={addToken} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Token
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Color Tokens</h3>
          {tokens.map((token, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="font-medium">{token.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {token.description}
                  </div>
                  <div className="text-sm">{token.value}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-md border"
                    style={{ backgroundColor: token.value }}
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeToken(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorTokenEditor;
