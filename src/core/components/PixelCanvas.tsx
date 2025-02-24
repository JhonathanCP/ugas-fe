import { useEffect, useRef } from "react";
import "./pixel-canvas"; // Asegúrate de poner la ruta correcta

export const PixelCanvasComponent = ({
  colors = "#0042ce,#0089ee,#bef8ff",
  gap = 5,
  speed = 35,
  noFocus = false,
}: {
  colors?: string;
  gap?: number;
  speed?: number;
  noFocus?: boolean;
}) => {
  const pixelCanvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pixelCanvasRef.current) {
      pixelCanvasRef.current.setAttribute("data-colors", colors);
      pixelCanvasRef.current.setAttribute("data-gap", gap.toString());
      pixelCanvasRef.current.setAttribute("data-speed", speed.toString());

      if (noFocus) {
        pixelCanvasRef.current.setAttribute("data-no-focus", "");
      } else {
        pixelCanvasRef.current.removeAttribute("data-no-focus");
      }
    }
  }, [colors, gap, speed, noFocus]);

  return <pixel-canvas ref={pixelCanvasRef} style={{ width: "100%", height: "100%" }} />;
};