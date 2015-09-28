module tsumego {
    'use strict';

    /**
     * bits 0..3 - the X coord
     * bits 5..7 - the Y coord
     */
    export type XY = number;

    export function XY(x: number, y: number) {
        return x | (y << 4);
    }

    export module XY {
        export const x = (m: XY) => m & 15;
        export const y = (m: XY) => (m >> 4) & 15;

        export module nb {
            export const l = (m: XY) => XY(x(m) - 1, y(m));
            export const r = (m: XY) => XY(x(m) + 1, y(m));
            export const t = (m: XY) => XY(x(m), y(m) - 1);
            export const b = (m: XY) => XY(x(m), y(m) + 1);

            /** the 4 neighbors */
            export const lrtb = (m: XY) => [l(m), r(m), t(m), b(m)];
        }
    }
}