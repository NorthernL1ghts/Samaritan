
/* Cmd & Focus */
let cmdFocus = () => {
    document.querySelector('#cmd span').focus();
    let setEndOfContenteditable = (el) => {
        let range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    };
    setEndOfContenteditable(document.querySelector('#cmd span'));
};

document.body.onkeydown = (e) => {
    if (/^([a-z]|backspace)$/i.test(e.key)) cmdFocus();
};

document.querySelector('#cmd span').onkeydown = (e) => {

    /* Prevent arrow keys (cursor displacement) and Ctrl-A (select all) */
    if (e.key.startsWith('Arrow') || (e.ctrlKey && e.key === 'a')) {
        e.preventDefault();
	}
	
    /* Enter */
    if (e.key === 'Enter') {
        document.querySelector('#submit').click();
    }
};

/* Prevent cursor displacement */
document.querySelector('#cmd span').onmousedown = (e) => {
    e.preventDefault();
};