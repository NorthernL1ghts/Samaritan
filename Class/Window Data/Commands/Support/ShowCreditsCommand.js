let showCredits = () => {
    sWindow.new({
        id: 'credits',
        title: 'credits',
        position: {
            top: '80px',
            right: '115px'
        },
        content: [{
                type: 'title',
                text: 'Design'
            },
            [{
                type: 'normal',
                text: 'Smith, Cameron'
            }, {
                type: 'data redText',
                text: 'Admin'
            }],
            {
                type: 'title',
                text: 'Animation design'
            },
            [{
                type: 'normal',
                text: 'Matrine, Rosseua'
            }, {
                type: 'data redText',
                text: 'Primary Asset'
            }],
            {
                type: 'title',
                text: 'Inspiration'
            },
            {
                type: 'normal',
                text: 'John Greer/Harold Finch/Samantha Groves'
            },
            {
                type: 'title red',
                text: 'Total contributors : 5'
            }
        ],
        forceHeight: true,
        maxHeight: 335
    });
};