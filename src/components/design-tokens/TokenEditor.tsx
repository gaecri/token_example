import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ColorTokenEditor from "./ColorTokenEditor";
import TypographyTokenEditor from "./TypographyTokenEditor";
import SpacingTokenEditor from "./SpacingTokenEditor";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface TokenEditorProps {
  activeTab?: string;
  onExport?: (format: "css" | "scss" | "json") => void;
}

const TokenEditor = ({
  activeTab = "colors",
  onExport = () => {},
}: TokenEditorProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleExport = (format: "css" | "scss" | "json") => {
    onExport(format);
  };

  return (
    <div className="w-full h-full bg-background p-6 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Token Editor</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("css")}>
            <Download className="w-4 h-4 mr-2" />
            Export CSS
          </Button>
          <Button variant="outline" onClick={() => handleExport("scss")}>
            <Download className="w-4 h-4 mr-2" />
            Export SCSS
          </Button>
          <Button variant="outline" onClick={() => handleExport("json")}>
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      <Card className="w-full">
        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className="w-full"
        >
          <TabsList className="w-full justify-start border-b">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="spacing">Spacing</TabsTrigger>
          </TabsList>

          <TabsContent value="colors">
            <ColorTokenEditor />
          </TabsContent>

          <TabsContent value="typography">
            <TypographyTokenEditor />
          </TabsContent>

          <TabsContent value="spacing">
            <SpacingTokenEditor />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default TokenEditor;
