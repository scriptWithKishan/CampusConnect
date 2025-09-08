import { TriangleAlert } from "lucide-react";

export const FormError = ({ message }) => {
  return (
    <div className="px-6 py-4 rounded-sm bg-destructive shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white w-full flex items-center gap-4">
      <TriangleAlert />
      <span>{message}</span>
    </div>
  );
};
