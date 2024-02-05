// ty https://stackoverflow.com/questions/29590702/how-to-add-last-fm-now-playing-into-my-site-using-api
function urlencode(obj) {
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}

$(document).ready(function () {
    function lastfmRequest(method, params) {
        params['api_key'] = "bb42b99d33e6bc82308592e207143dba";
        params['format'] = "json";

        return fetch("https://ws.audioscrobbler.com/2.0/?method=" + method + "&" + urlencode(params) + "&format=json")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            });
    }

    function getImage(trackinfo) {
        return lastfmRequest("track.getInfo", { autocorrect: 1, track: trackinfo["name"], artist: trackinfo["artist"]["name"] })
            .then((data) => {
                    try {
                        return data.track.album.image[1]["#text"];
                    } catch(e) {
                        throw new Error("No image found")
                    }
                });
    }

    lastfmRequest("user.gettoptracks", { user: "frenchie4111", limit: "3", period: "7day" }).then((data) => {
        var html = '<h2 class="colorchanger">Currently Listening</h2>';
        $.each(data.toptracks.track, function (i, item) {
            const itemid = item.mbid;

            html += '<div class="music-row">';
            html += '<img id="' + itemid + '" src="' + item.image[1]["#text"] + '">';
            html += '<div><a href="' + item.url + '" target="_blank">' + item.name + '</a> - ' + item.artist['name'] + '</div></div>';

            getImage(item).then((img) => {
                $("#" + itemid).attr("src", img);
            });
        });
        $('.listening-to').append(html);
    });
});
