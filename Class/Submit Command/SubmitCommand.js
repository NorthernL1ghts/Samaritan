/* Submit command */
document.querySelector('#submit').onclick = () => {
    let cmd = document.querySelector('#cmd span').textContent;
    if (cmd.length > 0) {
        document.querySelector('#cmd span').textContent = '';
        sam.search(cmd);
    }
};