import { AppBar, Button, Link, Toolbar, Typography, Box } from '@mui/material'
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined'
import { Link as RouterLink } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext, anonymousUser } from './AuthContext';

function HeaderLink({ children, to }:
    { to: string, children: React.ReactNode }) {
    return (
        <Link component={RouterLink}
            to={to} variant="button"
            color="inherit"
            sx={{ my: 1, mx: 1.5 }}
        >{children}
        </Link>
    )
}

interface AuthSectionProps {
    onLogin(): void;
    onLogout(): void;
}

function AuthSection({onLogin, onLogout}: AuthSectionProps) {
    const auth = useContext(AuthContext);
    const loggedIn = auth.user != anonymousUser;
    
    if (loggedIn) {
        return (
            <>
                <Typography>Hello, {auth.user.name}
                </Typography>
                <Button color="inherit" variant="outlined" sx={{ml: 1.5}} onClick={onLogout}>Log Out</Button>
            </>
        )
    }
    return (
        <Button color="inherit" variant="outlined" onClick={onLogin}>Log In</Button>
    )
}

interface AppHeaderProps {
    onLogin(): void;
    onLogout(): void;
}

const AppHeader = ({onLogin, onLogout}: AppHeaderProps) => {
    return (
        <AppBar position="relative">
            <Toolbar>
                <LiveTvOutlinedIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit" noWrap>The Movies DB</Typography>
                <Box sx={{ flexGrow: 1 }}>
                    <nav>
                        <HeaderLink to="/">Home</HeaderLink>
                        <HeaderLink to="/movies">Movies</HeaderLink>
                        <HeaderLink to="/about">About</HeaderLink>
                    </nav>
                </Box>
                <AuthSection  onLogin={onLogin} onLogout={onLogout}/>
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader;