// components/FloatingLinkButton.jsx
import Link from "next/link";

export default function FloatingLinkButton({
  href = "https://devmasters.tech/Services/Templates",
  text = "← Back to DevMasters",
  position = "right-middle", // Options: top-right, top-left, bottom-right, bottom-left
  external = true, // If true, uses <a> tag; if false, uses Next.js <Link>
  className = "",
}) {
  // Predefined position classes (you can add more)
  const positionClasses = {
   
    "middle-right": "middle-10 right-10",
    "bottom-center": "bottom-10 left-1/2 transform -translate-x-1/2",
    "right-middle": "top-1/2 right-10 transform -translate-y-1/2",
  };

  // Base styling – fully customizable via className prop
  const baseClasses = `
    fixed z-50
    px-5 py-3
    bg-blue-600 text-white
    rounded-full shadow-md
    hover:bg-blue-700 hover:shadow-lg
    transition-all duration-200
    text-sm font-medium
    ${positionClasses[position] || positionClasses["right-middle"]}
    ${className}
  `;

  // External link → plain <a> (works with target="_blank" etc.)
  if (external) {
    return (
      <a
        href={href}
        className={baseClasses}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  }


}