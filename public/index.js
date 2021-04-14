$(() => {

     $('#urlmenu').change(() => {
       let url = $('#urlmenu').val();
       $('#mainurl').val(url);
       console.log(url);
     });
     
     fetch('/getstate')
        .then(response => response.json())
        .then(data => {
            $('#mainurl').val(data.mainUrl);
            $('#muteAll').prop('checked', data.mute);
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
});