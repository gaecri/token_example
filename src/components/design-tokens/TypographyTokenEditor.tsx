import React, { useState } from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface TypographyToken {
  id: string;
  name: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
}

interface Props {
  tokens?: TypographyToken[];
  onAddToken?: (token: TypographyToken) => void;
}

const defaultTokens: TypographyToken[] = [
  {
    id: "1",
    name: "Heading 1",
    fontFamily: "Inter",
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  {
    id: "2",
    name: "Body",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
  },
];

const TypographyTokenEditor = ({
  tokens = defaultTokens,
  onAddToken = () => {},
}: Props) => {
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(400);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [tokenName, setTokenName] = useState("");

  const handleAddToken = () => {
    const newToken: TypographyToken = {
      id: Math.random().toString(),
      name: tokenName || "New Token",
      fontFamily: selectedFont,
      fontSize,
      fontWeight,
      lineHeight,
    };
    onAddToken(newToken);
    setTokenName("");
  };

  return (
    <div className="p-6 bg-background w-full h-full overflow-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Typography Tokens</h2>
          <Button onClick={handleAddToken}>
            <Plus className="w-4 h-4 mr-2" />
            Add Token
          </Button>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="token-name">Token Name</Label>
              <Input
                id="token-name"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                placeholder="Enter token name"
              />
            </div>

            <div>
              <Label>Font Family</Label>
              <Select value={selectedFont} onValueChange={setSelectedFont}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font family" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Open Sans">Open Sans</SelectItem>
                  <SelectItem value="Montserrat">Montserrat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Font Size ({fontSize}px)</Label>
              <Slider
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                min={8}
                max={72}
                step={1}
                className="my-4"
              />
            </div>

            <div>
              <Label>Font Weight ({fontWeight})</Label>
              <Select
                value={fontWeight.toString()}
                onValueChange={(value) => setFontWeight(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300">Light (300)</SelectItem>
                  <SelectItem value="400">Regular (400)</SelectItem>
                  <SelectItem value="500">Medium (500)</SelectItem>
                  <SelectItem value="600">SemiBold (600)</SelectItem>
                  <SelectItem value="700">Bold (700)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Line Height ({lineHeight})</Label>
              <Slider
                value={[lineHeight * 10]}
                onValueChange={(value) => setLineHeight(value[0] / 10)}
                min={10}
                max={30}
                step={1}
                className="my-4"
              />
            </div>
          </div>

          <div className="mt-6">
            <Label>Preview</Label>
            <div
              className="p-4 border rounded-md mt-2"
              style={{
                fontFamily: selectedFont,
                fontSize: `${fontSize}px`,
                fontWeight,
                lineHeight,
              }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Existing Tokens</h3>
          {tokens.map((token) => (
            <Card key={token.id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{token.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {token.fontFamily} {token.fontSize}px/{token.lineHeight}
                  </p>
                </div>
                <div
                  style={{
                    fontFamily: token.fontFamily,
                    fontSize: `${token.fontSize}px`,
                    fontWeight: token.fontWeight,
                    lineHeight: token.lineHeight,
                  }}
                >
                  Aa
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypographyTokenEditor;
