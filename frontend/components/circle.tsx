"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useTime,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import { useEffect } from "react";

type CircleProps = {
  size: number;
  position: string;
  isLoading?: boolean;
  duration: number;
  isReverse?: boolean;
};

export function Circle({
  size,
  position,
  isLoading,
  duration,
  isReverse,
}: CircleProps) {
  const time = useTime();
  const rotate = useTransform(
    time,
    [0, duration],
    isReverse ? [360, 0] : [0, 360],
    { clamp: false }
  );
  const rotateMinus = useTransform(
    time,
    [0, duration],
    isReverse ? [0, 360] : [360, 0],
    {
      clamp: false,
    }
  );
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isLoading) {
      const controls = animate(count, 100 - size, { duration: 1 });
      return controls.stop;
    }
  }, [isLoading]);

  return (
    <div
      className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2"
      style={{
        width: `${size}%`,
      }}
    >
      <motion.div className="w-full h-full" style={{ rotate }}>
        <div
          className={cn(
            "border border-white/20 rounded-full w-full h-full",
            isLoading && "animate-ping"
          )}
        ></div>
        {!isLoading && (
          <div className="absolute left-[calc(100%-8px)] top-1/2 -translate-y-1/2 flex gap-2 items-center">
            <div className="rounded-full w-4 h-4 bg-gray-100 left-0 top-0 animate-pulse"></div>
            <div className="animate-scale-down">
              <motion.div
                className="font-mono bg-white/10 text-white/90 text-sm px-2 py-1 rounded border border-white/40 flex items-center gap-1"
                style={{ rotate: rotateMinus }}
              >
                {position}
                <div className="flex items-center">
                  <motion.div>{rounded}</motion.div>%
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
