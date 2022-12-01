import { Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image'
import { Box } from '@mui/system';
import { RoomShcemaProps } from '../../lib/model/room';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { formatDate } from '../../util/dateCutting';
export default function GridPlaceItem({ item }: { item: RoomShcemaProps }) {
    const [photoNo, setPhotoNo] = useState<number>(0)
    const [createdTime] = useState(formatDate(item.complete?.Date))
    const router = useRouter();
    const setPhoto = (type: string) => {
        if (type === 'before') {
            photoNo === 0 ? setPhotoNo(item.photo!.length - 1) : setPhotoNo(current => current - 1)
        }
        if (type === 'next') {
            photoNo === item.photo!.length - 1 ? setPhotoNo(0) : setPhotoNo(current => current + 1)
        }
    }
    return (
        <Grid
            alignItems="center"
            item lg={3} md={4} sm={6}
            sx={{
                position: "relative"
            }} >
            <Box sx={{
                boxShadow: '3px 3px 5px #555',
                borderRadius: '14px',
                height: "280px",
                width: "100%",
                position: "relative"
            }}>
                <IconButton
                    sx={{
                        position: "absolute", height: '40px',
                        top: 120, backgroundColor: 'white',
                        left: 2,
                        zIndex: 2
                    }}
                    onClick={() => setPhoto('before')}>
                    <ArrowBackIosNewRoundedIcon />
                </IconButton>
                <Image onClick={() => router.push('/rooms/' + item.roomId)} style={{
                    objectFit: "cover",
                    borderRadius: 14,
                    cursor: "pointer",
                }} draggable={false} fill={true} src={item.photo![photoNo]} alt='placeCover' />
                <IconButton
                    sx={{
                        height: '40px', position: 'absolute',
                        top: 120, right: 2,
                        backgroundColor: 'white'
                    }}
                    onClick={() => setPhoto('next')}>
                    <ArrowForwardIosRoundedIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: "column", width: 'auto' }}>
                <Typography mt={1} sx={{}}>
                    {item?.location?.info?.country} &nbsp;
                    {item?.location?.info?.administrative_area_level_1}
                </Typography>
                <Typography>
                    <b>￦ {item.price!.price?.toLocaleString()}</b> / 박
                    <span style={{ float: 'right', fontSize: '12px', marginRight: '15px' }}>{createdTime + " 등록됨"}</span>
                </Typography>
            </Box>
        </Grid>
    )
}