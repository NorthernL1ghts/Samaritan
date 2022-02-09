
/* Process */
let sam = {
    query: '',
    hold: false,
    search: (query) => {
        query = query.toLowerCase().trim();
        if (!sam.hold) {
            sam.query = query;
            console.log('SAM // [LOG] Query received : "' + query + '"');
            for (let i = 0; i < q.length; i++) {
                if (q[i].pattern.test(query)) {
                    console.log('SAM // [LOG] Match found', q[i]);
                    sam.process(q[i], 1);
                    return;
                }
            }
            cleverbot.process(query);
        } else {
            sam.hold(query);
        }
    },
    process: (a, stage) => {
        console.log('SAM // [LOG] Processing stage ' + stage);
        switch (stage) {
            case 1:
                if (typeof(a.before) === 'function') {
                    a.before();
                    window.addEventListener('before.DONE', _func = () => {
                        this.removeEventListener('before.DONE', _func);
                        sam.process(a, 2);
                    });
                } else
                    sam.process(a, 2);
                break;
            case 2:
                if (typeof(a.answer) === 'string') {
                    output.s(a.answer);
                    window.addEventListener('output.CLEAR', _func = () => {
                        this.removeEventListener('output.CLEAR', _func);
                        sam.process(a, 3);
                    });
                } else
                    sam.process(a, 3);
                break;
            case 3:
                if (typeof(a.after) === 'function') {
                    a.after();
                }
                break;
        }
    }
};

let cleverbot = {
    process: (query) => {
        console.log('CLEVERBOT // [LOG] Processing query');
    }
};