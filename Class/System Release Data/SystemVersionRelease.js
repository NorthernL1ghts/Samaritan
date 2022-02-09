let release = {
    version: 'v.978.0.06.51',
    _date: '01.11.21',
    dev: 'NorthernL1ghts',
    devcontact: 'Github: @NorthernL1ghts'
};

document.querySelectorAll('.version').forEach((el) => {
    el.textContent = release.version;
});

let mobile = (/(android|windows phone|ios)/i).test(window.navigator.userAgent);
