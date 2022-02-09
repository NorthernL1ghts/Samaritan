marker.solid();

/* Triangle */
let marker = {
    blink: () => {
        marker.show();
        document.querySelector('#marker').className = 'triangle blink';
    },
    solid: () => {
        marker.show();
        document.querySelector('#marker').className = 'triangle';
    },
    dots: () => {
        marker.show();
        document.querySelector('#marker').className = 'dots';
    },
    show: () => {
        document.querySelector('#marker').style.visibility = 'visible';
    },
    hide: () => {
        document.querySelector('#marker').style.visibility = 'hidden';
    }
};