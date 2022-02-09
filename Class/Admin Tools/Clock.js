/* System Clock */
let clock = () => {
    sWindow.new({
        id: 'clock',
        title: 'clock',
        position: {
            top: '80px',
            right: '50px'
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
