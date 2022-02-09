/* Windows Data - Code for Commands. */
let showHelp = () => {
    sWindow.new({
        id: 'help',
        title: 'Help',
        position: {
            top: '240px',
            left: '123px'
        },
        content: [{
                type: 'title',
                text: 'about'
            },
            {
                type: 'text',
                text: 'Samaritan ' + release.version + '\nReleased ' + release._date + ' by ' + release.dev +
                    '\nContact me : ' + release.devcontact
            },
            {
                type: 'title',
                text: 'Commands'
            },
            {
                type: 'normal',
                text: 'help, credits, changelog, night \nType "commands" for full commands list'
            },
            {
                type: 'title',
                text: 'Main features'
            },
            {
                type: 'normal',
                text: '- Text command input\n- Night mode\n- REGEX command processing\n- Draggable/scrollable/closable windows'
            },
            {
                type: 'title',
                text: 'Upcoming features'
            },
            {
                type: 'normal',
                text: '- Chatbot\n- Voice recognition\n- Better windows management' +
                    '\n- More processing parameters\n- Facial recognition\n- User defined settings'
            },
            {
                type: 'title',
                text: 'Known bugs'
            },
            {
                type: 'normal',
                text: '- Window drag/drop title CSS glitch (Chrome)' +
                    '\n- REGEX error (firefox)' +
                    '\n- Custom scrollbar not working (firefox)'
            },
            {
                type: 'title red',
                text: 'Double click on this window to close it'
            }
        ]
    });
};
