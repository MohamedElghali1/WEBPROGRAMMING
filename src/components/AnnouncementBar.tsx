import { X } from "lucide-react";
import { useState } from "react";

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="relative bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 text-center text-xs sm:text-sm">
        <p>
          Sign up and get 20% off your first order.{" "}
          <a href="#newsletter" className="font-medium underline underline-offset-2">
            Sign Up Now →
          </a>
        </p>
        <button
          aria-label="Dismiss announcement"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-white/10"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
