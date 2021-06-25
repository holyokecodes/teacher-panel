$(() => {

    $('#urlmenu').change(() => {
        let url = $('#urlmenu').val();
        $('#mainurl').val(url);
        console.log(url);
    });

    // Get initial states
    fetch('/getstate')
        .then(response => response.json())
        .then(data => {
            $('#mainurl').val(data.mainUrl);
            $('#muteAll').prop('checked', data.mute);
            $('#stagemenu').val(data.stage);
        });

    $('#submitURL').click(() => {
        let url = $('#mainurl').val();
        console.log(url);
        fetch('/setkey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "key": "mainUrl",
                "value": url
            }),
        });
    });

    $('#submitStage').click(() => {
        let stage = $('#stagemenu').val();
        fetch('/setkey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "key": "stage",
                "value": stage
            }),
        });
    });

    $('#submitVideoPlayer').click(() => {
        let video = $('#videoplayermenu').val();
        fetch('/setkey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "key": "video",
                "value": video
            }),
        });
    });

    $('#playButton').click(() => {
        fetch('/setkey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "key": "videoPlayback",
                "value": true
            }),
        });
    });

    $('#pauseButton').click(() => {
        fetch('/setkey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "key": "videoPlayback",
                "value": false
            }),
        });
    });

    $('#click').click(() => {
        fetch('/click');
    });

    $('#muteAll').change(() => {
        let checked = $('#muteAll').prop('checked');
        fetch('/setkey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "key": "mute",
                "value": checked
            }),
        });
    });

    $('#callBack').change(() => {
        let checked = $('#callBack').prop('checked');
        fetch('/setkey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "key": "callback",
                "value": checked
            }),
        });
    });
});