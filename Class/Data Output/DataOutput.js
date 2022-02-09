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