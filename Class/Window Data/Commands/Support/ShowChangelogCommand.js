let showChangelog = () => {
    sWindow.new({
        id: 'changelog',
        title: 'changelog',
        position: {
            bottom: '80px',
            right: '115px'
        },
        content: [{
                type: 'title',
                text: release.version + ' (current)'
            },
            {
                type: 'normal',
                text: '- Added speech recognition (Chrome API)' +
                    '\n- Added ES6 support' +
                    '\n- Improved source code readability' +
                    '\n- Improved windows content management'
            },
            {
                type: 'title',
                text: 'v3.000b1 (09.03.18)'
            },
            {
                type: 'normal',
                text: '- Added time apps' +
                    '\n- Added sidebars' +
                    '\n- Improved windows management' +
                    '\n- Improved windows content management' +
                    '\n- Added new windows content types' +
                    '\n- Added awaiting response mode' +
                    '\n- Added Apple countermeasure'
            },
            {
                type: 'title',
                text: 'v2.005b2 (17.02.18)'
            },
            {
                type: 'normal',
                text: '- First release'
            }
        ]
    });
};