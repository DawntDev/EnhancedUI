export interface ISpotifyOauth {
    access_token: string,
    refresh_token: string,
    expires_in: number,
    token_type: string
}

export function spotifyRefreshToken(headers: any, body: string, data: ISpotifyOauth) {
    fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: headers,
        body: body
    }).then(res => res.json())
        .then((json: { access_token: string, expires_in: number }) => {
            console.log(json)
            console.log("peticion");
            let now = new Date();
            now.setSeconds(now.getSeconds() + json.expires_in);
            localStorage.setItem(
                "sp-data",
                JSON.stringify({
                    ...data,
                    expires_in: now.getTime(),
                    access_token: json.access_token
                })
            );
        });
};