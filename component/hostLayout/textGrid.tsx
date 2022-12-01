import { ReactNode } from "react";
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material"
import Icon from "./headparts/icon"
import { leftGridStyle } from "../../pages/become-a-host/[itemId]/property-type-group";
export default function TextGrid({ children }: { children: ReactNode }) {

    return (
        <>
            <Grid item sx={leftGridStyle} xs={6}>
                <Icon />
                <Typography sx={{ lineHeight: 1.2, fontWeight: "bold", fontSize: 48, textAlign: "left", wordBreak: "keep-all", }}    >
                    {children}
                </Typography>
            </Grid>
        </>
    )
}