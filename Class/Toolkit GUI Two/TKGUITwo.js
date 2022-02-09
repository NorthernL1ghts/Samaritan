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