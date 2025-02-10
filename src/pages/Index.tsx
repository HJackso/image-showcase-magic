
import { useState } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { ImagePreview, ImageSettings } from "@/components/ImagePreview";
import { PreviewPane } from "@/components/PreviewPane";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Index = () => {
  const [images, setImages] = useState<File[]>([]);
  const [settings, setSettings] = useState<ImageSettings[]>([]);
  const [displayMode, setDisplayMode] = useState<"single" | "pair">("single");

  const handleImagesAdded = (newImages: File[]) => {
    setImages((prev) => [...prev, ...newImages]);
    // Initialize settings for new images
    const newSettings: ImageSettings[] = newImages.map(() => ({
      entryDirection: "left",
      exitDirection: "right",
      entryDuration: 1,
      exitDuration: 1,
      displayDuration: 3,
    }));
    setSettings((prev) => [...prev, ...newSettings]);
  };

  const handleSettingsChange = (index: number, newSettings: ImageSettings) => {
    setSettings((prev) => {
      const updated = [...prev];
      updated[index] = newSettings;
      return updated;
    });
  };

  const handleExport = () => {
    // In a real implementation, this would trigger the video generation
    toast.success("Export started! This feature is coming soon.");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Slideshow Creator
          </h1>
          <p className="text-muted-foreground">
            Create beautiful slideshows with custom transitions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Display Mode</Label>
                <Select
                  value={displayMode}
                  onValueChange={(value) =>
                    setDisplayMode(value as "single" | "pair")
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Image</SelectItem>
                    <SelectItem value="pair">Image Pairs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ImageUploader onImagesAdded={handleImagesAdded} />
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Preview</h2>
              <PreviewPane
                images={images}
                settings={settings}
                displayMode={displayMode}
              />
              <Button
                onClick={handleExport}
                className="w-full"
                disabled={images.length === 0}
              >
                Export Video
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Image Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((image, index) => (
                <ImagePreview
                  key={index}
                  image={image}
                  index={index}
                  onSettingsChange={handleSettingsChange}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
