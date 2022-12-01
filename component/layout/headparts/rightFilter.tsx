import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { useContext } from 'react';
import { Ctx } from '../../../context/context';

export default function RightFilter() {
    const ctx = useContext(Ctx)
    return (
        <>
            <Box sx={{ mx: 1, my: 2 }} onClick={() => ctx?.setCatetoryFilter("")} >
                <Button
                    disableRipple
                    style={{}}
                    sx={{ width: "5rem", height: "3rem", borderRadius: 2, border: 1, borderColor: "#eeeeee", borderWidth: 1 }}
                >
                    <TuneOutlinedIcon sx={{ mr: 1.5 }} fontSize='small' color='action' />
                    <span style={{ fontSize: 12, color: "black", width: "max-content", fontWeight: "bold" }}>필터해제</span>
                </Button>
            </Box>
        </>
    )
}