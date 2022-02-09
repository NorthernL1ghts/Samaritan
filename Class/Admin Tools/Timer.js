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