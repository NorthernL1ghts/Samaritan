/* Loading wrapper */
let wrapper = {
    init: (stage) => {
        if (!stage) stage = 1;
        switch (stage) {
            case 1:
                wrapper.progress(() => {
                    wrapper.init(2);
                });
                break;
            case 2:
                wrapper.status('connection established', () => {
                    wrapper.init(3);
                });
                break;
            case 3:
                wrapper.load(() => {
                    wrapper.init(4);
                });
                break;
            case 4:
                marker.solid();
                setTimeout(() => {
                    output.s('Hello admin what are your commands ?');
                    executive.init();
                }, 750);
                break;
        }
    },
    progress: (callback) => {
        setTimeout(() => {
            let i = 0;
            let a = ['PREPROCESSING', 'NEURAL NETS', 'PATTERN RECOGNITION', 'MEMORY ASSIMILATION', 'MACHINE LEARNING', 'EVOLUTIONARY COMPUTATION', 'RATIONAL AGENTS', 'COGNITIVE ARCHITECTURES', 'HEURISTICS', 'ALGORITHMIC ENGINES', 'FLEXIBLE PLANNING', 'SOCIAL ENGINEERING', 'AUTONOMOUS IMPROVEMENT'];
            let b = ['DOD', 'FBI', 'CIA', 'NSA', 'DEA', 'ECHELON', 'DGSI', 'DGSE', 'MI6', 'GCHQ', 'FSB', 'SVR'];
            let n = parseInt(100 / (a.length + b.length));
            let p = 0;
            let P = setInterval(() => {
                if (p < 100) {
                    p++;
                    document.querySelector('#progress .bar').style.width = p + '%';
                    if (p % n === 0) {
                        if (i < (a.length + b.length)) {
                            document.querySelector('#progress .details').textContent = a[i] ? 'ASSIMILATING DATA : ' + a[i] : 'DATA ACQUISITION : ' + b[i - a.length];
                            i++;
                        } else
                            document.querySelector('#progress .details').textContent = release.version;
                    }
                } else {
                    clearInterval(P);
                    setTimeout(() => {
                        document.querySelector('#progress').style.display = 'none';
                        setTimeout(() => {
                            callback();
                        }, 75);
                    }, 500);
                }
            }, 25);
        }, 250);
    },
    status: (text, callback) => {
        document.querySelector('#status').textContent = text;
        document.querySelector('#status').style.opacity = '1';
        setTimeout(() => {
            document.querySelector('#status').style.opacity = '0';
            setTimeout(() => {
                callback();
            }, 500);
        }, 1000);
    },
    load: (callback) => {
        marker.dots();
        document.querySelectorAll('.LW').forEach((el) => {
            el.classList.add('loaded');
        });
        setTimeout(() => {
            callback();
        }, 2000);
    },
    unload: (callback) => {
        document.querySelectorAll('.LW').forEach((el) => {
            el.classList.remove('loaded');
        });
        setTimeout(() => {
            callback();
        }, 600);
    },
    shutdown: () => {
        marker.hide();
        document.querySelector('#hr').style.visibility = 'hidden';
        document.querySelector('#cmd').style.display = 'none';
        document.querySelector('#systemVersion').style.display = 'none';
        sWindow.destroyAll();
        document.querySelector('#output').style.color = 'red';
        let i = 5;
        document.querySelector('#output').textContent = 'SAMARITAN SHUTDOWN IN : ' + i;
        let countdown = setInterval(() => {
            if (i > 0) {
                i--;
                document.querySelector('#output').textContent = 'SAMARITAN SHUTDOWN IN : ' + i;
                if (i === 0) {
                    setTimeout(() => {
                        document.querySelector('#output').style.visibility = 'hidden';
                    }, 250);
                }
            } else {
                clearInterval(countdown);
                wrapper.unload(() => {
                    document.querySelector('#status').classList.add('red');
                    wrapper.status('samaritan offline', () => {
                        document.head.innerHTML = '';
                        document.body.innerHTML = '';
                        document.body.style.backgroundColor = 'black';
                    });
                });
            }
        }, 1000);
    }
};