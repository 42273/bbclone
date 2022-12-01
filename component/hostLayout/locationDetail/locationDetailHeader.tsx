import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box } from "@mui/material"
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';


export default function LocationDetailHeader({ backHandle }: { backHandle: () => void }) {

    return (
        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", pt: "2vh", }}>
            <IconButton onClick={backHandle} sx={{ position: "absolute", left: "3.5%" }}>
                <ArrowBackIosIcon />
            </IconButton>
            <Typography textAlign={'center'} variant='h6'>
                주소 확인
            </Typography>
        </Box>
    )
}