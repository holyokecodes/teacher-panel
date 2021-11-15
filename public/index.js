let code = '';
let secret = ''

let storage = window.localStorage;
let sessions = storage.getItem('sessions');

$(() => {

    if (sessions == null) {
        // No sessions
        console.log('No Sessions');
        makeSession();
    } else {
        // Session already
        console.log('Session Already');

        let foundSessions = JSON.parse(sessions);

        let defaultSession = foundSessions[0];

        console.log(foundSessions);

        foundSessions.forEach(sess => {
            $('#selectedsession').append(new Option(sess.code, sess.code));
        });

        code = defaultSession.code;
        secret = defaultSession.secret;
        getState();
    }


    $('#selectedsession').change(() => {
        let session = $('#selectedsession').val();

        let foundSessions = JSON.parse(sessions);

        foundSessions.forEach(sess => {
            if (sess.code == session) {
                code = sess.code;
                secret = sess.secret;
                getState();
            }
        });
    });

    $('#newSession').click(() => {
        makeSession();
    })


    $('#urlmenu').change(() => {
        let url = $('#urlmenu').val();
        $('#mainurl').val(url);
        console.log(url);
    });

    $('#submitURL').click(() => {
        let url = $('#mainurl').val();

        fetch('https://us-central1-savedblocks.cloudfunctions.net/galeforce/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session_code: code,
                session_secret: secret,
                settings: {
                    screen_url: url
                }
            }),
        });
    });

    $('#muteAll').change(() => {
        let checked = $('#muteAll').prop('checked');

        fetch('https://us-central1-savedblocks.cloudfunctions.net/galeforce/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session_code: code,
                session_secret: secret,
                settings: {
                    mute: checked
                }
            }),
        });
    });

    $('#autoPlay').change(() => {
        let checked = $('#autoPlay').prop('checked');

        fetch('https://us-central1-savedblocks.cloudfunctions.net/galeforce/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session_code: code,
                session_secret: secret,
                settings: {
                    auto_play: checked
                }
            }),
        });
    });

    $('#unlockMap').change(() => {
        let checked = $('#unlockMap').prop('checked');

        fetch('https://us-central1-savedblocks.cloudfunctions.net/galeforce/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session_code: code,
                session_secret: secret,
                settings: {
                    unlock_map: checked
                }
            }),
        });
    });

    $('#updateButton').click(() => {

        let trainingteam1 = $('#trainingteam1').val();
        let trainingteam2 = $('#trainingteam2').val();
        let trainingteam3 = $('#trainingteam3').val();
        let trainingteam4 = $('#trainingteam4').val();

        let controlteam1 = $('#controlteam1').val();
        let controlteam2 = $('#controlteam2').val();
        let controlteam3 = $('#controlteam3').val();
        let controlteam4 = $('#controlteam4').val();


        fetch('https://us-central1-savedblocks.cloudfunctions.net/galeforce/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session_code: code,
                session_secret: secret,
                settings: {
                    teams: [
                        {
                            control_stage: controlteam1,
                            training_stage: trainingteam1,
                            team_name: 'team1',
                            completed_missions: []
                        },
                        {
                            control_stage: controlteam2,
                            training_stage: trainingteam2,
                            team_name: 'team2',
                            completed_missions: []
                        },
                        {
                            control_stage: controlteam3,
                            training_stage: trainingteam3,
                            team_name: 'team3',
                            completed_missions: []
                        },
                        {
                            control_stage: controlteam4,
                            training_stage: trainingteam4,
                            team_name: 'team4',
                            completed_missions: []
                        }
                    ]
                }
            }),
        });
    });
});

function getState() {
    fetch(`https://us-central1-savedblocks.cloudfunctions.net/galeforce/session?session_code=${code}`)
        .then(response => response.json())
        .then(data => {

            $('#selectedsession').val(code);
            $('#editorWindow').show();


            $('#mainurl').val(data.screen_url);
            $('#muteAll').prop('checked', data.mute);
            $('#autoPlay').prop('checked', data.auto_play);
            $('#unlockMap').prop('checked', data.unlock_map);



            $('#trainingteam1').val(data.teams[0].training_stage);
            $('#trainingteam2').val(data.teams[1].training_stage);
            $('#trainingteam3').val(data.teams[2].training_stage);
            $('#trainingteam4').val(data.teams[3].training_stage);

            $('#controlteam1').val(data.teams[0].control_stage);
            $('#controlteam2').val(data.teams[1].control_stage);
            $('#controlteam3').val(data.teams[2].control_stage);
            $('#controlteam4').val(data.teams[3].control_stage);

        });
}

function makeSession() {

    storage.getItem('sessions');

    fetch('https://us-central1-savedblocks.cloudfunctions.net/galeforce/createsession', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then(data => {
            let newSession = {
                code: data.session_code,
                secret: data.session_secret
            }

            let newSessions;

            if (sessions == null) {
                newSessions = [newSession];
            } else {
                newSessions = JSON.parse(sessions);
                newSessions.push(newSession);
            }

            storage.setItem('sessions', JSON.stringify(newSessions));
            sessions = newSessions;

            code = data.session_code;
            secret = data.session_secret;


            $('#selectedsession').append(new Option(code, code));

            getState();
        });
}