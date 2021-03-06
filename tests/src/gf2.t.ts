namespace tests {
    import gf32 = tsumego.gf32;
    import rand = tsumego.rand;

    const {mul: qm, inv: qi} = gf32;
    const qd = (a, b) => qm(a, qi(b));

    ut.group($ => {
        /// GF(2**32)

        const trials = 1e4;

        $.test($ => {
            /// identity

            $(qm(0, 1)).equal(0);
            $(qm(1, 1)).equal(1);

            for (let i = 0; i < trials; i++) {
                const a = rand();
                const b = qm(a, 1);

                //console.warn(a, b);
                $(b).equal(a);
            }
        });

        $.test($ => {
            /// closure

            for (let i = 0; i < trials; i++) {
                const a = rand();
                const b = rand();
                const c = qm(a, b);

                //console.warn(a, b, c);
                $(c | 0).equal(c);
                $(a != 0 && b != 0).equal(c != 0);
            }
        });

        $.test($ => {
            /// commutativity

            for (let i = 0; i < trials; i++) {
                const a = rand();
                const b = rand();

                const ab1 = qm(a, b);
                const ab2 = qm(b, a);

                //console.warn([a, b], [ab1, ab2]);
                $(ab1).equal(ab2);
            }
        });

        $.test($ => {
            /// associativity

            for (let i = 0; i < trials; i++) {
                const a = rand();
                const b = rand();
                const c = rand();

                const ab = qm(a, b);
                const bc = qm(b, c);

                const abc1 = qm(ab, c);
                const abc2 = qm(a, bc);

                //console.warn([a, b, c], [abc1, abc2]);
                $(abc1).equal(abc2);
            }
        });

        $.test($ => {
            /// distributivity

            for (let i = 0; i < trials; i++) {
                const a = rand();
                const b = rand();
                const c = rand();

                const abc1 = qm(a, b ^ c);
                const abc2 = qm(a, b) ^ qm(a, c);

                //console.warn([a, b, c], [abc1, abc2]);
                $(abc1).equal(abc2);
            }
        });

        $.test($ => {
            /// inversion

            $(qi(0)).equal(0);
            $(qi(1)).equal(1);

            for (let i = 0; i < trials; i++) {
                const a = rand();
                const b = qi(a);
                const c = qm(a, b);                

                //console.warn(a, b, c);
                if (a) $(c).equal(1);
            }
        });

        $.test($ => {
            /// division

            for (let i = 0; i < trials; i++) {
                const a = rand();
                const b = rand();
                const c = qm(a, b);

                const cb = qd(c, b);
                const ca = qd(c, a);

                //console.warn([a, b, c], [cb, ca]);
                if (b) $(cb).equal(a);
                if (a) $(ca).equal(b);
            }
        });
    });
}
