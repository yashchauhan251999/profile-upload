import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
    duration: number; // Duration in seconds
    onUpload?: (name: string) => void;
    fileName: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ duration, onUpload, fileName }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 100 / (duration * 10);
                if (newProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return newProgress;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [duration]);

    useEffect(() => {
        if (progress === 100) {
            onUpload && onUpload(fileName);
        }
    }, [progress]);

    return (
        <div className="relative w-full h-2 bg-gray-200 rounded">
            <div
                className="absolute left-0 top-0 h-full bg-blue-900 rounded transition-all"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;