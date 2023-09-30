import { ComponentProps } from "react";

export function Check(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <rect width="256" height="256" fill="none" />
      <polyline
        points="40 144 96 200 224 72"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
    </svg>
  );
}
