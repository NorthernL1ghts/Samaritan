/* Natural Language Processing */
let nlp = (sentence, keywords = [], final) => {
    sWindow.new({
        id: 'nlp',
        class: 'thin_border',
        title: null,
        position: {
            top: '65%',
            left: '50%'
        },
        customCSS: {
            transform: 'translateX(-50%)',
            minWidth: '500px'
        }
    });
    document.querySelector('#nlp .content').innerHTML = '<div class="header"><span class="title">Subject:</span></span>admin</span><br><span class="sub_header"> nlp active</span></div><div class="audio"></div><div class="sentence"></div>';
    sentence.trim().split(' ').forEach((word) => {
        document.querySelector('#nlp .sentence').appendChild(span = document.createElement('span'));
        span.textContent = word;
        span.className = 'data word';
        if (keywords.indexOf(word) !== -1) {
            span.classList.add('relevant_keyword');
        }
    });
    if (final) {
        setTimeout(() => sam.search(sentence), 500);
        setTimeout(() => sWindow.destroy('nlp'), 2000);
    }
};

// nlp('the machine wants me to send a message to shaw', ['machine', 'shaw']); 