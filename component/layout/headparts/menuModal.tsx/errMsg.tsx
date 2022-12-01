import ErrorIcon from '@mui/icons-material/Error';
import { Typography } from '@mui/material';

export default function ErrMsg({ children }: { children: string }) {

    return (
        <>
            <Typography sx={{ display: "flex" }}>
                <span style={{ color: "rgb(211,47,47)" }}><ErrorIcon /></span> &nbsp;&nbsp; <span style={{ color: "rgb(211,47,47)" }}>{children}</span>
            </Typography>
        </>
    )
}