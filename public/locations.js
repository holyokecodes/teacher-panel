$(() => {

    const locations = ['TrainingComplex', 'ControlRoomTeam1', 'ControlRoomTeam2', 'ControlRoomTeam3', 'ControlRoomTeam4'];


    setInterval(() => {
        $.get("/getlocations", function (data) {

            $('table tbody').empty();

            for (const [key, value] of Object.entries(data)) {

                let timeago = Math.round(((Date.now() - value.timeStamp))/1000/60);

                let color = 'lime';
                if(timeago > 15) {
                    color = 'lightgreen';
                }
                if(timeago > 30) {
                    color = 'grey';
                }
                if(timeago > 100) 
                     continue;

                let primary_location = value.location.split('_')[0];
                let secondary_location = value.location.split('_')[1] || "";
                let tertiary_location = value.location.split('_')[2] || "";


                if(!locations.includes(primary_location)) {
                    $(`#other tbody`).append($('<tr>').append($('<td>').text(value.name)).append($('<td>').text(primary_location)).append($('<td>').text(secondary_location + ' ' + tertiary_location)).append($(`<td style="color: ${color};">`).text(timeago + "min ago")));
                } else if(primary_location == "ControlRoom") {
                    $(`#${primary_location}_${secondary_location} tbody`).append($('<tr>').append($('<td>').text(value.name)).append($('<td>').text(tertiary_location)).append($(`<td style="color: ${color};">`).text(timeago + "min ago")));
                } else {
                    $(`#${primary_location} tbody`).append($('<tr>').append($('<td>').text(value.name)).append($('<td>').text(secondary_location + ' ' + tertiary_location)).append($(`<td style="color: ${color};">`).text(timeago + "min ago")));
                }
            }
        });
    }, 5000);
});