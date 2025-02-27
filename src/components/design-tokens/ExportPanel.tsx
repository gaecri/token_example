import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code, FileJson, FileCode, FileText } from "lucide-react";

interface ExportPanelProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  tokens?: {
    colors?: Record<string, string>;
    typography?: Record<string, any>;
    spacing?: Record<string, number>;
  };
}

const ExportPanel = ({
  open = true,
  onOpenChange = () => {},
  tokens = {
    colors: { primary: "#3b82f6", secondary: "#6b7280" },
    typography: { baseFontSize: 16 },
    spacing: { baseUnit: 4 },
  },
}: ExportPanelProps) => {
  const [selectedFormat, setSelectedFormat] = useState("css");

  const getFormattedTokens = () => {
    switch (selectedFormat) {
      case "css":
        return `:root {
  --color-primary: ${tokens.colors?.primary};
  --color-secondary: ${tokens.colors?.secondary};
  --typography-base-size: ${tokens.typography?.baseFontSize}px;
  --spacing-base: ${tokens.spacing?.baseUnit}px;
}`;
      case "scss":
        return `$color-primary: ${tokens.colors?.primary};
$color-secondary: ${tokens.colors?.secondary};
$typography-base-size: ${tokens.typography?.baseFontSize}px;
$spacing-base: ${tokens.spacing?.baseUnit}px;`;
      case "json":
        return JSON.stringify(tokens, null, 2);
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export Design Tokens</DialogTitle>
          <DialogDescription>
            Export your design tokens in different formats for use in your
            projects.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="css"
          value={selectedFormat}
          onValueChange={setSelectedFormat}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="css" className="flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              CSS Variables
            </TabsTrigger>
            <TabsTrigger value="scss" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              SCSS
            </TabsTrigger>
            <TabsTrigger value="json" className="flex items-center gap-2">
              <FileJson className="h-4 w-4" />
              JSON
            </TabsTrigger>
          </TabsList>

          <Card className="mt-4 p-4">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <pre className="font-mono text-sm">
                <code>{getFormattedTokens()}</code>
              </pre>
            </ScrollArea>
          </Card>
        </Tabs>

        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(getFormattedTokens());
            }}
          >
            <Code className="mr-2 h-4 w-4" />
            Copy to Clipboard
          </Button>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportPanel;
