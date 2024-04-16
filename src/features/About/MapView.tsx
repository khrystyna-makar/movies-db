import { Box, Container, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { addPopupToMapWidget, createMapWidget } from "./mapWidget";
import { Map } from 'leaflet'
import FavoriteIcon from "@mui/icons-material/Favorite";
import { createPortal } from "react-dom";

export default function MapView() {

    const containerRef = useRef<HTMLDivElement>();
    const mapRef = useRef<Map | null>(null);
    const [popupContainer, setPopupContainer] = useState<HTMLElement | null>(null)

    useEffect(() => {
        if (mapRef.current === null) {
            const map = createMapWidget(containerRef.current!);
            mapRef.current = map;
            const popupDiv = addPopupToMapWidget(map);
            setPopupContainer(popupDiv);
        }
    }, [])

    return (
        <Container ref={containerRef} sx={{ width: 800, height: 500, my: 2 }}>
            {popupContainer !== null && createPortal(<Greeting />, popupContainer)}
        </Container>
    )
}

function Greeting() {
    return (
        <Box>
            <Typography>Greetings from Ukraine!</Typography>
            <FavoriteIcon sx={{ color: "#0056B9" }} />
            <FavoriteIcon sx={{ color: "#FFD800" }} />
        </Box>
    )
}