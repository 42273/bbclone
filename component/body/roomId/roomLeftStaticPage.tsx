import { Grid, Typography, Divider, Box } from '@mui/material';
import { DateRange } from "@mui/x-date-pickers-pro";
import { RoomShcemaProps } from '../../../lib/model/room';
import { formatDate } from '../../../util/dateCutting';
import { objIcon } from '../../hostLayout/pageTrib/amenitiesUtilIcon';
import BottomDateRangePickter from './bottomDateRangePickter';
export default function RoomLeftStaticPage({ roomInfo, tripDay, calendarCount, setTripDay, disableDateRange }: {
    roomInfo: RoomShcemaProps, tripDay: DateRange<Date>, calendarCount: 1 | 2 | 3, setTripDay: (newValue: DateRange<Date>) => void,
    disableDateRange: (day: Date) => boolean
}) {
    return <>
        <Box flex={1} maxWidth='750px' minWidth='450px' >
            <h2>{roomInfo.email.split('@')[0]} 님이 호스팅하는 {roomInfo.group} 숙소</h2>
            <Typography>
                욕실 {roomInfo!.floorPlan?.bathroom}개 ·
                침대 {roomInfo!.floorPlan?.bed}개 ·
                침실 {roomInfo!.floorPlan?.bedroom}개 ·
                최대 인원 {roomInfo!.floorPlan?.guest} 명
            </Typography>
            {roomInfo.complete?.Date ? formatDate(roomInfo.complete?.Date) + " 등록됨" : " "}
            <Divider sx={{ my: 3 }} />
            <h2 style={{ margin: 0 }}>숙소 편의시설</h2>
            <Grid container sx={{}}>
                {roomInfo.amenities?.map(amen => {
                    return <Grid item xs={6} key={amen} style={{ display: "flex", marginTop: '50px' }}>
                        {objIcon[amen].icon} &nbsp;
                        {objIcon[amen].title}
                        <br />
                    </Grid>
                })}
            </Grid>
            <Divider sx={{ my: 1.5, mt: 5 }} />
            <h2><span style={{ color: 'rgb(230,30,77)' }}>에어</span>커버</h2>
            <Typography variant="body1">
                모든 예약에는 호스트가 예약을 취소하거나 숙소 정보가 정확하지 않은 경우 또는 체크인에 문제가 있는 상황에 대비한 무료 보호 프로그램이 포함됩니다.
            </Typography>
            <Divider sx={{ my: 1.5 }} />
            <Typography my={5}>
                하얀 모래, 시원한 푸른 물, 향기로운 꽃 향기가 가득한 고급 저택입니다.   아쿠아홀릭은 매력적인 이리타하마 해변에 위치해 있으며, 미국에서 가장 아름다운 해변 중 하나로 자랑합니다.  테라스에서 시원한 바닷바람을 즐기고, 멋진 백사장과 깨끗한 푸른 바다의 전망을 감상해보세요.  발코니의 외관에서 계단을 내려가면 해변으로 쉽게 미끄러질 수 있습니다.
            </Typography>
            <Divider sx={{ my: 1.5 }} />
            <BottomDateRangePickter disableDateRange={disableDateRange}
                roomInfo={roomInfo} tripDay={tripDay} setTripDay={setTripDay} calendarCount={calendarCount}
            />
        </Box>
    </>
}