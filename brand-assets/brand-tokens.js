// Shared brand tokens for Raji — pastel & soft, warm & friendly, minimal.
// All palettes are pastel-leaning with a single deeper "ink" tone for legibility.

window.RAJI_PALETTES = [
  {
    id: 'peach-mocha',
    name: 'Peach Mocha',
    subtitle: 'cream · peach · terracotta · espresso',
    bg: '#f6efe6',         // soft cream
    surface: '#fbf6ee',    // lighter cream
    accent: '#e8a88a',     // soft peach
    accent2: '#c97b5b',    // terracotta (deeper)
    soft: '#f0d6c4',       // pastel peach
    ink: '#3a2a22',        // espresso
    muted: '#8a7568',      // dusty taupe
    line: 'rgba(58,42,34,0.12)',
  },
  {
    id: 'sage-cream',
    name: 'Sage & Cream',
    subtitle: 'oat · sage · olive · forest',
    bg: '#f1ede2',
    surface: '#f8f5ec',
    accent: '#a8b89a',     // soft sage
    accent2: '#6a7a5c',    // deeper olive
    soft: '#d4dcc8',
    ink: '#2d3328',
    muted: '#7a8270',
    line: 'rgba(45,51,40,0.12)',
  },
  {
    id: 'dusty-rose',
    name: 'Dusty Rose',
    subtitle: 'blush · mauve · plum',
    bg: '#f5ebe6',
    surface: '#faf2ed',
    accent: '#e5b8b8',     // blush
    accent2: '#a85d6b',    // mauve
    soft: '#efd3d3',
    ink: '#3d2530',
    muted: '#8c6c75',
    line: 'rgba(61,37,48,0.12)',
  },
  {
    id: 'butter-honey',
    name: 'Butter & Honey',
    subtitle: 'butter · honey · cocoa',
    bg: '#f6efd9',
    surface: '#fbf6e3',
    accent: '#f0d181',     // butter yellow
    accent2: '#b8843d',    // honey
    soft: '#f5e2af',
    ink: '#3a2f1a',
    muted: '#897558',
    line: 'rgba(58,47,26,0.12)',
  },
  {
    id: 'lilac-mist',
    name: 'Lilac Mist',
    subtitle: 'mist · lilac · plum',
    bg: '#efeaf2',
    surface: '#f6f2f8',
    accent: '#c9b8d9',     // soft lilac
    accent2: '#6d4f87',    // plum
    soft: '#e1d4ea',
    ink: '#2e2438',
    muted: '#7d7088',
    line: 'rgba(46,36,56,0.12)',
  },
];

// Default palette for any standalone preview.
window.RAJI_PALETTE_DEFAULT = window.RAJI_PALETTES[0];
