import React, { useState } from "react";
import TokenWorkspace from "@/components/design-tokens/TokenWorkspace";
import ExportPanel from "@/components/design-tokens/ExportPanel";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const DesignTokensPage = () => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [currentTokens, setCurrentTokens] = useState({
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
  });

  return (
    <div className="min-h-screen w-full bg-background p-6">
      <div className="max-w-[1512px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Design Token Manager</h1>
            <p className="text-muted-foreground mt-2">
              Create, manage, and export your design system tokens
            </p>
          </div>

          <Button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Tokens
          </Button>
        </div>

        <div className="flex justify-center">
          <TokenWorkspace
            onTokensChange={setCurrentTokens}
            defaultLayout={[60, 40]}
          />
        </div>

        <ExportPanel
          open={isExportOpen}
          onOpenChange={setIsExportOpen}
          tokens={currentTokens}
        />
      </div>
    </div>
  );
};

export default DesignTokensPage;
