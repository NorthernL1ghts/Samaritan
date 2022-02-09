
/* Windows Management */
let sWindow = {
    new: (s) => {

        // Prevent duplicate
		if (document.getElementById(s.id) !== null) return;
		
        // Main values
        let w = Object.assign(document.createElement('div'), {
            id: (typeof(s.id) !== 'undefined' ? s.id : ''),
            className: 'window' + (typeof(s.class) !== 'undefined' ? ' ' + s.class : ''),
            innerHTML: (s.title ? '<span class="title">' + s.title + '</span>' : '') + '<div class="content"></div>',
		});
		
        // Title style
        if ((s.red || typeof(s.red) === 'undefined') && s.title)
			w.querySelector('.title').classList.add('red');
		
        // Positioning CSS
		Object.assign(w.style, s.position);
		
        // Custom CSS
		if (s.customCSS !== undefined) Object.assign(w.style, s.customCSS);
		
        // Append to DOM
		document.body.appendChild(w);
		
        // Draggable
		dragElement(w);
		
        // Destroy on double-click
        if (typeof(s.closable) !== 'undefined')
            w.closable = s.closable;
        w.ondblclick = () => {
            if (w.closable || typeof(w.closable) === 'undefined')
                sWindow.destroy(s.id);
		};
		
        // Animate title
        if (s.title) {
            setTimeout(() => {
                let p = 100;
                let P = setInterval(() => {
                    if (p >= 0) {
                        w.querySelector('.title').style['clip-path'] = 'inset(0 ' + p + '% 0 0)';
                        p -= 10;
                    } else
                        clearInterval(P);
                }, 20);

            }, 500);
		}
		
        // Animate body
        setTimeout(() => {
            w.style.visibility = 'visible';
            try {
                if (s.maxHeight < 300 || s.forceHeight)
                    w.querySelector('.content').style.maxHeight = `${s.maxHeight}px`;
                else
                    w.querySelector('.content').style.maxHeight = '300px';
            } catch (e) {
                w.querySelector('.content').style.maxHeight = '300px';
            }
		}, 700);
		
        // Add & replace content
        w.content = (content, doNotClear) => {
            if (!doNotClear) w.querySelector('.content').innerHTML = '';
            let append = (content, inline, parentElement) => {
                if (inline === undefined) inline = false;
                let el = document.createElement('span');
                if (content.type !== 'normal') el.className = content.type;
                el.textContent = content.text;
                if (!inline) {
                    w.querySelector('.content').appendChild(el);
                } else {
                    parentElement.appendChild(el);
                }
                let wait = setInterval(() => {
                    if (el.isVisible()) {
                        clearInterval(wait);
                        el.style.opacity = '1';
                    }
                }, 100);
            };
            content.forEach((content) => {
                switch (content.constructor) {
                    case Array:
                        let el = document.createElement('div');
                        el.className = 'inline';
                        content.forEach((content) => {
                            append(content, true, el);
                        });
                        w.querySelector('.content').appendChild(el);
                        break;
                    case Object:
                        append(content);
                        break;
                }
            });
        };
        if (s.content) {
            w.content(s.content);
        }
        return w;
    },
    destroy: (id) => {
        try {
            document.body.removeChild(document.getElementById(id));
        } catch (e) {}
    },
    destroyAll: () => {
        document.querySelectorAll('.window').forEach((w) => {
            document.body.removeChild(w);
        });
    }
};

function dragElement(el) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(el.id + "header")) {

        /* if present, the header is where you move the DIV from:*/
        document.getElementById(el.id + "header").onmousedown = dragMouseDown;
    } else {

        /* otherwise, move the DIV from anywhere inside the DIV:*/
        el.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
		e = e || window.event;
		
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        el.classList.add('moving');
    }

    function elementDrag(e) {
		e = e || window.event;
		
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
		pos4 = e.clientY;
		
        // set the element's new position:
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
        el.style.right = '';
        el.style.bottom = '';
    }

    function closeDragElement() {

        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        el.classList.remove('moving');
    }
}