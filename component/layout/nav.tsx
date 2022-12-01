import FilterMap from "./headparts/filterMap";
import * as React from 'react';
import { Box } from '@mui/system';
import Toolbar from '@mui/material/Toolbar';
import FilterModal from "./navparts/filterModal";


export default function Nav() {
    const [coordinate, setCoordinate] = React.useState(0);
    const [open, setOpen] = React.useState<boolean>(false);
    
    const handleMove = (event: React.SyntheticEvent, newValue: number) => {
        setCoordinate(newValue);
    };
    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.paper',
                }}
            >
                <Toolbar component="nav" variant="dense" sx={{ justifyContent: "center" }}>
                    <FilterMap handleMove={handleMove} coordinate={coordinate} />
                </Toolbar>
            </Box>
            <FilterModal open={open} setOpen={setOpen} />
        </>
    )
}
