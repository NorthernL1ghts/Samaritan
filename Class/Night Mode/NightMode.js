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