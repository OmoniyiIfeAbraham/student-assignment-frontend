// components/MarkdownTOC.tsx
import { useEffect, useState } from "react";

export default function MarkdownTOC({ markdown }) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // Run after ReactMarkdown has rendered headings with IDs
    const els = document.querySelectorAll("h1, h2, h3, h4");
    const list = [];
    els.forEach((el) => {
      const id = el.id;
      if (id) {
        list.push({
          level: Number(el.tagName[1]),
          text: el.textContent ?? "",
          id,
        });
      }
    });
    setHeadings(list);
  }, [markdown]);

  if (!headings.length) return null;

  return (
    <nav className="sticky top-24 bg-gray-50 p-4 rounded-xl shadow-sm text-sm max-h-96 overflow-y-auto">
      <p className="font-bold text-gray-700 mb-2">Contents</p>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li
            key={h.id}
            style={{ marginLeft: `${(h.level - 1) * 12}px` }}
            className="hover:text-indigo-600 transition"
          >
            <a href={`#${h.id}`} className="block py-0.5">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
