$(() => {
    setInterval(() => {
        $.get("/getlocations", function (data) {

            $('#locationtable tbody').empty();

            for (const [key, value] of Object.entries(data)) {

                // using jquery insert a new row into the table

                let timeago = Math.round(((Date.now() - value.timeStamp))/1000/60);

                $('#locationtable tbody').append($('<tr>').append($('<td>').text(value.name)).append($('<td>').text(value.location)).append($('<td>').text(timeago + "min ago")));



            }
        });
    }, 5000);
});