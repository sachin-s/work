// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}