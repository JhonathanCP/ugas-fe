// custom.d.ts
declare namespace TSX {
  interface IntrinsicElements {
    'test': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
