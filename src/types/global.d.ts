// global.d.ts
import * as React from 'react'
declare namespace JSX {
    interface IntrinsicElements {
      'pixel-canvas': { // Tipado simple para elementos personalizados
        'data-colors'?: string;
        'data-gap'?: number;
        'data-speed'?: number;
        'data-no-focus'?: boolean;
        // ... otros atributos
      };
    }
  }