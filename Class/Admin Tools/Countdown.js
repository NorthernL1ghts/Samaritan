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