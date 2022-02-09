/* Time tools */
let lpad = (n, width, char) => (n.length >= width) ? n : (new Array(width).join(char) + n).slice(-width);

let SecondsToHHMMSSM = (s) => {
    let h = parseInt(s / 3600);
    s = s % 3600;
    let m = parseInt(s / 60);
    s = s % 60;
    return (lpad(h, 2, '0') + ':' + lpad(m, 2, '0') + ':' + lpad(s.toString().split('.')[0], 2, '0') +
        '.' + s.toString().split('.')[s.toString().split('.').length - 1][0]);
};

let HHMMSStoSeconds = (t) => t.split(':').reduce((acc, time) => (60 * acc) + +time);