import { useState, useRef, useCallback, useEffect } from "react";
import type React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RotateCw, Upload } from "lucide-react";

interface AvatarEditorProps {
  onSave: (canvas: HTMLCanvasElement) => void;
  initialImage?: string;
}

const AvatarEditor: React.FC<AvatarEditorProps> = ({
  onSave,
  initialImage = null,
}) => {
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [image, setImage] = useState<string | null>(initialImage);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const CANVAS_SIZE = 500;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imageRef.current;

    if (canvas && ctx && img) {
      requestAnimationFrame(() => {
        canvas.width = CANVAS_SIZE;
        canvas.height = CANVAS_SIZE;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotate * Math.PI) / 180);
        ctx.scale(scale, scale);

        ctx.drawImage(
          img,
          -img.width / 2 + position.x / scale,
          -img.height / 2 + position.y / scale,
        );

        ctx.restore();
      });
    }
  }, [scale, rotate, position]);

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        imageRef.current = img;
        draw();
      };
    }
  }, [image, draw]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
        img.onload = () => {
          const MAX_SIZE = 1024;
          const scale = Math.min(MAX_SIZE / img.width, MAX_SIZE / img.height);

          // Create an offscreen canvas to resize the image
          const offscreenCanvas = document.createElement("canvas");
          const ctx = offscreenCanvas.getContext("2d");

          offscreenCanvas.width = img.width * scale;
          offscreenCanvas.height = img.height * scale;

          if (ctx) {
            ctx.drawImage(
              img,
              0,
              0,
              offscreenCanvas.width,
              offscreenCanvas.height,
            );

            setImage(offscreenCanvas.toDataURL());
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (canvasRef.current) {
      onSave(canvasRef.current);
    }
  };

  const calculateMaxOffset = useCallback(() => {
    const img = imageRef.current;
    if (!img) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };

    const imgWidth = img.width * scale;
    const imgHeight = img.height * scale;

    const minX = Math.min(0, (CANVAS_SIZE - imgWidth) / 2); // Left limit
    const maxX = Math.max(0, (imgWidth - CANVAS_SIZE) / 2); // Right limit

    const minY = Math.min(0, (CANVAS_SIZE - imgHeight) / 2); // Top limit
    const maxY = Math.max(0, (imgHeight - CANVAS_SIZE) / 2); // Bottom limit

    return { minX, maxX, minY, maxY };
  }, [scale]);

  const constrainPosition = useCallback(
    (newPosition: { x: number; y: number }) => {
      const { maxX, maxY } = calculateMaxOffset();

      return {
        x: Math.max(-maxX, Math.min(maxX, newPosition.x)),
        y: Math.max(-maxY, Math.min(maxY, newPosition.y)),
      };
    },
    [calculateMaxOffset],
  );

  const handleMouseDown = (_e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      const newPosition = {
        x: position.x + e.movementX,
        y: position.y + e.movementY,
      };
      setPosition(constrainPosition(newPosition));
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // Ensure position is within bounds when scale changes
    setPosition((prevPosition) => constrainPosition(prevPosition));
  }, [scale, constrainPosition]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg">
      <canvas
        ref={canvasRef}
        className="border rounded-lg cursor-grab active:cursor-grabbing"
        style={{ width: "250px", height: "250px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      />
      <div className="w-full max-w-xs space-y-4">
        <div className="flex items-center justify-center">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
            variant={"outline"}
          >
            <Upload className="mr-2 h-4 w-4" /> Upload Image
          </Button>
        </div>
        {image && (
          <>
            <div className="space-y-2">
              <Label>Scale</Label>
              <Slider
                min={0.5}
                max={2}
                step={0.01}
                value={[scale]}
                onValueChange={([value]) => {
                  setScale(value as number);
                  draw();
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Rotate</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  min={0}
                  max={360}
                  value={[rotate]}
                  onValueChange={([value]) => {
                    setRotate(value as number);
                    draw();
                  }}
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setRotate((prev) => (prev + 90) % 360);
                    draw();
                  }}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full">
              Save Avatar
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AvatarEditor;
