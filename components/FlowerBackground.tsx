"use client";
// components/FlowerBackground.tsx
// Hiệu ứng hoa rơi nhẹ ở background — chỉ là điểm nhấn, không che nội dung

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  shape: "circle" | "oval" | "heart";
}

const PETAL_COLORS = [
  "rgba(255, 182, 193, 0.6)", // hồng nhạt
  "rgba(216, 191, 216, 0.55)", // tím nhạt
  "rgba(173, 216, 230, 0.5)", // xanh nhạt
  "rgba(255, 218, 225, 0.65)", // hồng trắng
  "rgba(200, 200, 255, 0.45)", // lavender
];

export default function FlowerBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cập nhật kích thước canvas theo màn hình
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Tạo cánh hoa ban đầu
    const createPetal = (startFromTop = false): Petal => ({
      x: Math.random() * canvas.width,
      y: startFromTop ? -20 : Math.random() * canvas.height,
      size: Math.random() * 8 + 5,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.2,
      opacity: Math.random() * 0.4 + 0.2,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      shape: ["circle", "oval", "heart"][Math.floor(Math.random() * 3)] as Petal["shape"],
    });

    // Khởi tạo 35 cánh hoa
    petalsRef.current = Array.from({ length: 35 }, () => createPetal(false));

    // Vẽ hình trái tim nhỏ
    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
      ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + (size * 3) / 4, x, y + size);
      ctx.bezierCurveTo(x, y + (size * 3) / 4, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
      ctx.closePath();
    };

    // Vòng lặp animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current.forEach((petal, i) => {
        // Cập nhật vị trí
        petal.y += petal.speedY;
        petal.x += Math.sin(petal.y * 0.01) * 0.4 + petal.speedX;
        petal.rotation += petal.rotationSpeed;

        // Reset khi ra khỏi màn hình
        if (petal.y > canvas.height + 20) {
          petalsRef.current[i] = createPetal(true);
        }

        // Vẽ cánh hoa
        ctx.save();
        ctx.globalAlpha = petal.opacity;
        ctx.fillStyle = petal.color;
        ctx.translate(petal.x, petal.y);
        ctx.rotate((petal.rotation * Math.PI) / 180);

        if (petal.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, petal.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (petal.shape === "oval") {
          ctx.beginPath();
          ctx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          drawHeart(ctx, -petal.size / 2, -petal.size / 2, petal.size);
          ctx.fill();
        }
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
