import { Card, CardMedia, CardActions, IconButton } from "@mui/material";
import { useRef, useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'

export default function CountdownVideo() {
    const [isPlaying, setIsPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null);

    function togglePlaying() {
        const nextPlaying = !isPlaying;

        if (nextPlaying) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    }

    return (
        <Card>
            <CardMedia>
                <video ref={videoRef} src="https://www.pexels.com/download/video/3843433" height="500" onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)} />
            </CardMedia>
            <CardActions>
                <IconButton onClick={togglePlaying}>
                    {isPlaying ?
                        (<PauseIcon sx={{ height: 38, width: 38 }} />)
                        :
                        (<PlayArrowIcon sx={{ height: 38, width: 38 }} />)
                    }
                </IconButton>
            </CardActions>
        </Card>
    )
}