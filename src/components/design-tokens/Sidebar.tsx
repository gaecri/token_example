import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Palette, Type, Ruler, Download, ChevronRight } from "lucide-react";

interface SidebarProps {
  activeCategory?: string;
  onCategorySelect?: (category: string) => void;
}

const categories = [
  { id: "colors", label: "Colors", icon: <Palette className="w-5 h-5" /> },
  { id: "typography", label: "Typography", icon: <Type className="w-5 h-5" /> },
  { id: "spacing", label: "Spacing", icon: <Ruler className="w-5 h-5" /> },
  { id: "export", label: "Export", icon: <Download className="w-5 h-5" /> },
];

const Sidebar = ({
  activeCategory = "colors",
  onCategorySelect = () => {},
}: SidebarProps) => {
  return (
    <div className="w-[280px] h-full bg-background border-r">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Design Tokens</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "secondary" : "ghost"}
                className="w-full justify-between"
                onClick={() => onCategorySelect(category.id)}
              >
                <div className="flex items-center">
                  {category.icon}
                  <span className="ml-2">{category.label}</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${activeCategory === category.id ? "rotate-90" : ""}`}
                />
              </Button>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="px-4 py-2">
            <p className="text-sm text-muted-foreground">
              Design token management system for maintaining consistent styles
              across your application.
            </p>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;
