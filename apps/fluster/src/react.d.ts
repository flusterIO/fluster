import React from 'react';

// Use 'react' for "jsx": "react" or "jsx": "preserve"
declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                // Add specific model-viewer attributes here for stronger typing if you need them
                src?: string;
                alt?: string;
                'ar'?: boolean;
                'camera-controls'?: boolean;
                // ... and so on for all your used attributes
            };
        }
    }
}
