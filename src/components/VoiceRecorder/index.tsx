'use client';

import { useState, useRef } from 'react';

export function VoiceRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const chunks = useRef<Blob[]>([]);
    const recorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startRecording = async () => {
        chunks.current = [];
        setAudioUrl(null);

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const recorder = new MediaRecorder(stream);
        recorderRef.current = recorder;

        recorder.ondataavailable = (e) => chunks.current.push(e.data);

        recorder.onstop = () => {
            const blob = new Blob(chunks.current, { type: 'audio/webm' });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);

            stream.getTracks().forEach((t) => t.stop());
        };

        recorder.start();
        setIsRecording(true);
        setIsPaused(false);
    };

    const pauseRecording = () => {
        if (!recorderRef.current) return;
        recorderRef.current.pause();
        setIsPaused(true);
    };

    const resumeRecording = () => {
        if (!recorderRef.current) return;
        recorderRef.current.resume();
        setIsPaused(false);
    };

    const stopRecording = () => {
        if (!recorderRef.current) return;
        recorderRef.current.stop();
        setIsRecording(false);
        setIsPaused(false);
    };

    const downloadAudio = () => {
        if (!audioUrl) return;
        const a = document.createElement('a');
        a.href = audioUrl;
        a.download = 'recording.webm';
        a.click();
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6 border-2 border-cyan-100 rounded-xl bg-white shadow-sm w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold text-cyan-900">Voice Recorder</h2>

            {/* Buttons while recording */}
            {isRecording && (
                <div className="flex gap-4">
                    {!isPaused ? (
                        <button
                            onClick={pauseRecording}
                            className="px-6 py-2 bg-cyan-50 text-cyan-600 border-2 border-cyan-200 rounded-full font-semibold hover:bg-cyan-100 transition-colors"
                        >
                            Pause
                        </button>
                    ) : (
                        <button
                            onClick={resumeRecording}
                            className="px-6 py-2 bg-cyan-500 text-white rounded-full font-semibold hover:bg-cyan-600 transition-colors shadow-md"
                        >
                            Resume
                        </button>
                    )}

                    <button
                        onClick={stopRecording}
                        className="px-6 py-2 bg-white text-red-500 border-2 border-red-100 rounded-full font-semibold hover:bg-red-50 transition-colors"
                    >
                        Stop
                    </button>
                </div>
            )}

            {/* Start Button */}
            {!isRecording && !audioUrl && (
                <button
                    onClick={startRecording}
                    className="px-8 py-4 bg-cyan-500 text-white rounded-full font-bold text-lg hover:bg-cyan-600 transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                    Start Recording
                </button>
            )}

            {/* Playback + Download */}
            {audioUrl && !isRecording && (
                <div className="flex flex-col items-center gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="w-full p-3 bg-cyan-50 rounded-xl border border-cyan-100">
                        <audio controls src={audioUrl} className="w-full h-10" />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={downloadAudio}
                            className="px-6 py-2.5 bg-cyan-500 text-white rounded-full font-semibold hover:bg-cyan-600 transition-colors shadow-md flex items-center gap-2"
                        >
                            <span>Download</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </button>

                        <button
                            onClick={startRecording}
                            className="px-6 py-2.5 bg-white text-cyan-600 border-2 border-cyan-100 rounded-full font-semibold hover:bg-cyan-50 transition-colors"
                        >
                            Record Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}