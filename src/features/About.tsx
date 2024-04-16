import { Container } from "@mui/material"
import CountdownText from "./CountdownText"

export const About = () => {
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <CountdownText />
        </Container>
    )
}