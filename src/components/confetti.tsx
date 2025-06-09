import { useRef, useEffect, useState, useImperativeHandle, forwardRef, useCallback } from "react";

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  color: string;
  gravity: number;
  wind: number;
  life: number;
}

interface ConfettiProps {
  className?: string;
}

export interface ConfettiRef {
  shoot: () => void;
}

const COLORS = ["#FFD700", "#C0C0C0", "#FFA500", "#E5E5E5", "#FFEF94", "#D3D3D3"];

const ConfettiShooter = forwardRef<ConfettiRef, ConfettiProps>(({ className = "" }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const confettiPiecesRef = useRef<ConfettiPiece[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  const createConfettiPiece = useCallback((startX: number, startY: number): ConfettiPiece => {
    const angle = (Math.random() - 0.5) * Math.PI * 0.6;
    const speed = Math.random() * 20 + 8;

    return {
      x: startX + (Math.random() - 0.5) * 30,
      y: startY,
      vx: Math.sin(angle) * speed,
      vy: -Math.abs(Math.cos(angle) * speed) - Math.random() * 8,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 15,
      size: Math.random() * 3 + 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      gravity: 0.4 + Math.random() * 0.2,
      wind: (Math.random() - 0.5) * 1.2,
      life: 1.0,
    };
  }, []);

  const shoot = useCallback(() => {
    if (!dimensions.width || !dimensions.height) return;

    const newPieces: ConfettiPiece[] = [];
    const centerX = dimensions.width / 2;
    const bottomY = dimensions.height - 10;

    for (let i = 0; i < 80; i++) {
      newPieces.push(createConfettiPiece(centerX, bottomY));
    }

    confettiPiecesRef.current = [...confettiPiecesRef.current, ...newPieces];
    setIsAnimating(true);
  }, [dimensions, createConfettiPiece]);

  useImperativeHandle(ref, () => ({ shoot }), [shoot]);

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  }, []);

  useEffect(() => {
    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [updateDimensions]);

  useEffect(() => {
    if (canvasRef.current && dimensions.width && dimensions.height) {
      const canvas = canvasRef.current;
      //   const rect = canvas.getBoundingClientRect();
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      canvas.style.width = dimensions.width + "px";
      canvas.style.height = dimensions.height + "px";
    }
  }, [dimensions]);

  useEffect(() => {
    if (!isAnimating) return;

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and filter confetti pieces
      confettiPiecesRef.current = confettiPiecesRef.current.filter((piece) => {
        // Update physics
        piece.vy += piece.gravity;
        piece.vx += piece.wind * 0.1;
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.rotation += piece.rotationSpeed;
        piece.life -= 0.008;

        // Remove pieces that are off screen or faded
        if (piece.y > canvas.height + 100 || piece.life <= 0 || piece.x < -100 || piece.x > canvas.width + 100) {
          return false;
        }

        // Draw the piece
        ctx.save();
        ctx.globalAlpha = Math.max(0, piece.life);
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        ctx.restore();

        return true;
      });

      if (confettiPiecesRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
});

ConfettiShooter.displayName = "ConfettiShooter";

export default ConfettiShooter;
