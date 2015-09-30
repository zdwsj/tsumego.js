﻿/// <reference path="types.ts" />

module tsumego {
    'use strict';

    export const infty = 777;

    /** 0 -> `a`, 3 -> `d` */
    export const n2s = (n: number) => String.fromCharCode(n + 0x61);

    /** (2, 5) -> 'ce' */
    export const xy2s = (xy: XY) => Number.isFinite(xy) ? n2s(XY.x(xy)) + n2s(XY.y(xy)) : xy;

    /** `d` -> 43 `a` -> 0 */
    export const s2n = (s: string, i: number = 0) => s.charCodeAt(i) - 0x61;

    /** 'ce' -> (2, 5) */
    export const s2xy = (s: string) => XY(s2n(s.charAt(0)), s2n(s.charAt(1)));

    export const min = (a, b: number) => a < b ? a : b;
    export const max = (a, b: number) => a > b ? a : b;
    export const abs = (a: number) => a < 0 ? -a : a;

    /** Simulates yield* which can't be called in a regular function.
        The point is to get the value that a generator returns at the end. */
    export function result<T>(g: IterableIterator<T>) {
        let r = g.next();
        while (!r.done)
            r = g.next();
        return r.value;
    }

    export const nesw = [[-1, 0], [+1, 0], [0, -1], [0, +1]];

    export function* region(root: XY, belongs: (target: XY, source: XY) => boolean) {
        const body: XY[] = [];
        const edge = [root];

        while (edge.length > 0) {
            const xy = edge.pop();

            yield xy;
            body.push(xy);

            for (const nxy of XY.nb.lrtb(xy))
                if (belongs(nxy, xy) && body.indexOf(nxy) < 0 && edge.indexOf(nxy) < 0)
                    edge.push(nxy);
        }
    }
}
