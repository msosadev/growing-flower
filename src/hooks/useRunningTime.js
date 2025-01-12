import { useEffect, useState } from 'react';

export default function useRunningTime() {
    const [runningTime, setRunningTime] = useState(0);

    useEffect(() => {
        if (!localStorage.getItem('starterTime')) localStorage.setItem('starterTime', new Date());
        const starterTime = Date.parse(localStorage.getItem('starterTime'));
        const updateTime = setInterval(() => {
            const currentTime = new Date();
            setRunningTime((currentTime - starterTime) / 6000000);
        }, 1000);

        return () => {
            clearInterval(updateTime)
        };
    })

    return runningTime;
}
