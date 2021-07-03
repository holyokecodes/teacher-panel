$(() => {

    const locations = ['TrainingComplex', 'ControlRoomTeam1', 'ControlRoomTeam2', 'ControlRoomTeam3', 'ControlRoomTeam4'];


    setInterval(() => {
        $.get("/getlocations", function (data) {

            $('table tbody').empty();

            for (const [key, value] of Object.entries(data)) {

                let timeago = Math.round(((Date.now() - value.timeStamp))/1000/60);

                let color = 'green';
                if(timeago > 15) {
                    color = 'yellow';
                }
                if(timeago > 30) {
                    color = 'red';
                }

                let primary_location = value.location.split('_')[0];
                let secondary_location = value.location.split('_')[1] || "";
                let tertiary_location = value.location.split('_')[2] || "";


                if(!locations.includes(primary_location)) {
                    primary_location = "other";
                    $(`#${primary_location} tbody`).append($('<tr>').append($('<td>').text(value.name)).append($('<td>').text(primary_location)).append($('<td>').text(secondary_location + ' ' + tertiary_location)).append($(`<td style="color: ${color};">`).text(timeago + "min ago")));
                } else {
                    $(`#${primary_location} tbody`).append($('<tr>').append($('<td>').text(value.name)).append($('<td>').text(secondary_location + ' ' + tertiary_location)).append($(`<td style="color: ${color};">`).text(timeago + "min ago")));
                }
            }
        });
    }, 5000);
});