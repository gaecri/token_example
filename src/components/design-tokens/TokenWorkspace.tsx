import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import TokenEditorPanel from "./TokenEditorPanel";
import LivePreviewPanel from "./LivePreviewPanel";

interface TokenWorkspaceProps {
  onTokensChange?: (tokens: any) => void;
  defaultLayout?: number[];
}

const TokenWorkspace = ({
  onTokensChange = () => {},
  defaultLayout = [60, 40],
}: TokenWorkspaceProps) => {
  const [tokens, setTokens] = useState({
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

  const handleTokenUpdate = (category: string, newTokens: any) => {
    const updatedTokens = {
      ...tokens,
      ...newTokens,
    };
    setTokens(updatedTokens);
    onTokensChange(updatedTokens);
  };

  return (
    <div className="h-[900px] w-[1200px] bg-background border rounded-lg overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <ResizablePanel defaultSize={defaultLayout[0]}>
          <TokenEditorPanel onTokenUpdate={handleTokenUpdate} />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={defaultLayout[1]}>
          <LivePreviewPanel tokens={tokens} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default TokenWorkspace;
