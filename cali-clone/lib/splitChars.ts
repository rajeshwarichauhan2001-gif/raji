// Free fallback for paid SplitText plugin.
// Splits an element's textContent into <span class="char"> per character.
// Preserves spaces as non-breaking. Returns the char nodes.
export function splitChars(el: HTMLElement | null): HTMLSpanElement[] {
  if (!el) return [];
  const text = el.textContent ?? "";
  el.textContent = "";
  const chars: HTMLSpanElement[] = [];
  const words = text.split(/(\s+)/);
  for (const word of words) {
    if (/^\s+$/.test(word)) {
      el.appendChild(document.createTextNode(" "));
      continue;
    }
    const wrap = document.createElement("span");
    wrap.style.display = "inline-block";
    wrap.style.whiteSpace = "nowrap";
    for (const ch of Array.from(word)) {
      const s = document.createElement("span");
      s.className = "char";
      s.style.display = "inline-block";
      s.style.willChange = "transform, opacity";
      s.textContent = ch;
      wrap.appendChild(s);
      chars.push(s);
    }
    el.appendChild(wrap);
  }
  return chars;
}
