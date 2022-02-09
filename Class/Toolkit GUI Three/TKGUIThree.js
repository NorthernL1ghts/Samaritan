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