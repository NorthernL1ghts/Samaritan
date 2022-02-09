system.init();

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