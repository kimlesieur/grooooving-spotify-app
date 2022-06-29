const {SPOTIFY} = require('../config');

let userToken;
const spotifyAPI = 'https://api.spotify.com/v1';

let url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(SPOTIFY.CLIENT_ID);
url += '&scope=' + encodeURIComponent(SPOTIFY.SCOPE);
url += '&redirect_uri=' + encodeURIComponent(SPOTIFY.REDIRECTION);
url += '&state=' + encodeURIComponent(SPOTIFY.STATE);



exports.getAccessToken = () => {
    if(userToken){
        return userToken;
    }
    const currentURL = window.location.href;
    const check1 = currentURL.match(/access_token=([^&]*)/);
    const check2 = currentURL.match(/expires_in=([^&]*)/);
    if(check1 && check2){
        userToken = check1[1];
        const expiresIn = parseInt(check2[1]);
        window.setTimeout(() => userToken = '', expiresIn * 1000);
        return window.history.pushState('Access Token', null, '/');
    }
        console.log("you are disconnected from Spotify, please login");
        window.setTimeout(() => window.location.href = url, 1000);
};

exports.search = async (term) => {
    //TODO = refactore the fetch with chaining .then (instead of multiple const variables declaration)
    const jsonResponse = await fetch(`${spotifyAPI}/search?type=track&q=${term}`, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });
    const response = await jsonResponse.json();
    const searchResults = await response.tracks.items;
    const results = [];
    if(searchResults){
        searchResults.map(track => {
            results.push({
                id: track.id, 
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            })
        });
    }
    return results;
};

exports.savePlaylist = async (playlistName, arrayURI) => {
    if(!playlistName && !arrayURI) return;
    const accessToken = userToken;
    const header = { Authorization: `Bearer ${accessToken}`};
    let userID;
    const user = await fetch(`${spotifyAPI}/me`, {headers : header}).then(res => res.json());
    userID = await user.id;
    const newPlaylist = await fetch(`${spotifyAPI}/users/${userID}/playlists`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({name: playlistName})
        }).then(res => res.json());
    const playlistID = await newPlaylist.id;
    const fillPlaylist = await fetch(`${spotifyAPI}/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({uris: arrayURI})
    });
};
