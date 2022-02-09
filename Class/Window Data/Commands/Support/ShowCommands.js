let showCommands = () => {
    sWindow.new({
        id: 'commands',
        title: 'commands',
        position: {
            bottom: '80px',
            left: '123px'
        },
        maxHeight: 210,
        content: [{
                type: 'title',
                text: 'User Interface'
            },
            {
                type: 'normal',
                text: '- HELP : show help\n- SHUTDOWN : shutdown Samaritan' +
                    '\n- NIGHT : toggle/enable/disable night mode' +
                    '\n- CREDITS : show credits\n- CHANGELOG : show changelog\n- CLOSE ALL : close all windows' +
                    '\n- CLOCK, TIMER\n- COUNTDOWN : (from) (Xd) HH:MM:SS\n[OR] to AAAA.MM.DD HH:MM:SS'
            },
            {
                type: 'title',
                text: 'Artificial Intelligence'
            },
            {
                type: 'normal',
                text: '- good morning/afternoon/evening, hi, hello' +
                    '\n- good night (shutdown)' +
                    '\n- introduce yourself\n- what is your primary mandate ?\n- what are your commands ?\n- do you recognize me ?' +
                    '\n- random'
            },
            {
                type: 'title',
                text: 'note'
            },
            {
                type: 'normal',
                text: 'commands are processed by regex,\nalmost all commands (can) have derivatives,' +
                    '\nlook at /js/processing.js for more details'
            }
        ]
    });
};