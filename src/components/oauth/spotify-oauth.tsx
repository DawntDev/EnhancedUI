import { useState } from "react";
import { SiSpotify } from "react-icons/si"
import { SlSocialSpotify } from "react-icons/sl"
import { useContextUI } from "../../provider";
import { ISpotifyOauth } from "../../provider/connections/spotify";

export default function SpotifyOauth() {
    const { currentUI: { connections }, setUiProperty } = useContextUI();
    const [logged, setLogged] = useState<boolean>(connections.spotify);
    const client_id = `client_id=${import.meta.env.VITE_SPOTIFY_ID}`;
    const scopes = "scopes=" + ["user-read-playback-state", "user-modify-playback-state"].join("%20");
    const response_type = "response_type=code";
    const redirect_uri = `redirect_uri=${import.meta.env.VITE_PROXY}/spotify`;
    const url = `https://accounts.spotify.com/authorize?${client_id}&${scopes}&${response_type}&${redirect_uri}`;

    const logout = (): void => {
        localStorage.removeItem("sp-token");
        setUiProperty("connection", { ...connections, spotify: false });
        setLogged(false);
    };

    const login = (): void => {
        let spotifyOauth = window.open(url, '_blank', 'location=yes,height=650,width=520,scrollbars=1,status=yes');

        window.onmessage = (ev: MessageEvent<string>) => {
            if (ev.data) {
                let data: ISpotifyOauth = JSON.parse(ev.data);
                let now = new Date()
                now.setSeconds(now.getSeconds() + data.expires_in)
                data.expires_in = now.getTime()

                localStorage.setItem("sp-data", JSON.stringify(data));
                setLogged(true);
                setUiProperty("connection", { ...connections, spotify: true });
                spotifyOauth!.close();
                window.onmessage = null;
            };
        };
    };

    return logged ? (
        <button
            onClick={logout}
            className="w-48 h-10 border-2 border-[#1DB954] rounded-md text-black text-sm font-light flex justify-center items-center"
        >
            <SlSocialSpotify className="w-5 h-5 mr-2" />
            <p>Log out of Spotify</p>
        </button>
    ) : (
        <button
            onClick={login}
            className="w-48 h-10 bg-[#1DB954] rounded-md text-white text-sm font-light flex justify-center items-center"
        >
            <SiSpotify className="w-5 h-5 mr-2" />
            <p>Connect with Spotify</p>
        </button>
    )
};