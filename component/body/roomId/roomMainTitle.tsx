import { Typography } from '@mui/material';
import { RoomShcemaProps } from '../../../lib/model/room';
export default function ({ roomInfo }: { roomInfo: RoomShcemaProps }) {
    return <>
        <Typography sx={{ mt: '20px', mb: '-20px', fontSize: '26px', color: '#222222', fontWeight: 600 }}>
            {roomInfo.title ?? "임시타이틀"} <br />
            <span style={{ fontSize: '20px' }}>{roomInfo.location?.info.country + " "}{roomInfo.location?.info.sublocality_level_1}</span>
        </Typography>
    </>
}