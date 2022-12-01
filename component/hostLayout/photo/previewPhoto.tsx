import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, IconButton } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function PreviewPhoto(props: {
    target: File, index: number, dropHandle: React.DragEventHandler,
    filesDeleteHandle: (index: number) => void
}) {
    const [img, setImg] = React.useState<string | null>(null)
    React.useEffect(() => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(props.target);
        fileReader.onload = rst => setImg(rst.target?.result as string);
    }, [])
    return (
        <>
            <Grid item xs={props.index === 0 ? 11 : 5} height={props.index === 0 ? 480 : 300}
                width={props.index === 0 ? 700 : "auto"}
                onDrop={props.dropHandle}
                sx={{ my: "20px", p: "2px" }}
            >
                <IconButton sx={{
                    float: "right", marginBottom: -20, backgroundColor: "white", boxShadow: '1px 1px 1px gray '
                }} onClick={() => props.filesDeleteHandle(props.index)}>
                    <DeleteForeverIcon />
                </IconButton>
                <Box width="100%" height="100%">

                    <img style={{ objectFit: "fill", height: "100%", width: "100%" }} src={img!} alt="previewImg" />
                </Box>
            </Grid>
        </>
    )
}