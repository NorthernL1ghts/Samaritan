
/* Apple Threat */
let apple = (testing) => {
    if ((/Mac|iP/).test(window.navigator.platform) || testing) {
        sWindow.new({
            id: 'apple',
            title: 'immediate threat',
            position: {
                top: '80px',
                left: '50%'
            },
            customCSS: {
                transform: 'translateX(-50%)'
            },
            content: [
                [{
                    type: 'normal',
                    text: 'id : '
                }, {
                    type: 'data',
                    text: 'apple device'
                }],
                [{
                    type: 'normal',
                    text: 'designation : '
                }, {
                    type: 'data red',
                    text: 'threat'
                }],
                [{
                    type: 'normal',
                    text: 'recommandation : '
                }, {
                    type: 'data red',
                    text: 'deny'
                }],
                [{
                    type: 'normal',
                    text: 'remaining time : '
                }, {
                    type: 'normal countdown',
                    text: '00:00:00.0'
                }],
                {
                    type: 'title red',
                    text: 'type "I hate apple" to abort'
                }
            ],
            closable: false
        });
        countdown.from('00:00:30', document.querySelector('#apple .countdown'));
        window.addEventListener('countdown.TIMEOUT', _func = () => {
            this.removeEventListener('countdown.TIMEOUT', _func);
            if (sam.hold) wrapper.shutdown();
        });
        sam.hold = (query) => {
            if (query === 'i hate apple') {
                sam.hold = false;
                document.querySelector('#apple > .title').textContent = 'Error';
                document.querySelector('#apple').content([{
                        type: 'normal',
                        text: 'new data acquired'
                    },
                    {
                        type: 'redText',
                        text: 'classification error'
                    },
                ]);
                setTimeout(() => {
                    document.querySelector('#apple > .title').textContent = 'Asset identified';
                    document.querySelector('#apple > .title').classList.remove('red');
                    document.querySelector('#apple').closable = true;
                    document.querySelector('#apple').content([
                        [{
                            type: 'normal',
                            text: 'id : '
                        }, {
                            type: 'data redText',
                            text: 'admin'
                        }],
                        [{
                            type: 'normal',
                            text: 'name : '
                        }, {
                            type: 'data',
                            text: '[access restricted]'
                        }],
                        [{
                            type: 'normal',
                            text: 'ssn : '
                        }, {
                            type: 'data',
                            text: '[access restricted]'
                        }]
                    ]);
                }, 2000);
            }
        }
    }
};
