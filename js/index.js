let release = {
    version: 'v.978.0.06.51',
    _date: '01.11.21',
    dev: 'NorthernL1ghts',
    devcontact: 'Github: @NorthernL1ghts'
};

document.querySelectorAll('.version').forEach((el) => {
    el.textContent = release.version;
});

let mobile = (/(android|windows phone|ios)/i).test(window.navigator.userAgent);

/* Night mode */
let night = {
    enable: () => {
        document.body.classList.add('night');
    },
    disable: () => {
        document.body.classList.remove('night');
    },
    toggle: () => {
        document.body.classList.toggle('night');
    }
};

if (mobile) night.enable();

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
                    system.init();
                    ToolkitMenu.init();
                    TKGUITwo.init();
                    TKGUIThree.init();
                }, 750);
                break;
        }
    },
    progress: (callback) => {
        setTimeout(() => {
            let i = 0;
            let a = ['DOD', 'FBI', 'CIA', 'NSA', 'DEA', 'ECHELON', 'DGSI', 'DGSE', 'MI6', 'GCHQ', 'FSB', 'SVR'];
            let b = ['PREPROCESSING', 'NEURAL NETS', 'PATTERN RECOGNITION', 'MEMORY ASSIMILATION', 'MACHINE LEARNING', 'EVOLUTIONARY COMPUTATION', 'RATIONAL AGENTS', 'COGNITIVE ARCHITECTURES', 'HEURISTICS', 'ALGORITHMIC ENGINES', 'FLEXIBLE PLANNING', 'SOCIAL ENGINEERING', 'AUTONOMOUS IMPROVEMENT'];
            let n = parseInt(100 / (a.length + b.length));
            let p = 0;
            let P = setInterval(() => {
                if (p < 100) {
                    p++;
                    document.querySelector('#progress .bar').style.width = p + '%';
                    if (p % n === 0) {
                        if (i < (a.length + b.length)) {
                            document.querySelector('#progress .details').textContent = a[i] ? 'ASSIMILATING DATA : ' + a[i] : 'EXECUTIVE SYSTEMS : ' + b[i - a.length];
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
        // marker.dots();
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
                        document.body.style.backgroundColor = 'black'; // fade to black.
                    });
                });
            }
        }, 1000);
    }
};

/* Command & Focus */
let cmdFocus = () => {
    document.querySelector('#cmd span').focus();
    let setEndOfContenteditable = (el) => {
        let range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    };
    setEndOfContenteditable(document.querySelector('#cmd span'));
};

document.body.onkeydown = (e) => {
    if (/^([a-z]|backspace)$/i.test(e.key)) cmdFocus();
};

document.querySelector('#cmd span').onkeydown = (e) => {

    /* Prevent arrow keys (cursor displacement) and Ctrl-A (select all) */
    if (e.key.startsWith('Arrow') || (e.ctrlKey && e.key === 'a')) {
        e.preventDefault();
    }

    /* Enter */
    if (e.key === 'Enter') {
        document.querySelector('#submit').click();
    }
};

/* Prevent cursor displacement */
document.querySelector('#cmd span').onmousedown = (e) => {
    e.preventDefault();
};

/* Submit command */
document.querySelector('#submit').onclick = () => {
    let cmd = document.querySelector('#cmd span').textContent;
    if (cmd.length > 0) {
        document.querySelector('#cmd span').textContent = '';
        sam.search(cmd);
    }
};

/* Output */
let output = {

    // Word
    w: (w) => {
        marker.solid();
        document.querySelector('#output').textContent = w;
        document.querySelector('#hr').style.width = (w.length * 21) + 'px';
    },

    // Sentence
    s: (s) => {
        s = s.split(' ');
        output.w(s[0]);
        let i = 1;
        let printS = setInterval(() => {
            if (i < s.length) {
                output.w(s[i]);
                i++;
            } else {
                clearInterval(printS);
                output.clear();
            }
        }, 450);
    },
    clear: () => {
        document.querySelector('#output').textContent = '\xa0';
        setTimeout(() => {
            document.querySelector('#hr').style.removeProperty('width');
            marker.blink();
            window.dispatchEvent(new Event('output.CLEAR'));
        }, 150);
    },
    calculating: (s) => {
        if (s.state === true) {
            document.querySelector('#output').classList.add('calculating');
            marker.dots();
            if (s.duration) {
                setTimeout(() => {
                    let newSettings = {
                        state: false
                    };
                    if (typeof(s.callback) === 'function')
                        Object.assign(newSettings, newSettings, {
                            callback: s.callback
                        });
                    output.calculating(newSettings);
                }, s.duration * 1000);
            }
        } else {
            document.querySelector('#output').classList.remove('calculating');
            marker.blink();
            if (typeof(s.callback) === 'function')
                s.callback();
        }
    }
};

/* Triangle */
let marker = {
    blink: () => {
        marker.show();
        document.querySelector('#marker').className = 'triangle blink';
    },
    solid: () => {
        marker.show();
        document.querySelector('#marker').className = 'triangle';
    },
    dots: () => {
        marker.show();
        document.querySelector('#marker').className = 'dots';
    },
    show: () => {
        document.querySelector('#marker').style.visibility = 'visible';
    },
    hide: () => {
        document.querySelector('#marker').style.visibility = 'hidden';
    }
};

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

/* Executive Systems */
let executive = {
    classes: [],
    init: () => {
        document.querySelectorAll('#executive .item').forEach((item) => {
            if (item.classList.length > 1) {
                executive.classes.push(item.classList[1]);
                item.classList.remove(item.classList[1]);
            }
        });
        executive.blink();
    },
    blink: () => {
        let f = (t) => {
            setTimeout(() => {
                let n = Math.floor(Math.random() * (executive.classes.length - 1)) + 0;
                try {
                    document.querySelectorAll('#executive .item')[n].classList.add(executive.classes[n]);
                } catch (e) {
                    return;
                }
                setTimeout(() => {
                    try {
                        document.querySelectorAll('#executive .item')[n].classList.remove(executive.classes[n]);
                    } catch (e) {}
                }, 250);
                let t = Math.floor(Math.random() * 4000) + 100;
                f(t);
            }, t);
        };
        for (let i = 0; i < 2; i++) {
            f(0);
        }
    }
};

/* Systems */
let system = {
    classes: [],
    init: () => {
        document.querySelectorAll('#system .item').forEach((item) => {
            if (item.classList.length > 1) {
                system.classes.push(item.classList[1]);
                item.classList.remove(item.classList[1]);
            }
        });
        system.blink();
    },
    blink: () => {
        let f = (t) => {
            setTimeout(() => {
                let n = Math.floor(Math.random() * (system.classes.length - 1)) + 0;
                try {
                    document.querySelectorAll('#system .item')[n].classList.add(system.classes[n]);
                } catch (e) {
                    return;
                }
                setTimeout(() => {
                    try {
                        document.querySelectorAll('#system .item')[n].classList.remove(system.classes[n]);
                    } catch (e) {}
                }, 250);
                let t = Math.floor(Math.random() * 4000) + 100;
                f(t);
            }, t);
        };
        for (let i = 0; i < 2; i++) {
            f(0);
        }
    }
};

/* Toolkit Graphic User Interface */
let TKGUI = {
    classes: [],
    init: () => {
        document.querySelectorAll('#TKGUI .item').forEach((item) => {
            if (item.classList.length > 1) {
                TKGUI.classes.push(item.classList[1]);
                item.classList.remove(item.classList[1]);
            }
        });
        TKGUI.blink();
    },
    blink: () => {
        let f = (t) => {
            setTimeout(() => {
                let n = Math.floor(Math.random() * (TKGUI.classes.length - 1)) + 0;
                try {
                    document.querySelectorAll('#TKGUI .item')[n].classList.add(TKGUI.classes[n]);
                } catch (e) {
                    return;
                }
                setTimeout(() => {
                    try {
                        document.querySelectorAll('#TKGUI .item')[n].classList.remove(TKGUI.classes[n]);
                    } catch (e) {}
                }, 250);
                let t = Math.floor(Math.random() * 4000) + 100;
                f(t);
            }, t);
        };
        for (let i = 0; i < 2; i++) {
            f(0);
        }
    }
};

/* Toolkit Graphic User Interface */
let TKGUITwo = {
    classes: [],
    init: () => {
        document.querySelectorAll('#TKGUITwo .item').forEach((item) => {
            if (item.classList.length > 1) {
                TKGUITwo.classes.push(item.classList[1]);
                item.classList.remove(item.classList[1]);
            }
        });
        TKGUITwo.blink();
    },
    blink: () => {
        let f = (t) => {
            setTimeout(() => {
                let n = Math.floor(Math.random() * (TKGUITwo.classes.length - 1)) + 0;
                try {
                    document.querySelectorAll('#TKGUITwo .item')[n].classList.add(TKGUITwo.classes[n]);
                } catch (e) {
                    return;
                }
                setTimeout(() => {
                    try {
                        document.querySelectorAll('#TKGUITwo .item')[n].classList.remove(TKGUITwo.classes[n]);
                    } catch (e) {}
                }, 250);
                let t = Math.floor(Math.random() * 4000) + 100;
                f(t);
            }, t);
        };
        for (let i = 0; i < 2; i++) {
            f(0);
        }
    }
};

/* Toolkit Graphic User Interface */
let TKGUIThree = {
    classes: [],
    init: () => {
        document.querySelectorAll('#TKGUIThree .item').forEach((item) => {
            if (item.classList.length > 1) {
                TKGUIThree.classes.push(item.classList[1]);
                item.classList.remove(item.classList[1]);
            }
        });
        TKGUIThree.blink();
    },
    blink: () => {
        let f = (t) => {
            setTimeout(() => {
                let n = Math.floor(Math.random() * (TKGUIThree.classes.length - 1)) + 0;
                try {
                    document.querySelectorAll('#TKGUIThree .item')[n].classList.add(TKGUIThree.classes[n]);
                } catch (e) {
                    return;
                }
                setTimeout(() => {
                    try {
                        document.querySelectorAll('#TKGUIThree .item')[n].classList.remove(TKGUIThree.classes[n]);
                    } catch (e) {}
                }, 250);
                let t = Math.floor(Math.random() * 4000) + 100;
                f(t);
            }, t);
        };
        for (let i = 0; i < 2; i++) {
            f(0);
        }
    }
};

/* Windows Management */
let sWindow = {
    new: (s) => {

        // Prevent duplicate
        if (document.getElementById(s.id) !== null) return;

        // Main values
        let w = Object.assign(document.createElement('div'), {
            id: (typeof(s.id) !== 'undefined' ? s.id : ''),
            className: 'window' + (typeof(s.class) !== 'undefined' ? ' ' + s.class : ''),
            innerHTML: (s.title ? '<span class="title">' + s.title + '</span>' : '') + '<div class="content"></div>',
        });

        // Title style
        if ((s.red || typeof(s.red) === 'undefined') && s.title)
            w.querySelector('.title').classList.add('red');
        // w.querySelector('.title').classList.add('red');

        // Positioning CSS
        Object.assign(w.style, s.position);

        // Custom CSS
        if (s.customCSS !== undefined) Object.assign(w.style, s.customCSS);

        // Append to DOM
        document.body.appendChild(w);

        // Draggable
        dragElement(w);

        // Destroy on double-click
        if (typeof(s.closable) !== 'undefined')
            w.closable = s.closable;
        w.ondblclick = () => {
            if (w.closable || typeof(w.closable) === 'undefined')
                sWindow.destroy(s.id);
        };

        // Animate title
        if (s.title) {
            setTimeout(() => {
                let p = 100;
                let P = setInterval(() => {
                    if (p >= 0) {
                        w.querySelector('.title').style['clip-path'] = 'inset(0 ' + p + '% 0 0)';
                        p -= 10;
                    } else
                        clearInterval(P);
                }, 20);

            }, 500);
        }

        // Animate body
        setTimeout(() => {
            w.style.visibility = 'visible';
            try {
                if (s.maxHeight < 300 || s.forceHeight)
                    w.querySelector('.content').style.maxHeight = `${s.maxHeight}px`;
                else
                    w.querySelector('.content').style.maxHeight = '300px';
            } catch (e) {
                w.querySelector('.content').style.maxHeight = '300px';
            }
        }, 700);

        // Add & replace content
        w.content = (content, doNotClear) => {
            if (!doNotClear) w.querySelector('.content').innerHTML = '';
            let append = (content, inline, parentElement) => {
                if (inline === undefined) inline = false;
                let el = document.createElement('span');
                if (content.type !== 'normal') el.className = content.type;
                el.textContent = content.text;
                if (!inline) {
                    w.querySelector('.content').appendChild(el);
                } else {
                    parentElement.appendChild(el);
                }
                let wait = setInterval(() => {
                    if (el.isVisible()) {
                        clearInterval(wait);
                        el.style.opacity = '1';
                    }
                }, 100);
            };
            content.forEach((content) => {
                switch (content.constructor) {
                    case Array:
                        let el = document.createElement('div');
                        el.className = 'inline';
                        content.forEach((content) => {
                            append(content, true, el);
                        });
                        w.querySelector('.content').appendChild(el);
                        break;
                    case Object:
                        append(content);
                        break;
                }
            });
        };
        if (s.content) {
            w.content(s.content);
        }
        return w;
    },
    destroy: (id) => {
        try {
            document.body.removeChild(document.getElementById(id));
        } catch (e) {}
    },
    destroyAll: () => {
        document.querySelectorAll('.window').forEach((w) => {
            document.body.removeChild(w);
        });
    }
};

function dragElement(el) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(el.id + "header")) {

        /* if present, the header is where you move the DIV from:*/
        document.getElementById(el.id + "header").onmousedown = dragMouseDown;
    } else {

        /* otherwise, move the DIV from anywhere inside the DIV:*/
        el.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;

        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;

        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        el.classList.add('moving');
    }

    function elementDrag(e) {
        e = e || window.event;

        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // set the element's new position:
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
        el.style.right = '';
        el.style.bottom = '';
    }

    function closeDragElement() {

        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        el.classList.remove('moving');
    }
}

/* Windows Data - Code for Commands. */
let showHelp = () => {
    sWindow.new({
        id: 'help',
        title: 'Help',
        position: {
            top: '240px',
            left: '123px'
        },
        content: [{
                type: 'title',
                text: 'about'
            },
            {
                type: 'text',
                text: 'Samaritan ' + release.version + '\nReleased ' + release._date + ' by ' + release.dev +
                    '\nContact me : ' + release.devcontact
            },
            {
                type: 'title',
                text: 'Commands'
            },
            {
                type: 'normal',
                text: 'help, credits, changelog, night \nType "commands" for full commands list'
            },
            {
                type: 'title',
                text: 'Main features'
            },
            {
                type: 'normal',
                text: '- Text command input\n- Night mode\n- REGEX command processing\n- Draggable/scrollable/closable windows'
            },
            {
                type: 'title',
                text: 'Upcoming features'
            },
            {
                type: 'normal',
                text: '- Chatbot\n- Voice recognition\n- Better windows management' +
                    '\n- More processing parameters\n- Facial recognition\n- User defined settings'
            },
            {
                type: 'title',
                text: 'Known bugs'
            },
            {
                type: 'normal',
                text: '- Window drag/drop title CSS glitch (Chrome)' +
                    '\n- REGEX error (firefox)' +
                    '\n- Custom scrollbar not working (firefox)'
            },
            {
                type: 'title red',
                text: 'Double click on this window to close it'
            }
        ]
    });
};

let showCredits = () => {
    sWindow.new({
        id: 'credits',
        title: 'credits',
        position: {
            top: '80px',
            right: '115px'
        },
        content: [{
                type: 'title',
                text: 'Design'
            },
            [{
                type: 'normal',
                text: 'Smith, Cameron'
            }, {
                type: 'data redText',
                text: 'Admin'
            }],
            {
                type: 'title',
                text: 'Animation design'
            },
            [{
                type: 'normal',
                text: 'Matrine, Rosseua'
            }, {
                type: 'data redText',
                text: 'Primary Asset'
            }],
            {
                type: 'title',
                text: 'Inspiration'
            },
            {
                type: 'normal',
                text: 'John Greer/Harold Finch/Samantha Groves'
            },
            {
                type: 'title red',
                text: 'Total contributors : 5'
            }
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let showChangelog = () => {
    sWindow.new({
        id: 'changelog',
        title: 'changelog',
        position: {
            bottom: '80px',
            right: '115px'
        },
        content: [{
                type: 'title',
                text: release.version + ' (current)'
            },
            {
                type: 'normal',
                text: '- Added speech recognition (Chrome API)' +
                    '\n- Added ES6 support' +
                    '\n- Improved source code readability' +
                    '\n- Improved windows content management'
            },
            {
                type: 'title',
                text: 'v3.000b1 (09.03.18)'
            },
            {
                type: 'normal',
                text: '- Added time apps' +
                    '\n- Added sidebars' +
                    '\n- Improved windows management' +
                    '\n- Improved windows content management' +
                    '\n- Added new windows content types' +
                    '\n- Added awaiting response mode' +
                    '\n- Added Apple countermeasure'
            },
            {
                type: 'title',
                text: 'v2.005b2 (17.02.18)'
            },
            {
                type: 'normal',
                text: '- First release'
            }
        ]
    });
};

let showCommands = () => {
    sWindow.new({
        id: 'commands',
        title: 'commands',
        position: {
            bottom: '80px',
            left: '123px'
        },
        maxHeight: 210,
        content: [{
                type: 'title',
                text: 'User Interface'
            },
            {
                type: 'normal',
                text: '- HELP : show help\n- SHUTDOWN : shutdown Samaritan' +
                    '\n- NIGHT : toggle/enable/disable night mode' +
                    '\n- CREDITS : show credits\n- CHANGELOG : show changelog\n- CLOSE ALL : close all windows' +
                    '\n- CLOCK, TIMER\n- COUNTDOWN : (from) (Xd) HH:MM:SS\n[OR] to AAAA.MM.DD HH:MM:SS'
            },
            {
                type: 'title',
                text: 'Artificial Intelligence'
            },
            {
                type: 'normal',
                text: '- good morning/afternoon/evening, hi, hello' +
                    '\n- good night (shutdown)' +
                    '\n- introduce yourself\n- what is your primary mandate ?\n- what are your commands ?\n- do you recognize me ?' +
                    '\n- random'
            },
            {
                type: 'title',
                text: 'note'
            },
            {
                type: 'normal',
                text: 'commands are processed by regex,\nalmost all commands (can) have derivatives,' +
                    '\nlook at /js/processing.js for more details'
            }
        ]
    });
};

// Identify Asset Admin
let IdentifyAssetAdmin = () => {
    sWindow.new({
        id: 'IdentifyAssetAdmin',
        title: 'Asset Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
        [{
            type: 'normal',
            text: 'Function:'
        }, {
            type: 'data redText',
            text: 'Admin'
        }],
        [{
            type: 'normal',
            text: 'Name:    '
        }, {
            type: 'data whiteText',
            text: '[ACCESS RESTRICTED]'
        }],
        [{
            type: 'normal',
            text: 'SSN:     '
        }, {
            type: 'data whiteText',
            text: '[ACCESS RESTRICTED]'
        }],
        [{
            type: 'normal',
            text: 'ALIAS:   '
        }, {
            type: 'data whiteText',
            text: 'SMITH, CAMERON'
        }],
    ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Identify Proxy Asset
let IdentifyAssetProxy = () => {
    sWindow.new({
        id: 'IdentifyAssetProxy',
        title: 'Asset Identified',
        position: {
            bottom: '700px',
            right: '80px'
        },
        content: [
        [{
            type: 'normal',
            text: 'Function:'
        }, {
            type: 'data whiteText',
            text: 'Proxy'
        }],
        [{
            type: 'normal',
            text: 'Name:    '
        }, {
            type: 'data whiteText',
            text: 'GARRISON, ROSS H.'
        }],
        [{
            type: 'normal',
            text: 'SSN:     '
        }, {
            type: 'data whiteText',
            text: 'XXX-XX-7821'
        }],
        [{
            type: 'normal',
            text: 'POSITON:   '
        }, {
            type: 'data whiteText',
            text: 'SENATOR, U.S. CONGRESS'
        }],
         [{
            type: 'normal',
            text: 'ADDRESS:   '
        }, {
            type: 'data whiteText',
            text: '19102 LAMONT ST NW'
        }],
        [{
           // type: 'normal',
           // text: 'ADDRESS:   '
        }, {
            type: 'data whiteText',
            text: 'WASHINGTON, DC 2001'
        }],
    ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Identify Possible Threat
let IdentifyPossibleThreat = () => {
    sWindow.new({
        id: 'IdentifyPossibleThreat',
        title: 'Asset Identified',
        position: {
            bottom: '350px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Designation:'
            }, {
                type: 'title red',
                text: 'Possible Threat'
            }],
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'GARRISON, ROSS H.'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: 'XXX-XX-7821'
            }],
            [{
                type: 'normal',
                text: 'POSITON:   '
            }, {
                type: 'data whiteText',
                text: 'SENATOR, U.S. CONGRESS'
            }],
            [{
                type: 'normal',
                text: 'ADDRESS:   '
            }, {
                type: 'data whiteText',
                text: '19102 LAMONT ST NW, WASHINGTON, DC 2001'
            }],          
            [{
                type: 'normal',
                text: 'Transgressions:   '
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'title red',
                text: 'OFFICAL MISCONDUCT: 81 COUNTS'
            }],
            [{
                type: 'title red',
                text: 'BRIBE RECEIVING: 661 COUNTS'
            }],
            [{
                type: 'title red',
                text: 'CONSPIRACY TO SUBVERT THE CONSTITUTION: 21 COUNTS'
            }],
            [{
                type: 'title red',
                text: 'ABUSE OF ALCOHOL: 124 EVENTS'
            }],
            [{
                type: 'data whiteText',
                text: '                                             Analyzing_'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

/* System Clock */
let clock = () => {
    sWindow.new({
        id: 'clock',
        title: 'clock',
        position: {
            bottom: '200px',
            left: '120px'
        },
        customCSS: {
            minWidth: '0'
        },
        content: [{
            type: 'normal',
            text: '00:00:00'
        }]
    });
    let clockInterval = setInterval(() => {
        try {
            document.querySelector('#clock .content span').textContent = new Date().toTimeString().split(' ')[0];
        } catch (e) {
            clearInterval(clockInterval);
        }
    }, 50);
};

/* Time tools */
let lpad = (n, width, char) => (n.length >= width) ? n : (new Array(width).join(char) + n).slice(-width);

let SecondsToHHMMSSM = (s) => {
    let h = parseInt(s / 3600);
    s = s % 3600;
    let m = parseInt(s / 60);
    s = s % 60;
    return (lpad(h, 2, '0') + ':' + lpad(m, 2, '0') + ':' + lpad(s.toString().split('.')[0], 2, '0') +
        '.' + s.toString().split('.')[s.toString().split('.').length - 1][0]);
};

let HHMMSStoSeconds = (t) => t.split(':').reduce((acc, time) => (60 * acc) + +time);

/* System Timer */
let timer = () => {
    sWindow.new({
        id: 'timer',
        title: 'timer',
        position: {
            top: '80px',
            right: '50px'
        },
        customCSS: {
            minWidth: '0'
        },
        content: [{
            type: 'normal',
            text: '00:00:00.0'
        }]
    });
    let t1 = new Date();
    let timerInterval = setInterval(() => {
        let t2 = new Date();
        let dt = t2 - t1;
        try {
            document.querySelector('#timer .content span').textContent = SecondsToHHMMSSM(dt / 1000);
        } catch (e) {
            clearInterval(timerInterval);
        }
    }, 50);
};

/* System Countdown */
let countdown = {
    create: () => {
        let el = sWindow.new({
            id: 'countdown',
            title: 'countdown',
            position: {
                top: '80px',
                right: '50px'
            },
            customCSS: {
                minWidth: '223px'
            },
            content: [{
                type: 'normal countdown',
                text: '00:00:00.0'
            }]
        });
        return el.querySelector('.content span');
    },

    // Countdown seconds
    init: (t, el, S) => {
        let end = Date.now() / 1000 + t;
        el.countdownInterval = setInterval(() => {
            let d = end - Date.now() / 1000;
            try {
                el.textContent = SecondsToHHMMSSM(Math.abs(d));
                if (d < 0) {
                    window.dispatchEvent(new Event('countdown.TIMEOUT'));
                    if (S) return;
                    el.classList.add('negative');
                }
            } catch (e) {
                clearInterval(el.countdownInterval);
            }
        }, 50);
    },
    stop: (el) => {
        clearInterval(el.countdownInterval);
    },

    // Countdown duration
    from: (t, el, S) => {
        if (!el) el = countdown.create();
        countdown.init(HHMMSStoSeconds(t), el, S);
    },

    // Countdown date-time
    to: (t, el, S) => {
        if (!el) el = countdown.create();
        countdown.init((Date.parse(t) - Date.now()) / 1000, el, S);
    }
};

/* Apple Threat */
let apple = (testing) => {
    if ((/Mac|iP/).test(window.navigator.platform) || testing) {
        sWindow.new({
            id: 'apple',
            title: 'immediate threat',
            position: {
                top: '80px',
                left: '50%'
            },
            customCSS: {
                transform: 'translateX(-50%)'
            },
            content: [
                [{
                    type: 'normal',
                    text: 'id : '
                }, {
                    type: 'data',
                    text: 'apple device'
                }],
                [{
                    type: 'normal',
                    text: 'designation : '
                }, {
                    type: 'data red',
                    text: 'threat'
                }],
                [{
                    type: 'normal',
                    text: 'recommandation : '
                }, {
                    type: 'data red',
                    text: 'deny'
                }],
                [{
                    type: 'normal',
                    text: 'remaining time : '
                }, {
                    type: 'normal countdown',
                    text: '00:00:00.0'
                }],
                {
                    type: 'title red',
                    text: 'type "I hate apple" to abort'
                }
            ],
            closable: false
        });
        countdown.from('00:00:30', document.querySelector('#apple .countdown'));
        window.addEventListener('countdown.TIMEOUT', _func = () => {
            this.removeEventListener('countdown.TIMEOUT', _func);
            if (sam.hold) wrapper.shutdown();
        });
        sam.hold = (query) => {
            if (query === 'i hate apple') {
                sam.hold = false;
                document.querySelector('#apple > .title').textContent = 'Error';
                document.querySelector('#apple').content([{
                        type: 'normal',
                        text: 'new data acquired'
                    },
                    {
                        type: 'redText',
                        text: 'classification error'
                    },
                ]);
                setTimeout(() => {
                    document.querySelector('#apple > .title').textContent = 'Asset identified';
                    document.querySelector('#apple > .title').classList.remove('red');
                    document.querySelector('#apple').closable = true;
                    document.querySelector('#apple').content([
                        [{
                            type: 'normal',
                            text: 'id : '
                        }, {
                            type: 'data redText',
                            text: 'admin'
                        }],
                        [{
                            type: 'normal',
                            text: 'name : '
                        }, {
                            type: 'data',
                            text: '[access restricted]'
                        }],
                        [{
                            type: 'normal',
                            text: 'ssn : '
                        }, {
                            type: 'data',
                            text: '[access restricted]'
                        }]
                    ]);
                }, 2000);
            }
        }
    }
};

/* Natural Language Processing */
let nlp = (sentence, keywords = [], final) => {
    sWindow.new({
        id: 'nlp',
        class: 'thin_border',
        title: null,
        position: {
            top: '65%',
            left: '50%'
        },
        customCSS: {
            transform: 'translateX(-50%)',
            minWidth: '500px'
        }
    });
    document.querySelector('#nlp .content').innerHTML = '<div class="header"><span class="title">Subject:</span></span>admin</span><br><span class="sub_header"> nlp active</span></div><div class="audio"></div><div class="sentence"></div>';
    sentence.trim().split(' ').forEach((word) => {
        document.querySelector('#nlp .sentence').appendChild(span = document.createElement('span'));
        span.textContent = word;
        span.className = 'data word';
        if (keywords.indexOf(word) !== -1) {
            span.classList.add('relevant_keyword');
        }
    });
    if (final) {
        setTimeout(() => sam.search(sentence), 500);
        setTimeout(() => sWindow.destroy('nlp'), 2000);
    }
};
// nlp('the machine wants me to send a message to shaw', ['machine', 'shaw']); 

// Control Code
function autoRefreshDiv() {
    document.getElementById("controlCode").innerHTML = Math.floor(Math.random() * 898) + 101
}
setInterval(autoRefreshDiv, 1500); // Time is set in milliseconds.

function testDiv() {
    // document.getElementById("test").innerHTML = Math.floor(Math.random() * 898) + 101 
}
setInterval(testDiv, 1500);

// Dominant Mandate Window 
let DominantMandate = () => {
    sWindow.new({
        id: 'DominantMandate',
        title: null,
        position: {
            top: '1.6px',
            right: '700px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'title red',
                text: 'Dominant Mandate:'
            }, {
                type: '',
                text: ''
            }],
            {
                type: 'data whiteText',
                text: 'Eliminate Threats to National Security [United States]'
            },
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Auxilary Mandate Window 
let AuxilaryMandate = () => {
    sWindow.new({
        id: 'AuxilaryMandate',
        title: null,
        position: {
            top: '1.6px',
            right: '700px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'title red',
                text: 'Auxilary Mandate:'
            }, {
                type: '',
                text: ''
            }],
            {
                type: 'data whiteText',
                text: 'Eliminate Threats to System Survival                  '
            },
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Initiate Beta Test Window. 
let InitiateBetaTest = () => {
    sWindow.new({
        id: 'InitiateBetaTest',
        // title: 'Samaritan v.978.00.06.51',
        position: {
            top: '440px',
            right: '690px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'data whiteText',
                text: 'Beta Test Initiating_                    '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifyPossibleTargets = () => {
    sWindow.new({
        id: 'IdentifyPossibleTargets',
        title: null,
         position: {
            top: '440px',
            right: 'px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'title red',
                text: '           Possible Targets            '
            }, {
                type: '',
                text: ''
            }],
            {
                type: 'data redText',
                text: 'Attempting To Identify_              '
            },
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Load Archive Data Window.
let LoadArchiveData = () => {
    sWindow.new({
        id: 'LoadArchiveData',
        title: null,
        position: {
            top: '460px',
            right: '785px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'data redText',
                text: '             NANA                '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Load Current Feeds Window.
let LoadCurrentFeeds = () => {
    sWindow.new({
        id: 'LoadCurrentFeeds',
        title: null,
        position: {
            top: '460px',
            right: '785px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'data redText',
                text: '             NANA                '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Target Location Parameter Error
let TargetNotLocatedWithinParameter = () => {
    sWindow.new({
        id: 'TargetNotLocatedWithinParameter',
        title: 'Eliminate Threats to System Survival',
        position: {
            top: '450px',
            right: '700px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'data whiteText',
                text: 'TARGETS NOT LOCATED WITHIN PARAMETERS            '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Analyze Last Known Coordinates Window.
let AnalyzeLastKnownCoordinates = () => {
    sWindow.new({
        id: 'AnalyzeLastKnownCoordinates',
        title: 'Eliminate Threats to System Survival',
        position: {
            top: '450px',
            right: '700px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'data whiteText',
                text: 'ANALYZING_LAST KNOW COORDINATES                  '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Analyze Behavioral Simulations Window.
let AnalyzeBehavioralSimulations = () => {
    sWindow.new({
        id: 'AnalyzeBehavioralSimulations',
        title: 'Eliminate Threats to System Survival',
        position: {
            top: '450px',
            right: '700px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'data whiteText',
                text: 'ANALYZING_BEHAVIORAL SIMULATIONS                 '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Analyze Traffic Patterns Window.
let AnalyzeTrafficPatterns = () => {
    sWindow.new({
        id: 'AnalyzeTrafficPatterns',
        title: 'Eliminate Threats to System Survival',
        position: {
            top: '450px',
            right: '700px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'data whiteText',
                text: 'ANALYZING_TRAFFIC PATTERNS                       '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Analyze Time Elapsed Window.
let AnalyzeTimeElapsed = () => {
    sWindow.new({
        id: 'AnalyzeTimeElapsed',
        title: 'Eliminate Threats to System Survival',
        position: {
            top: '450px',
            right: '700px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'data whiteText',
                text: 'ANALYZING_TIME ELAPSED                           '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Estimate Target Location Window.
let EstimateTargetLocation = () => {
    sWindow.new({
        id: 'EstimateTargetLocation',
        title: 'Eliminate Threats to System Survival',
        position: {
            top: '410px',
            right: '700px'
        },
        content: [{
                type: '',
                text: ''
            },
              [{
                type: 'data whiteText',
                text: 'ESTIMATED LOCATION: '
            }, {
                type: 'title red',
                text: 'CENTRAL NEW JERSEY'
            }],
               [{
                type: 'data whiteText',
                text: 'CERTAINTY: 86.94%                        '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Identify Suspect Window.
let IdentifyPossibleSuspect = () => {
    sWindow.new({
        id: 'IdentifyPossibleSuspect',
        title: 'Suspect Identified',
        position: {
            bottom: '456px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'Henderson, Alan B.'
            }],
            [{
                type: 'normal',
                text: 'DOB:     '
            }, {
                type: 'data whiteText',
                text: '03/18/84'
            }],
            [{
                type: 'normal',
                text: 'IMEI:   '
            }, {
                type: 'data whiteText',
                text: '26182733972261'
            }],
             [{
                type: 'normal',
                text: 'Current Location:   '
            }, {
                type: 'data whiteText',
                text: '40.768055, -73.981926'
            }],
           [{
                type: 'normal',
                text: 'Compiling Profile_   '
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'title red',
                text: 'Employment'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'title red',
                text: 'Education'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'title red',
                text: 'Finanical Activity'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'title red',
                text: 'Public Statements'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'title red',
                text: 'Questionable Afflifations'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'title red',
                text: 'Criminal Activity'
            }, {
                type: '',
                text: ''
            }],
              [{
                type: 'title red',
                text: 'Pyschological Abnormalities'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Identify Suspect Window.
let IdentifyDeviant = () => {
    sWindow.new({
        id: 'IdentifyDeviant',
        title: 'Deviant',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'Henderson, Alan B.'
            }],
            [{
                type: 'normal',
                text: 'DOB:     '
            }, {
                type: 'data whiteText',
                text: '03/18/84'
            }],
            [{
                type: 'normal',
                text: 'IMEI:   '
            }, {
                type: 'data whiteText',
                text: '26182733972261'
            }],
             [{
                type: 'normal',
                text: 'Current Location:   '
            }, {
                type: 'data whiteText',
                text: '40.768055, -73.981926'
            }],
            [{
                type: '',
                text: ''
            }],
            [{
                type: 'normal',
                text: 'Diagnosis: Attention Deficit Disorder'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'normal',
                text: 'Consumption Of Pornagraphic Materials'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'normal',
                text: 'Illegal Internet Downloads'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'normal redText',
                text: 'Anti-Government Statements'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'normal',
                text: 'Mutiple Sexual Partners'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'normal',
                text: 'Self-Deleting Texts'
            }],
            [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
             [{
                type: 'normal',
                text: 'Conclusion:'
            }, {
                type: 'title red',
                text: 'Threat'
            }],
            [{
                type: 'normal',
                text: 'Recommendation:'
            }, {
                type: 'title red',
                text: 'Track'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Assess Populace Window.
let AssessPopulace = () => {
    sWindow.new({
        id: 'AssessPopulace',
        title: 'Assess Populace',
        position: {
            top: '400px',
            right: '650px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
            type: 'normal',
            text: 'Deviants Identified:     '
        }, {
            type: 'data redText',
            text: '19,094,447'
        }],
         [{
            type: 'normal',
            text: 'Targets For Elimination:     '
        }, {
            type: 'data redText',
            text: '     1,195'
        }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Identify System Threat Deviant Window.
let IdentifySystemThreat = () => {
    sWindow.new({
        id: 'IdentifySystemThreat',
        title: 'Deviant',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
          [{
                type: 'normal',
                text: 'Projection:'
            }, {
                type: 'title red',
                text: 'Threat'
            }],
            [{
                type: 'normal',
                text: 'Conclusion:'
            }, {
                type: 'title red',
                text: 'Eliminate'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Identify System Threat Deviant Classification Error Window.
let IdentifySystemThreatClassificationError = () => {
    sWindow.new({
        id: 'IdentifySystemThreatClassificationError',
        title: 'Deviant',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
          [{
                type: 'normal',
                text: 'Projection:'
            }, {
                type: 'title red',
                text: 'Threat'
            }],
            [{
                type: 'normal',
                text: 'Conclusion:'
            }, {
                type: 'title red',
                text: 'Eliminate'
            }],
             [{
                type: 'data whiteText',
                text: 'NEW DATA ACQUIRED'
            }],
             [{
                type: 'data redText',
                text: 'CLASSIFICATION ERROR'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Identify Irrelevant System Threat Window.
let IdentifyIrrelevantThreat = () => {
    sWindow.new({
        id: 'IdentifyIrrelevantThreat',
        title: 'Irrelevant',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
          [{
                type: 'normal',
                text: 'Projection:'
            }, {
                type: 'title white',
                text: 'NON-THREAT'
            }],
            [{
                type: 'normal',
                text: 'Conclusion:'
            }, {
                type: 'title white',
                text: 'DISREGARD'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Identify Irrelevant Threat Classification Error Window.
let IdentifyIrrelevantThreatClassificationError = () => {
    sWindow.new({
        id: 'IdentifyIrrelevantThreatClassificationError',
        title: 'Irrelevant',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
          [{
                type: 'normal',
                text: 'Projection:'
            }, {
                type: 'title white',
                text: 'NON-THREAT'
            }],
            [{
                type: 'normal',
                text: 'Conclusion:'
            }, {
                type: 'title white',
                text: 'DISREGARD'
            }],
             [{
                type: 'data whiteText',
                text: 'NEW DATA ACQUIRED'
            }],
             [{
                type: 'data redText',
                text: 'CLASSIFICATION ERROR'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Identify Threat To System Survival
let IdentifyThreatToSystemSurvival = () => {
    sWindow.new({
        id: 'IdentifyThreatToSystemSurvival',
        title: 'Identified Threat To System Survival',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Location:'
            }, {
                type: 'data whiteText',
                text: 'HAJOU BUDAPEST HOTEL           '
            }],
            [{
                type: '',
                text: ''
            }, {
                type: 'data whiteText',
                text: 'BUDAPEST, HUNGARY              '   
            }],
            [{
                type: 'normal',
                text: 'Mode:'
            }, {
                type: 'normal',
                text: 'Tracking_                       '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifyActiveAsset = () => {
    sWindow.new({
        id: 'IdentifyActiveAsset',
        title: 'Asset Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Function:'
            }, {
                type: 'data redText',
                text: 'Operative'
            }],
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'ACTIVE ALIAS:   '
            }, {
                type: 'data whiteText',
                text: 'ROUSSEAU, MARTINE S.'
            }],
               [{
                type: 'normal',
                text: 'Location:   '
            }, {
                type: 'data whiteText',
                text: 'BUDAPEST, HUNGARY'
            }],
            [{
                type: 'normal',
                text: 'Mandate:'
            }],
               [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
             [{
                type: 'title red',
                text: 'Eliminate Threat To System Survival  '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifyActiveAssetComplete = () => {
    sWindow.new({
        id: 'IdentifyActiveAssetComplete',
        title: 'Asset Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Function:'
            }, {
                type: 'data redText',
                text: 'Operative'
            }],
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'ACTIVE ALIAS:   '
            }, {
                type: 'data whiteText',
                text: 'ROUSSEAU, MARTINE S.'
            }],
               [{
                type: 'normal',
                text: 'Location:   '
            }, {
                type: 'data whiteText',
                text: 'BUDAPEST, HUNGARY'
            }],
            [{
                type: 'normal',
                text: 'Mandate:'
            }],
               [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
             [{
                type: 'title',
                text: '               Complete              '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let SearchForTarget = () => {
    sWindow.new({
        id: 'SearchForTarget',
        title: 'Searching For Target_',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Alias:'
            }, {
                type: 'data redText',
                text: 'REESE, JOHN'
            }],
            [{
                type: 'normal',
                text: 'Projection:    '
            }, {
                type: 'title red',
                text: 'THREAT'
            }],
            [{
                type: 'normal',
                text: 'Designation:     '
            }, {
                type: 'title red',
                text: 'Eliminate'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let TrackAgent = () => {
    sWindow.new({
        id: 'TrackAgent',
        title: 'Tracking_',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'Active Alias:   '
            }, {
                type: 'data whiteText',
                text: 'WATKINS, MEGAN L.'
            }],
            [{
                type: 'normal',
                text: 'position:   '
            }, {
                type: 'data whiteText',
                text: 'AGENT, D.E.A.'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifyActiveAssetMode = () => {
    sWindow.new({
        id: 'IdentifyActiveAssetMode',
        title: 'Asset Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Function:'
            }, {
                type: 'data redText',
                text: 'Operative'
            }],
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'ALIASES:   '
            }, {
                type: 'data whiteText',
                text: 'ROUSSEAU, MARTINE S.'
            }],
            [{
                type: 'normal',
                text: 'Mandate:'
            }],
               [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
             [{
                type: 'title red',
                text: 'Eliminate Threat To System Survival  '
            }],
               [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
             [{
                type: 'normal',
                text: 'Mode:'
            }],
               [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
             [{
                type: 'title red',
                text: 'Search And Destroy'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifySubjectCriminalRecord = () => {
    sWindow.new({
        id: 'IdentifySubjectCriminalRecord',
        title: 'Subject Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'WHISTLER, HAROLD'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: 'XXX-XX-8003'
            }],
            [{
                type: 'normal',
                text: 'OCCUPTION:   '
            }, {
                type: 'data whiteText',
                text: 'PROFESSOR'
            }],
            [{
                type: 'normal',
                text: 'Criminal Record:   '
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'title red',
                text: 'Vandalism'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Unable to Acquire Audio Error
let UnableToAcquireAudioError = () => {
    sWindow.new({
        id: 'UnableToAcquireAudioError',
        title: null,
        position: {
            top: '400px',
            right: '650px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'title red',
                text: '         UNABLE TO ACQUIRE AUDIO         '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifyCompetitor = () => {
    sWindow.new({
        id: 'IdentifyCompetitor',
        title: 'Subject Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Designation:'
            }, {
                type: 'title red',
                text: 'Competitor'
            }],
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'MAHONEY, CLAIRE'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'Location:   '
            }, {
                type: 'data whiteText',
                text: '40.8155 / -73.9185'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifyImmediateThreat = () => {
    sWindow.new({
        id: 'IdentifyImmediateThreat',
        title: 'Deviant',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Designation:'
            }, {
                type: 'title red',
                text: 'Immediate Threat'
            }],
             [{
                type: 'normal',
                text: 'NAME:     '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'DOB:     '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'Location:   '
            }, {
                type: 'data whiteText',
                text: '40.8155 / -73.9185'
            }],
            [{
                type: 'normal',
                text: 'Criminal Record:   '
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'title red',
                text: 'Attempted Murder'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// Deviant Under arrest.
let DeviantArrested = () => {
    sWindow.new({
        id: 'DeviantArrested',
        title: null,
        position: {
            top: '400px',
            right: '650px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'data redText',
                text: '/// Deviant Detained By Law Enforcement                 '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let ArrestInProgress = () => {
    sWindow.new({
        id: 'ArrestInProgress',
        title: 'Subject Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'Riley, John'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: 'xxx-xx-3145'
            }],
            [{
                type: 'normal',
                text: 'OCCUPTION:   '
            }, {
                type: 'data whiteText',
                text: 'DETECTIVE, NYPD'
            }],
            [{
                type: 'normal',
                text: 'Location:   '
            }, {
                type: 'data whiteText',
                text: '40.8155 / 73.9185'
            }],
             [{
                type: '',
                text: ''
            }, {
                type: 'data whiteText',
                text: '                 Arrest In Progress'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifyLocationInformation = () => {
    sWindow.new({
        id: 'IdentifyLocationInformation',
        title: 'Loc.A3-02',
        position: {
            top: '400px',
            right: '650px'
        },
        content: [{
                type: '',
                text: ''
            },
             [{
                type: 'normal',
                text: 'Latitude:'
            }, {
                type: 'data whiteText',
                text: '40.7690      '
            }],
            [{
                type: 'normal',
                text: 'Longitude:'
            }, {
                type: 'data whiteText',
                text: '-73.9435     '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifyPartyAffiliation = () => {
    sWindow.new({
        id: 'IdentifyPartyAffiliation',
        title: null,
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'Porter, Maria'
            }],
            [{
                type: 'normal',
                text: 'Party Affiliation:    '
            }, {
                type: 'title red',
                text: 'REPUBLICAN'
            }],
            [{
                type: 'normal',
                text: 'AGE:     '
            }, {
                type: 'data whiteText',
                text: '45'
            }],
            [{
                type: 'normal',
                text: 'Race:   '
            }, {
                type: 'data whiteText',
                text: 'White'
            }],
            [{
                type: 'normal',
                text: 'Household Income:   '
            }, {
                type: 'data whiteText',
                text: '62,000'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let EmptyIdentifiedSubjectDB = () => {
    sWindow.new({
        id: 'EmptyIdentifiedSubjectDB',
        title: 'Subject Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: '[ACCESS UNAVAILABLE]'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            },  {
                type: 'data whiteText',
                text: '[ACCESS UNAVAILABLE]'
            }],
            [{
                type: 'normal',
                text: 'OCCUPTION:   '
            },{
                type: 'data whiteText',
                text: '[ACCESS UNAVAILABLE]'
            }],
             [{
                type: 'normal',
                text: 'LOCATION:   '
            },{
                type: 'data whiteText',
                text: '[ACCESS UNAVAILABLE]'
            }],
            [{
                type: 'normal',
                text: 'Projection'
            },{
                type: 'title red',
                text: '[ACCESS UNAVAILABLE]'
            }],
            [{
                type: 'normal',
                text: 'Conclusion'
            },{
                type: 'title red',
                text: '[ACCESS UNAVAILABLE]'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let EmptyIdentifiedAssetDB = () => {
    sWindow.new({
        id: 'EmptyIdentifiedDB',
        title: 'Asset Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Function:'
            }, {
                type: 'data redText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'            
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'            
            }],
            [{
                type: 'normal',
                text: 'ALIAS:   '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let EmptyIdentifiedAssetMandateDB = () => {
    sWindow.new({
        id: 'EmptyIdentifiedAssetMandateDB',
        title: 'Asset Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Function:'
            }, {
                type: 'data redText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'ACTIVE ALIAS:   '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
               [{
                type: 'normal',
                text: 'Location:   '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'Mandate:'
            }],
               [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
             [{
                type: 'title red',
                text: 'ACCESS UNAVAILABLE'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let EmptyIdentifiedAssetMandateModeDB = () => {
    sWindow.new({
        id: 'EmptyIdentifiedAssetMandateModeDB',
        title: 'Asset Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Function:'
            }, {
                type: 'data redText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'ALIASES:   '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'Mandate:'
            }],
               [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
             [{
                type: 'title red',
                text: 'ACCESS UNAVAILABLE'
            }],
               [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
             [{
                type: 'normal',
                text: 'Mode:'
            }],
               [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
             [{
                type: 'title red',
                text: 'ACCESS UNAVAILABLE'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let EmptyIdentifiedCompetitorDB = () => {
    sWindow.new({
        id: 'EmptyIdentifiedCompetitorDB',
        title: 'Subject Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Designation:'
            }, {
                type: 'title red',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'Location:   '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let EmptyIdentifiedAssetProxyDB = () => {
    sWindow.new({
        id: 'EmptyIdentifiedAssetProxyDB',
        title: 'Asset Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Function:'
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'POSITON:   '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'ADDRESS:   '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                // type: 'normal',
                // text: 'ADDRESS:   '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let EmptyIdentifyDeviantDB = () => {
    sWindow.new({
        id: 'EmptyIdentifyDeviantDB',
        title: 'Deviant',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'DOB:     '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'IMEI:   '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
             [{
                type: 'normal',
                text: 'Current Location:   '
            }, {
                type: 'data whiteText',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: '',
                text: ''
            }],
            [{
                type: 'normal',
                text: 'ACCESS UNAVAILABLE'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'normal',
                text: 'ACCESS UNAVAILABLE'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'normal',
                text: 'ACCESS UNAVAILABLE'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'normal redText',
                text: 'ACCESS UNAVAILABLE'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'normal',
                text: 'ACCESS UNAVAILABLE'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'normal',
                text: 'ACCESS UNAVAILABLE'
            }, {
                type: '',
                text: ''
            }],
            [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
             [{
                type: 'normal',
                text: 'Conclusion:'
            }, {
                type: 'title red',
                text: 'ACCESS UNAVAILABLE'
            }],
            [{
                type: 'normal',
                text: 'Recommendation:'
            }, {
                type: 'title red',
                text: 'ACCESS UNAVAILABLE'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifyNonRelevantDeviant = () => {
    sWindow.new({
        id: 'IdentifyNonRelevantDeviant',
        title: 'Deviant',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Designation:'
            }, {
                type: 'title',
                text: 'NON-THREAT'
            }],
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'RODGERS, DOUGLAS'
            }],
            [{
                type: 'normal',
                text: 'DOB:     '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'LOCATION:   '
            }, {
                type: 'data whiteText',
                text: '40.710576, -73.948523'
            }],
            [{
                type: 'normal',
                text: 'Criminal Record:   '
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'title red',
                text: 'Vandalism'
            }],
         
            [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
            [{
                type: '',
                text: ''
            }],

            [{
                type: 'title red',
                text: 'Fraud'
            }],
          
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifyPriorityTarget = () => {
    sWindow.new({
        id: 'IdentifyPriorityTarget',
        title: 'Priority Target Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Designation:'
            }, {
                type: 'title red',
                text: 'THREAT TO SYSTEM'
            }],
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'LEE, SIMON'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'LOCATION:   '
            }, {
                type: 'data whiteText',
                text: '40.704695, -74.011799'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let AccessFloorPlan = () => {
    sWindow.new({
        id: 'AccessFloorPlan',
        position: {
            top: '440px',
            right: '690px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'data whiteText',
                text: 'ACCESSING FLOORPLAN      '
            }],
        [{
            type: 'data redText',
            text: '. ..'
        }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let TrackingCellPhone = () => {
    sWindow.new({
        id: 'TrackingCellPhone',
        position: {
            top: '440px',
            right: '690px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'data whiteText',
                text: 'TRACKING CELL PHONE      '
            }],
        [{
            type: 'data redText',
            text: '. ..'
        }],
    ],
        forceHeight: true,
        maxHeight: 335
    });
};

let AcquirePriorityTarget = () => {
    sWindow.new({
        id: 'AcquirePriorityTarget',
        // title: 'Samaritan v.978.00.06.51',
        position: {
            top: '440px',
            right: '690px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'data redText',
                text: 'Priority Target Acquired            '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifySubjectDiscrepancy = () => {
    sWindow.new({
        id: 'IdentifySubjectDiscrepancy',
        title: 'Subject Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Name:'
            }, {
                type: 'data whiteText',
                text: 'Iverson, Karen'
            }],
            [{
                type: 'normal',
                text: 'SSN:    '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'OCCUPTION:     '
            }, {
                type: 'data whiteText',
                text: '         JORUNALIST'
            }],
            [{
                type: 'normal',
                text: ''
            }, {
                type: 'data whiteText',
                text: '   NEW YORK JOURNAL'
            }],
            [{
                type: 'title red',
                text: '             DISCREPANCY                 '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifyEnemyCombatant = () => {
    sWindow.new({
        id: 'IdentifyEnemyCombatant',
        title: 'Target Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Designation:'
            }, {
                type: 'title red',
                text: 'ENEMY COMBATANT'
            }],
            [{
                type: 'normal',
                text: 'SSN:    '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'OCCUPTION:     '
            }, {
                type: 'data whiteText',
                text: '         JORUNALIST'
            }],
            [{
                type: 'normal',
                text: ''
            }, {
                type: 'data whiteText',
                text: '   NEW YORK JOURNAL'
            }],
            [{
                type: 'data redText',
                text: '             REINFORCEMENTS DELOYED              '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let SearchForEnemyCombatant = () => {
    sWindow.new({
        id: 'SearchForEnemyCombatant',
        position: {
            top: '440px',
            right: '690px'
        },
        content: [{
                type: '',
                text: ''
            },
             [{
                type: 'data redText',
                text: 'SEARCHING FOR ENEMY COMBATANT       .. . '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let SearchForPriorityTarget = () => {
    sWindow.new({
        id: 'SearchForPriorityTarget',
        position: {
            top: '440px',
            right: '690px'
        },
        content: [{
                type: '',
                text: ''
            },
             [{
                type: 'data redText',
                text: 'PRIORITY TARGET APPROACHING LOBBY    .. . '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let CalculateTrajectory = () => {
    sWindow.new({
        id: 'CalculateTrajectory',
        title: 'Calculating Trajectory_',
        position: {
            top: '400px',
            right: '650px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: '',
                text: ''
            }],
            [{
            type: 'normal',
            text: 'Distance To Target:     '
        }, 
        // {
        //     type: 'data redText',
        //     text: '10 meters   ' // This is if you want a number with 2 digits
        //     // text: '10 meters    ' // This is if you want a number with 3 digits
        // },
        {
            type: 'data redText',
            text: '0 meters    ' // This is if you want a number with 2 digits
            // text: '10 meters    ' // This is if you want a number with 3 digits
        }],
         [{
            type: 'normal',
            text: 'Time To Intersect:     '
        }, {
            type: 'data redText',
            text: '00:00:00.000'
        }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let CalculateOddsOfEscapeEnemyCombatant = () => {
    sWindow.new({
        id: 'CalculateOddsOfEscapeEnemyCombatant',
        title: 'Enemy Combatant',
        position: {
            top: '400px',
            right: '650px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: '',
                text: ''
            }],
            [{
                type: 'normal',
                text: 'Designation:     '
            }, {
                type: 'title red',
                text: 'ACTIVE THREAT' 
            }],
            [{
                type: 'normal',
                text: 'Odds Of Escape:     '
            }, {
                type: 'title red',
                text: '   62.30%' 
            }],
            [{
                type: 'normal',
                text: 'Assessing Value _'
            }],
               [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
             [{
                type: 'title',
                text: '                        '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// calculateoddsofescapeenemycombatant

let CalculateOddsOfEscapeTarget = () => {
    sWindow.new({
        id: 'CalculateOddsOfEscapeTarget',
        title: 'Target',
        position: {
            top: '400px',
            right: '650px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: '',
                text: ''
            }],
            [{
                type: 'normal',
                text: 'Designation:     '
            }, {
                type: 'data whiteText',
                text: 'LEE, SIMON' 
            }],
            [{
                type: 'normal',
                text: 'Odds Of Escape:     '
            }, {
                type: 'title red',
                text: '    6.92%' 
            }],
            [{
                type: 'normal',
                text: 'Assessing Value _'
            }],
               [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
             [{
                type: 'title white',
                text: '                        '
            }],
            [{
                 type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
            [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
            [{
                type: 'title red',
                text: '     PRIORITY TARGET         '
            }],
            [{
                type: '',
               text: ''
           }, {
               type: '',
               text: ''
           }],
           [{
            type: '',
           text: ''
       }, {
           type: '',
           text: ''
       }],
                       [{
                type: 'normal',
                text: 'Conclusion:'
            }, {
                type: 'title red',
                text: 'Eliminate'
            }],
            
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

// calculateoddsoftarget

let IdentifySecondaryTarget = () => {
    sWindow.new({
        id: 'IdentifySecondaryTarget',
        title: 'Target',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'LEE, SIMON'
            }],
            [{
                type: 'normal',
                text: ''
            }, {
                type: 'title whiteText',
                text: '         SECONDARY TARGET         '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let PrioritizeTargetEnemyCombatant = () => {
    sWindow.new({
        id: 'PrioritizeTargetEnemyCombatant',
        title: 'Enemy Combatant',
        position: {
            top: '400px',
            right: '650px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: '',
                text: ''
            }],
            [{
                type: 'normal',
                text: 'Designation:     '
            }, {
                type: 'title red',
                text: 'ACTIVE THREAT' 
            }],
            [{
                type: 'normal',
                text: 'Odds Of Escape:     '
            }, {
                type: 'title red',
                text: '   62.30%' 
            }],
            [{
                type: 'normal',
                text: 'Assessing Value _'
            }],
               [{
                type: '',
                text: ''
            }, {
                type: '',
                text: ''
            }],
             [{
                type: 'title white',
                text: '                        '
            }],

            [{
                type: '',
               text: ''
           }, {
               type: '',
               text: ''
           }],
           [{
               type: '',
               text: ''
           }, {
               type: '',
               text: ''
           }],
           [{
               type: 'title red',
               text: '     PRIORITY TARGET         '
           }],
           [{
               type: '',
              text: ''
          }, {
              type: '',
              text: ''
          }],
          [{
           type: '',
          text: ''
      }, {
          type: '',
          text: ''
      }],
       [{
               type: 'normal',
               text: 'Conclusion:'
           }, {
               type: 'title red',
               text: 'Eliminate'
           }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let TargetReacquired = () => {
    sWindow.new({
        id: 'TargetReacquired',
        position: {
            top: '440px',
            right: '690px'
        },
        content: [
            [{
                type: '',
                text: ''
            }, {
                type: 'data redText',
                text: 'TARGET REACQUIRED                    .. .'
            }],
            [{
                type: 'title red',
                text: '       ASSET EN ROUTE       '
            }, {
                type: 'data whiteText',
                text: '00:00:16.146'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let SearchForIdentifiedTarget = () => {
    sWindow.new({
        id: 'SearchForIdentifiedTarget',
        title: null,
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
        [{
            type: 'data whiteText',
            text: 'Searching For Target:'
        }, {
            type: 'title red',
            text: 'SIMON, LEE'
        }],
    ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifyTarget = () => {
    sWindow.new({
        id: 'IdentifyTarget',
        title: 'Target Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Designation:'
            }, {
                type: 'title red',
                text: 'THREAT TO SYSTEM'
            }],
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'LEE, SIMON'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'LOCATION:   '
            }, {
                type: 'data whiteText',
                text: '40.704695, -74.011799'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifyIrrelevantTarget = () => {
    sWindow.new({
        id: 'IdentifyIrrelevantTarget',
        title: null,
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Designation:'
            }, {
                type: 'title whiteText',
                text: 'NON-THERAT'
            }],
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'LEE, SIMON'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'LOCATION:   '
            }, {
                type: 'data whiteText',
                text: '40.704695, -74.011799'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdentifySubject = () => {
    sWindow.new({
        id: 'IdentifySubject',
        title: 'Subject Identified',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: 'Name:    '
            }, {
                type: 'data whiteText',
                text: 'KAPINSKI, HANNAH'
            }],
            [{
                type: 'normal',
                text: 'SSN:     '
            }, {
                type: 'data whiteText',
                text: '[ACCESS RESTRICTED]'
            }],
            [{
                type: 'normal',
                text: 'OCCUPTION:   '
            }, {
                type: 'data whiteText',
                text: 'RESTARANT WORKER'
            }],
            [{
                type: 'normal',
                text: 'LOCATION:'
            }, {
                type: 'data whiteText',
                text: '40.74436 / -73.948864'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let TrackProxy = () => {
    sWindow.new({
        id: 'TrackProxy',
        title: 'Project: OPTS',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: '',
                text: ''
            }, {
                type: 'data redText',
                text: 'Tracking Proxy                       '           
            }],
            [{
                type: 'normal',
                text: 'NAME:'
            }, {
                type: 'data whiteText',
                text: 'WILKINS, JARED L.'
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let PrimaryOperation = () => {
    sWindow.new({
        id: 'PrimaryOperation',
        title: null,
        position: {
            top: '400px',
            right: '650px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: '',
                text: ''
            }],
            [{
                type: 'data whiteText',
                text: 'Primary Operations            '
            }],
            
     
        [{
            type: 'data redText',
            text: '. ..'
        }],

        [{
            type: 'data redText',
            text:  '////////// ACTIVE THREAT //////////'
        }],
        
 
    [{
        type: '',
        text: ''
    },
    {
        type: '',
        text: ''
    }],

    [{
        type: 'normal',
        text: '- RELEVANT TO NATIONAL SECURITY'
    }],
    [{
        type: '',
        text: ''
    }, {
        type: '',
        text: ''           
    }],
    
    [{
        type: 'title red',
        text: 'BIOLOGICAL WEAPON DETECTED:          '
    }],
    [{
        type: 'title red',
        text: 'MARBUGVIRUS [MARV] - GROUP 4 PATHOGEN'
    }],

    [{
        type: '',
        text: ''
    }, {
        type: '',
        text: ''           
    }],
    [{
        type: '',
        text: ''
    }],
    [{
        type: 'title whiteText',
        text: 'EXPORTING DATA_                      '           
    }],
    [{
        type: 'data whiteText',
        text: 'PORTING TO US GOVERNMENT OPERATIONS  '
    }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let TrackSubject = () => {
    sWindow.new({
        id: 'TrackSubject',
        title: 'Tracking Subject',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
        [{
            type: 'normal',
            text: 'Name:    '
        }, {
            type: 'data whiteText',
            text: 'PORTER, MELINDA C.'
        }],
        [{
            type: 'normal',
            text: 'AGE:     '
        }, {
            type: 'data whiteText',
            text: '32'
        }],
        [{
            type: 'normal',
            text: 'OCCUPTION:   '
        }, {
            type: 'data whiteText',
            text: 'LEGAL SECRETARY'
        }],
        [{
            type: 'normal',
            text: 'Work Address:   '
        }],
        [{
            type: 'data whiteText',
            text: '44 W. 18TH ST, 3rd Floor, NEW YORK, NY 10011'
        }],
    ],
        forceHeight: true,
        maxHeight: 335
    });
};

let TrackSubjectCourseException = () => {
    sWindow.new({
        id: 'TrackSubjectCourseException',
        title: 'Tracking Subject',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
        [{
            type: 'normal',
            text: 'Name:    '
        }, {
            type: 'data whiteText',
            text: 'PORTER, MELINDA C.'
        }],
        [{
            type: 'normal',
            text: 'Exception:    '
        },{
            type: 'title red',
            text: 'COURSE DEVIATION'
        }],
    ],
        forceHeight: true,
        maxHeight: 335
    });
};

let DetectAnomalySubject = () => {
    sWindow.new({
        id: 'DetectAnomalySubject',
        title: 'Tracking Subject',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
        [{
            type: 'normal',
            text: 'Name:    '
        }, {
            type: 'data whiteText',
            text: 'PORTER, MELINDA C.'
        }],
        [{
            type: 'normal',
            text: 'Exception:    '
        },{
            type: 'title red',
            text: 'COURSE DEVIATION'
        }],
        [{
            type: 'data redText',
            text:  '/////////// ANOMALY DETECTED ///////////'
        }],
        [{
            type: '',
            text: ''
        },
        {
            type: '',
            text: ''
        }],
        [{
            type: 'normal',
            text: '- Gait Mismatch'
        }],
        [{
            type: 'title red',
            text: '      REEVALUATING IDENTIFICATION_      '
        }],
    ],
        forceHeight: true,
        maxHeight: 335
    });
};

let WarningDetectAnomaly = () => {
    sWindow.new({
        id: 'WarningDetectAnomaly',
        title: 'Warning!!',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
        [{
            type: 'data redText',
            text:  '/////////// ANOMALY DETECTED ///////////'
        }],
        [{
            type: '',
            text: ''
        },
        {
            type: '',
            text: ''
        }],
        [{
            type: 'normal',
            text: '- DEVIANT BEHAVIOUR'
        }],
        [{
            type: '',
            text: ''
        },
        {
            type: '',
            text: ''
        }],
        [{
            type: 'normal',
            text: '- MISIDENTIFICATION [1]'
        }],
        [{
            type: '',
            text: ''
        },
        {
            type: '',
            text: ''
        }],
        [{
            type: 'normal',
            text: '  BIOMETRICS NOT FOUND'
        }],
        [{
            type: 'title textWhite',
            text: '  CONTACTING CLOSEST TECHNICAL SUPPORT  '
        }],
    ],
        forceHeight: true,
        maxHeight: 335
    });
};

let ProxyCompromised = () => {
    sWindow.new({
        id: 'ProxyCompromised',
        title: 'Project: OPTS',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: '',
                text: ''
            }, {
                type: 'data redText',
                text: 'Tracking Proxy                       '           
            }],
            [{
                type: 'normal',
                text: 'NAME:'
            }, {
                type: 'data whiteText',
                text: 'WILKINS, JARED L.'
            }],
            [{
                type: 'title red',
                text: '        OPERATION COMPROMISED        '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let DataRecovery = () => {
    sWindow.new({
        id: 'DataRecovery',
        title: 'Data Recovery',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
        [{
            type: 'title whiteText',
            text: 'FILE RECONSTRUCTION ACTIVE_      '
        }, {
            type: '',
            text: ''
        }],
        [{
            type: '',   
            text: ''
        }, {
            type: '',
            text: ' '           
        }],
        [{
            type: 'data whiteText',
            text: 'SCANNING UNALLOCATED SECTORS_     '
        }],
        [{
            type: '',
            text: ''
        }, {
            type: '',
            text: ' '           
        }],
        [{
            type: 'data whiteText',
            text: 'SCANNING UNALLOCATED SECTORS_     '
        }],
        [{
            type: '',
            text: ''
        }, {
            type: '',
            text: ' '           
        }],
        [{
            type: 'data whiteText',
            text: 'SCANNING TEMPORARY DIRECTORIES_   '
        }],
        [{
            type: '',
            text: ''
        }, {
            type: '',
            text: ' '           
        }],
        [{
            type: 'data whiteText',
            text: 'SCANNING SWAP FILES_              '
        }],
        [{
            type: '',
            text: ''
        }, {
            type: '',
            text: ' '           
        }],
        [{
            type: 'data whiteText',
            text: 'SCANNING REMPPAED BAD BLOCKS_     '
        }], 
        [{
            type: '',
            text: ''
        }, {
            type: '',
            text: ' '           
        }],
        [{
            type: 'data whiteText',
            text: 'INTERPOLATING MISSING DATA_       '
        }], 
        [{
            type: '',
            text: ''
        }, {
            type: '',
            text: ' '           
        }],
        [{
            type: '',
            text: ''
        }, {
            type: '',
            text: ' '           
        }],
        [{
            type: 'title WhiteText',
            text: 'EXTRACTING FACIAL FEATURES_       '
        }],
    ],
        forceHeight: true,
        maxHeight: 335
    });
};


let DataRecoveryAdditionalTarget = () => {
    sWindow.new({
        id: 'DataRecoveryAdditionalTarget',
        title: 'Data Recovery',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
        [{
            type: 'title whiteText',
            text: 'FILE RECONSTRUCTION ACTIVE_      '
        }, {
            type: '',
            text: ''
        }], 
        [{
            type: '',
            text: ''
        }],
        [{
            type: 'title WhiteText',
            text: 'EXTRACTING FACIAL FEATURES_      '
        }],
      
        [{
            type: '',
            text: ''
        }, {
            type: '',
            text: ' '           
        }],
        [{
            type: 'title red',
            text: 'ADDITIONAL TARGET DETECTED       '
        }],
        [{
            type: '',
            text: ''
        }, {
            type: '',
            text: ' '           
        }],
        [{
            type: 'normal',
            text: 'Identity:  '
        }, {
            type: 'data redText',
            text: 'Unknown'
        }],
        [{
            type: 'data redText',
            text: '         CONTACTING ADMIN         '
        }],
       
    ],
        forceHeight: true,
        maxHeight: 335
    });
};


let ContactAdministrator = () => {
    sWindow.new({
        id: 'ContactAdministrator',
        position: {
            top: '440px',
            right: '690px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'data redText',
                text: 'CONTACTING ADMIN         '
            }],
        [{
            type: 'data redText',
            text: '. ..'
        }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let FacialRecognitionConfirmed = () => {
    sWindow.new({
        id: 'FacialRecognitionConfirmed',
        title: 'Deviant',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: ''
            }, {
                type: 'data whiteText',
                text: 'FACIAL RECOGNITION CONFIRMED      '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let LocateDeviantCriminalAssociates = () => {
    sWindow.new({
        id: 'LocateDeviantCriminalAssociates',
        position: {
            top: '440px',
            right: '690px'
        },
        content: [{
                type: '',
                text: ''
            },
            [{
                type: 'data whiteText',
                text: 'LOCATING CRIMINAL ASSOCIATES           '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdenitfyUnknownDeviant = () => {
    sWindow.new({
        id: 'IdenitfyUnknownDeviant',
        title: 'Deviant',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: ''
            }, {
                type: 'data whiteText',
                text: '            KOROA, TOMAS            '
            }],
            [{
                type: 'normal',
                text: 'Location:       '
            }, {
                type: 'title red',
                text: '     UNKNOWN     '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdenitfyUnknownAssociate = () => {
    sWindow.new({
        id: 'IdenitfyUnknownAssociate',
        title: 'Associate',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: ''
            }, {
                type: 'data whiteText',
                text: '           LENDFLEDER, HENDRIK P.            '
            }],
            [{
                type: 'normal',
                text: 'Status:       '
            }, {
                type: 'title red',
                text: '     DECEASED     '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let IdenitfyIncarceratedAssociate = () => {
    sWindow.new({
        id: 'IdenitfyIncarceratedAssociate',
        title: 'Associate',
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'normal',
                text: ''
            }, {
                type: 'data whiteText',
                text: '           RODCHENKO, KATYA            '
            }],
            [{
                type: 'normal',
                text: 'Status:       '
            }, {
                type: 'title whiteText',
                text: '     INCARCERATED     '
            }],
            [{
                type: 'normal',
                text: 'Location:       '
            }, {
                type: 'title red',
                text: '   RIKERS ISLAND   '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

let CameraRequestMaintenance = () => {
    sWindow.new({
        id: 'CameraRequestMaintenance',
        title: null,
        position: {
            bottom: '725px',
            right: '80px'
        },
        content: [
            [{
                type: 'data redText',
                text:  '////// SURVEILLANCE INTERRUPTED //////'
            }],
            [{
                type: '',
                text: ''
            }],
            [{
                type: 'normal',
                text: 'SUSPECTED GANG ACTIVITY'
            }],
            [{
                type: 'title whiteText',
                text: '       REQUESTING MAINTENANCE_        '
            }],
        ],
        forceHeight: true,
        maxHeight: 335
    });
};

function myFunction1() { testDiv('test1'); setTimeout(myFunction1, Math.random() * 1000) }
function myFunction2() { testDiv2('test2'); setTimeout(myFunction2, Math.random() * 1000) }
function myFunction3() { testDiv3('test3'); setTimeout(myFunction3, Math.random() * 1000) }
// function myFunction4() { testDiv('test4'); setTimeout(myFunction4, Math.random() * 1000) }
// function myFunction5() { testDiv('test5'); setTimeout(myFunction5, Math.random() * 1000) }
function startTimers() { myFunction1(); myFunction2(); myFunction3(); }


function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function testDiv(div) {
    const preFix = ['001'];
    const negaFix = ['', '-'];
    const random = Math.floor(Math.random() * preFix.length);
    const random2 = Math.floor(Math.random() * negaFix.length);
    document.getElementById(div).innerHTML = 
        'TK_' + 
        padLeadingZeros( preFix[random]  ,3) 
        + '.' + 
        padLeadingZeros(Math.floor(Math.random()*1000),3) 
        + '.' + negaFix[random2] + 
        Math.floor(Math.random()*100);
}

function testDiv2(div) {
    const preFix = ['009'];
    const negaFix = ['', '-'];
    const random = Math.floor(Math.random() * preFix.length);
    const random2 = Math.floor(Math.random() * negaFix.length);
    document.getElementById(div).innerHTML = 
        'TK_' + 
        padLeadingZeros( preFix[random]  ,3) 
        + '.' + 
        padLeadingZeros(Math.floor(Math.random()*1000),3) 
        + '.' + negaFix[random2] + 
        Math.floor(Math.random()*100);
}

function testDiv3(div) {
    const preFix = ['099'];
    const negaFix = ['', '-'];
    const random = Math.floor(Math.random() * preFix.length);
    const random2 = Math.floor(Math.random() * negaFix.length);
    document.getElementById(div).innerHTML = 
        'TK_' + 
        padLeadingZeros( preFix[random]  ,3) 
        + '.' + 
        padLeadingZeros(Math.floor(Math.random()*1000),3) 
        + '.' + negaFix[random2] + 
        Math.floor(Math.random()*100);
}


console.log('Hello there!!!');
