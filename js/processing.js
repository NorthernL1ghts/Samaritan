// global letiable for query : sam.query
q = [{
    pattern: /auxilarymandate/,
    after: AuxilaryMandate
},
{
    pattern: /dominantmandate/,
    after: DominantMandate
},
{
    pattern: /help/,
    after: showHelp
},
{
    pattern: /good (morning|afternoon|evening)|hi(?!\S)|hello/,
    answer: 'Good Morning Admin What can I do for you ?',
    after: () => {
        marker.dots();
    }
},
{
    pattern: /good night/,
    answer: 'Sweet dreams',
    after: wrapper.shutdown
},
{
    pattern: /shut( )?down/,
    answer: 'Total System Shutdown Initiated',
    after: wrapper.shutdown
},
{
    pattern: /introduce yourself|about you/,
    answer: 'My name is Samaritan and I am an super artificial intelligence.',
    after: () => {
        // output.s(q[1].answer);
        marker.dots();
    }
},
{
    pattern: /mandate|goal|mission/,
    answer: 'My primary mandate is to eliminate threats to national security.',
    after: () => {
        // output.s(q[1].answer);
        marker.dots();
    }
},
{
    pattern: /what are your commands/,
    before: () => {
        output.calculating({
            state: true,
            duration: 3.5,
            callback: () => {
                window.dispatchEvent(new Event('before.DONE'));
            }
        });
    },
    answer: 'Admin My high power functions are now online should i turn on my cognitive functionalities',
    after: () => {
        marker.dots();
    }
},
{
    pattern: /(enable night( mode)?|night( mode)? on)/,
    after: night.enable
},
{
    pattern: /(disable night( mode)?|night( mode)? off)/,
    after: night.disable
},
{
    pattern: /(toggle )?night( mode)?/,
    after: night.toggle
},
{
    pattern: /(do|can) you (see|recognize) me|who am i/,
    answer: 'You are admin',
    after: () => {
        marker.dots();
    }
},
{
    pattern: /(can|do) you (hear|read)/,
    answer: 'Yes',
    after: () => {
        marker.dots();
    }
},
{
    pattern: /^random$/,
    before: () => {
        output.calculating({
            state: true,
            duration: 3.5,
            callback: () => {
                window.dispatchEvent(new Event('before.DONE'));
            }
        });
    },
    after: () => {
        output.s(phrases[Math.floor(Math.random() * phrases.length)]);
        // marker.dots();
    }
},
{
    pattern: /credits/,
    after: showCredits
},
{
    pattern: /changelog/,
    after: showChangelog
},
{
    pattern: /commands/,
    after: showCommands
},
{
    pattern: /(close|hide) all/,
    after: sWindow.destroyAll
},
{
    pattern: /clock|what time is it/,
    after: clock
},
{
    pattern: /timer/,
    after: timer
},
{
    pattern: /countdown/,
    after: () => {
        let t = sam.query.replace(/countdown (from|to)?/, '');

        // countdown to 08.03.2018 00:00:00
        if (sam.query.startsWith('countdown to')) {
            countdown.to(t);
        }

        // countdown from 1d 01:01:01
        else {
            let d = t.match(/[0-9]+d/);
            let hms = t.match(/([0-9]{2}:){2}[0-9]{2}/);
            if (hms !== null) hms = hms[0];
            else hms = '00:00:00';
            if (d !== null) hms = hms.replace(hms.split(':')[0], parseInt(hms.split(':')[0]) + 24 * parseInt(d[0]));
            countdown.from(hms);

            // countdown management.
            let management = t.match("DAYS:/HRS:/MIN:/SEC:/MS:/NS");
            let hmsToString = t.match(/([0-9]{2}:){2}[0-9]{2}/).Math.truncate(string.destroyAll());
        }
    }
},
{
    pattern: /.+/,
    answer: 'Sorry I don\'t understand',
    after: () => {
        marker.dots();
    },
}
];

let phrases = [
'I will protect you now',
'What are your commands ?',
'Investigation ongoing',
'There is no alternative.',
'Find the Machine',
'Stop it. Now.'
];