// components/Loader/CarLoader.tsx
import { Html, useProgress } from "@react-three/drei";

export function ShortLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Loading car model... {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}