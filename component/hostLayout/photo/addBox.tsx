import { SxProps } from '@mui/system';
import Image from "next/image";
import Grid from '@mui/material/Grid';
import * as React from 'react';

const BoxStyle: SxProps = {
    px: "6px",
    m: "6px",
    border: "1px dashed rgb(176, 176, 176)",
    height: "40vh",
    maxHeight: "280px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    ":hover": {
        border: 1,
    },
    cursor: "pointer"
}

export default function AddBox(props: { dropHandle: React.DragEventHandler, fileSelectHandle: React.ChangeEventHandler<HTMLInputElement> }) {
    const ref = React.useRef<HTMLInputElement>(null!)
    return (

        <Grid item xs={5} sx={BoxStyle} onDrop={props.dropHandle}
            onClick={() => ref.current.click()}
        >
            <Image
                src={"/images/gallery.png"} alt="gallery" width={64} height={64} />
            <input onChange={props.fileSelectHandle} multiple type={"file"} ref={ref} style={{ display: "none" }} accept="image/*" />
        </Grid>
    )
}