import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Palette, Type, Ruler } from "lucide-react";

interface TokenEditorPanelProps {
  onTokenUpdate?: (category: string, tokens: any) => void;
}

const TokenEditorPanel = ({
  onTokenUpdate = () => {},
}: TokenEditorPanelProps) => {
  const [selectedColor, setSelectedColor] = useState("#6366F1");
  const [fontSize, setFontSize] = useState(16);
  const [spacing, setSpacing] = useState(4);

  return (
    <div className="h-full w-[700px] bg-background p-6 border-r">
      <h2 className="text-2xl font-bold mb-6">Design Tokens</h2>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="spacing" className="flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            Spacing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <Label>Primary Color</Label>
                <div className="flex gap-4 mt-2">
                  <Input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div>
                <Label>Color Palette</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-12 rounded-md cursor-pointer"
                      style={{
                        backgroundColor: `hsl(${i * 36}, 70%, 50%)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="typography">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <Label>Font Size</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    defaultValue={[fontSize]}
                    max={72}
                    min={8}
                    step={1}
                    onValueChange={(value) => setFontSize(value[0])}
                    className="w-[60%]"
                  />
                  <Input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-20"
                  />
                  <span>px</span>
                </div>
              </div>

              <div>
                <Label>Preview</Label>
                <p
                  className="mt-2 p-4 border rounded-md"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="spacing">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <Label>Base Spacing Unit</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    defaultValue={[spacing]}
                    max={16}
                    min={2}
                    step={1}
                    onValueChange={(value) => setSpacing(value[0])}
                    className="w-[60%]"
                  />
                  <Input
                    type="number"
                    value={spacing}
                    onChange={(e) => setSpacing(Number(e.target.value))}
                    className="w-20"
                  />
                  <span>px</span>
                </div>
              </div>

              <div>
                <Label>Spacing Scale Preview</Label>
                <div className="flex gap-4 mt-2">
                  {[1, 2, 4, 8].map((multiplier) => (
                    <div
                      key={multiplier}
                      className="bg-primary/20 rounded-md flex items-center justify-center"
                      style={{
                        width: spacing * multiplier * 4,
                        height: spacing * multiplier * 4,
                      }}
                    >
                      {spacing * multiplier}px
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={() =>
            onTokenUpdate("all", {
              colors: { primary: selectedColor },
              typography: { baseFontSize: fontSize },
              spacing: { baseUnit: spacing },
            })
          }
        >
          Apply Changes
        </Button>
      </div>
    </div>
  );
};

export default TokenEditorPanel;
