export default function BGPhoto() {
    const API = "https://api.unsplash.com/"
    const headers = {
        "Authorization": import.meta.env.VITE_UNPLASH
    }


    return (
        <div>
            <footer>
                All photos property of Unplash
            </footer>
        </div>
    );
};