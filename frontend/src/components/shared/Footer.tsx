import Typography from '@mui/material/Typography';

function Footer() {
    return (
        <footer className="w-full py-1 backdrop-filter backdrop-blur-md">
            <Typography
                variant="body2"
                align="center"
                color="textSecondary"
                className="w-full"
            >
                {'Copyright © '}
                <a className="underline" href='/'>
                    HumbleWalking 
                </a>
                {' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </footer>
    );
}

export default Footer;