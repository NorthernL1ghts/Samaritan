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