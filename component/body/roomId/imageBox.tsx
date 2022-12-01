import Image from "next/image";
import { Grid } from '@mui/material';
import { CSSProperties } from "react";

const coverImageStyle: CSSProperties = {
    objectFit: "cover", width: '100%', height: '405px',
    borderTopLeftRadius: '15px',
    borderBottomLeftRadius: '15px',
}
const imageStyle: CSSProperties = {
    minWidth: '200px', objectFit: "cover",
    minHeight: '198px', width: '49%',
    marginLeft: '4px'
}

export default function ImageBox({ photo }: { photo: string[] }) {
    return <>
        <Grid container
            justifyContent="center"
            alignItems='center'
            display='flex'
            direction='row'
            sx={{ mt: 6, mb: 1, minWidth: '850px', }}>
            <Grid item xs={5} md={6} sx={{}}>
                <Image alt='1st image' src={photo![0]} width={600} height={400} style={coverImageStyle} />
            </Grid>
            <Grid item xs={6} md={6} minWidth={'400px'} maxWidth={'500px'} sx={{ position: "relative", margin: '0 auto' }}>
                <Image alt='2nd image' src={photo![1]} width={300} height={200} style={imageStyle} />
                <Image alt='3rd image' src={photo![2]} width={300} height={200} style={{ ...imageStyle, borderTopRightRadius: '15px' }} />
                <Image alt='4th image' src={photo![3]} width={300} height={200} style={imageStyle} />
                <Image alt='5th image' src={photo![4]} width={300} height={200} style={{ ...imageStyle, borderBottomRightRadius: '15px' }} />
            </Grid>
        </Grid>
    </>
}