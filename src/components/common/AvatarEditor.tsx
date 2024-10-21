"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import type React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RotateCw, Upload } from "lucide-react";

interface AvatarEditorProps {
  onSave: (canvas: HTMLCanvasElement) => void;
}

const AvatarEditor: React.FC<AvatarEditorProps> = ({ onSave }) => {
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [isRounded, setIsRounded] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imageRef.current;

    if (canvas && ctx && img) {
      canvas.width = 250;
      canvas.height = 250;

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

      if (isRounded) {
        ctx.globalCompositeOperation = "destination-in";
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 2,
          0,
          Math.PI * 2,
        );
        ctx.closePath();
        ctx.fill();
      }
    }
  }, [scale, rotate, isRounded, position]);

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
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        // Reset position and scale when a new image is uploaded
        setPosition({ x: 0, y: 0 });
        setScale(1);
        setRotate(0);
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
    if (!img) return { maxX: 0, maxY: 0 };

    const canvasSize = 250; // Assuming square canvas of 250x250
    const imgWidth = img.width * scale;
    const imgHeight = img.height * scale;

    // Calculate the maximum allowed offset
    const maxX = Math.max(0, (imgWidth - canvasSize) / 2);
    const maxY = Math.max(0, (imgHeight - canvasSize) / 2);

    return { maxX, maxY };
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: scale is needed here
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
                  if (!value) return;
                  setScale(value);
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
                    if (!value) return;
                    setRotate(value);
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
            <div className="flex items-center space-x-2">
              <Switch
                id="rounded-mode"
                checked={isRounded}
                onCheckedChange={(checked) => {
                  setIsRounded(checked);
                  draw();
                }}
              />
              <Label htmlFor="rounded-mode">Rounded</Label>
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
