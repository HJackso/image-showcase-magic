
import { useState } from "react";
import { Card } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";

interface ImagePreviewProps {
  image: File;
  index: number;
  onSettingsChange: (index: number, settings: ImageSettings) => void;
}

export interface ImageSettings {
  entryDirection: "left" | "right" | "top" | "bottom";
  exitDirection: "left" | "right" | "top" | "bottom";
  entryDuration: number;
  exitDuration: number;
  displayDuration: number;
}

export const ImagePreview = ({
  image,
  index,
  onSettingsChange,
}: ImagePreviewProps) => {
  const [settings, setSettings] = useState<ImageSettings>({
    entryDirection: "left",
    exitDirection: "right",
    entryDuration: 1,
    exitDuration: 1,
    displayDuration: 3,
  });

  const handleSettingChange = (
    key: keyof ImageSettings,
    value: string | number
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(index, newSettings);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="relative aspect-video rounded-md overflow-hidden">
        <img
          src={URL.createObjectURL(image)}
          alt={`Preview ${index + 1}`}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Entry Direction</Label>
          <Select
            value={settings.entryDirection}
            onValueChange={(value) =>
              handleSettingChange(
                "entryDirection",
                value as ImageSettings["entryDirection"]
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="right">Right</SelectItem>
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="bottom">Bottom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Exit Direction</Label>
          <Select
            value={settings.exitDirection}
            onValueChange={(value) =>
              handleSettingChange(
                "exitDirection",
                value as ImageSettings["exitDirection"]
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="right">Right</SelectItem>
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="bottom">Bottom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Entry Duration (seconds)</Label>
          <Slider
            value={[settings.entryDuration]}
            min={0.5}
            max={5}
            step={0.1}
            onValueChange={([value]) =>
              handleSettingChange("entryDuration", value)
            }
          />
          <span className="text-sm text-gray-500">
            {settings.entryDuration.toFixed(1)}s
          </span>
        </div>

        <div className="space-y-2">
          <Label>Display Duration (seconds)</Label>
          <Slider
            value={[settings.displayDuration]}
            min={1}
            max={10}
            step={0.5}
            onValueChange={([value]) =>
              handleSettingChange("displayDuration", value)
            }
          />
          <span className="text-sm text-gray-500">
            {settings.displayDuration.toFixed(1)}s
          </span>
        </div>

        <div className="space-y-2">
          <Label>Exit Duration (seconds)</Label>
          <Slider
            value={[settings.exitDuration]}
            min={0.5}
            max={5}
            step={0.1}
            onValueChange={([value]) =>
              handleSettingChange("exitDuration", value)
            }
          />
          <span className="text-sm text-gray-500">
            {settings.exitDuration.toFixed(1)}s
          </span>
        </div>
      </div>
    </Card>
  );
};
