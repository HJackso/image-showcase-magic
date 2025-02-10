
import { useState, useEffect } from "react";
import { ImageSettings } from "./ImagePreview";

interface PreviewPaneProps {
  images: File[];
  settings: ImageSettings[];
  displayMode: "single" | "pair";
}

export const PreviewPane = ({
  images,
  settings,
  displayMode,
}: PreviewPaneProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    // Convert File objects to URLs
    const urls = images.map((image) => URL.createObjectURL(image));
    setImageUrls(urls);

    // Cleanup URLs on unmount
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      {imageUrls.length > 0 && (
        <div className="absolute inset-0 flex justify-center items-center">
          <img
            src={imageUrls[currentIndex]}
            alt={`Preview ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
          {displayMode === "pair" && currentIndex + 1 < imageUrls.length && (
            <img
              src={imageUrls[currentIndex + 1]}
              alt={`Preview ${currentIndex + 2}`}
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>
      )}
    </div>
  );
};
