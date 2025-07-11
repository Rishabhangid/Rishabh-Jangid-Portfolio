import React, { useEffect, useState } from 'react';
// import LOGO from '../../assets/images/logo/splash-screen-logo.png';
import LOGO from '../../assets/images/logo/splash-screen-logo.png';
import './loadingstyle.css';

export const LoadingPage = () => {

    // const loadingMessages = [
    //     "Hold tight! We’re polishing the sparkles just for you… ✨",
    //     "Almost there! Diamonds take time to shine… 💍",
    //     "Loading… Just like gold, great things take time to refine! ⏳",
    //     "Did you know? The oldest jewelry dates back over 100,000 years! ⏳",
    //     "Did you know? Wearing gold can boost your confidence! Feeling royal yet? 👑",
    //     "Loading… Meanwhile, did you know the world’s largest diamond is over 3,000 carats? 💎"
    // ];

    const loadingMessages = [
        "Polishing sparkles... ✨",
        "Shining bright... 💎",
        "Gems in progress... ⏳",
        "Almost ready... 👑",
        "Refining gold... ✨",
        "Diamonds loading... 💍",
        "Jewels incoming... ⏳",
        "Sparkle soon... 💖",
        "Crafting elegance... ✨",
        "Brilliance awaits... 💎"
    ];
    

    const [loadingMessage, setLoadingMessage] = useState("");

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * loadingMessages.length);
        setLoadingMessage(loadingMessages[randomIndex]);
    }, []);

    return (
        <div className="w-full h-[100vh] flex justify-center items-center flex-col bg-[#FAF6F0]">
            <img src={LOGO} alt="Loading..." className="w-[200px] loaderr-logoo" />
            <h1 className="text-lg font-semibold text-gray-700 mt-4 ">{loadingMessage}</h1>
        </div>
    );
};
