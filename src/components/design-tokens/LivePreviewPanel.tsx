import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

interface LivePreviewPanelProps {
  tokens?: {
    colors?: Record<string, string>;
    typography?: Record<string, any>;
    spacing?: Record<string, string>;
  };
}

const LivePreviewPanel = ({
  tokens = {
    colors: {
      primary: "#3b82f6",
      secondary: "#6b7280",
      background: "#ffffff",
      text: "#111827",
    },
    typography: {
      heading: {
        fontFamily: "Inter",
        fontSize: "24px",
        fontWeight: "600",
      },
      body: {
        fontFamily: "Inter",
        fontSize: "16px",
        fontWeight: "400",
      },
    },
    spacing: {
      small: "0.5rem",
      medium: "1rem",
      large: "2rem",
    },
  },
}: LivePreviewPanelProps) => {
  return (
    <div className="h-full w-full bg-background p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Live Preview</h2>
        <p className="text-muted-foreground">
          Preview your design tokens in common UI components
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-150px)]">
        <div className="space-y-8">
          {/* Colors Preview */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(tokens.colors || {}).map(([name, value]) => (
                <div key={name} className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-md border"
                    style={{ backgroundColor: value }}
                  />
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Typography Preview */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Typography</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-2">Heading</h4>
                <div
                  style={tokens.typography?.heading}
                  className="p-4 border rounded-md"
                >
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">Body</h4>
                <div
                  style={tokens.typography?.body}
                  className="p-4 border rounded-md"
                >
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
            </div>
          </Card>

          {/* Spacing Preview */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Spacing</h3>
            <div className="space-y-6">
              <div>
                <Label>Spacing Scale</Label>
                <div className="flex items-end gap-4 mt-2">
                  {Object.entries(tokens.spacing || {}).map(([name, value]) => (
                    <div key={name} className="text-center">
                      <div
                        className="bg-primary/20 border border-primary"
                        style={{ width: value, height: value }}
                      />
                      <p className="text-sm mt-2">{name}</p>
                      <p className="text-xs text-muted-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default LivePreviewPanel;
