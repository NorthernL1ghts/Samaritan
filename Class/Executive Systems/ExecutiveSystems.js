executive.init();

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