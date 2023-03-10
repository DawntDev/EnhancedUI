import { motion } from "framer-motion";
import SpotifyOauth from "../components/oauth/spotify-oauth";

export default function Connect() {
    return (
        < motion.div className="w-3/4 p-5"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <p>Connect EnhancedUI with your favorite applications so you can get more elements, which will make your interface even more unique.</p>
            <SpotifyOauth />
        </motion.div>
    );
};