import React from "react";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";

interface PreviewToken {
  type: "color" | "typography" | "spacing";
  name: string;
  value: string | number;
  unit?: string;
}

interface PreviewPanelProps {
  tokens?: PreviewToken[];
}

const defaultTokens: PreviewToken[] = [
  { type: "color", name: "primary", value: "#3b82f6" },
  { type: "color", name: "secondary", value: "#10b981" },
  { type: "typography", name: "heading-1", value: "32px" },
  { type: "spacing", name: "space-4", value: 16, unit: "px" },
];

const PreviewPanel = ({ tokens = defaultTokens }: PreviewPanelProps) => {
  return (
    <div className="p-6 bg-background w-full h-full border-l">
      <h2 className="text-2xl font-bold mb-6">Preview</h2>

      <Tabs defaultValue="components" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[800px] pr-4">
          <TabsContent value="components" className="space-y-8">
            {/* Button Preview */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Buttons</h3>
              <div className="space-y-4">
                <button
                  className="px-4 py-2 rounded-md text-white"
                  style={{
                    backgroundColor: tokens.find((t) => t.name === "primary")
                      ?.value as string,
                  }}
                >
                  Primary Button
                </button>
                <button
                  className="px-4 py-2 rounded-md text-white block"
                  style={{
                    backgroundColor: tokens.find((t) => t.name === "secondary")
                      ?.value as string,
                  }}
                >
                  Secondary Button
                </button>
              </div>
            </Card>

            {/* Card Preview */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Cards</h3>
              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: tokens.find((t) => t.name === "primary")
                    ?.value as string,
                  color: "white",
                }}
              >
                <h4 className="text-lg font-semibold">Card Title</h4>
                <p>Card content with applied tokens</p>
              </div>
            </Card>

            {/* Alert Preview */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Alerts</h3>
              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: tokens.find((t) => t.name === "secondary")
                    ?.value as string,
                  color: "white",
                }}
              >
                <p>Alert message with token styles</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="space-y-8">
            {/* Typography Preview */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Typography Scale</h3>
              <div className="space-y-4">
                {tokens
                  .filter((token) => token.type === "typography")
                  .map((token, index) => (
                    <div key={index} className="space-y-2">
                      <p
                        style={{
                          fontSize: token.value,
                        }}
                      >
                        {token.name}: The quick brown fox jumps over the lazy
                        dog
                      </p>
                    </div>
                  ))}
              </div>
            </Card>

            {/* Spacing Preview */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Spacing Scale</h3>
              <div className="space-y-4">
                {tokens
                  .filter((token) => token.type === "spacing")
                  .map((token, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className="bg-primary"
                        style={{
                          width: `${token.value}${token.unit}`,
                          height: "24px",
                        }}
                      />
                      <span>
                        {token.name}: {token.value}${token.unit}
                      </span>
                    </div>
                  ))}
              </div>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default PreviewPanel;
