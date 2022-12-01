import { Box } from '@mui/material';
import { DateRange, StaticDateRangePicker } from "@mui/x-date-pickers-pro";
import { differenceInDays } from 'date-fns';
import { RoomShcemaProps } from '../../../lib/model/room';


export default function ({ roomInfo, tripDay, calendarCount, setTripDay, disableDateRange }: {
    roomInfo: RoomShcemaProps, tripDay: DateRange<Date>, calendarCount: 1 | 2 | 3, setTripDay: (newValue: DateRange<Date>) => void
    , disableDateRange: (day: Date) => boolean
}) {
    return <>
        <Box sx={{ width: '100%', display: 'flex', alignItems: "center", justifyContent: "center" }}>
            <StaticDateRangePicker
                displayStaticWrapperAs="desktop"
                value={tripDay}
                disablePast={true}
                shouldDisableDate={disableDateRange}
                calendars={calendarCount}
                toolbarTitle={roomInfo.location?.info.country + "에서 " + (differenceInDays(tripDay[1]! ?? 0, tripDay[0]! ?? 0)) + "박"}
                inputFormat={"yyyy-MM-dd"}
                mask={"____년__월__일"}
                toolbarFormat={'yyyy년MM월dd일'}
                onChange={(newValue) => { setTripDay(newValue); }}
                renderInput={(startProps, endProps) => (<></>)} />
            {/* 이것은 ㅎㅏ단 달력 */}
        </Box>
    </>
}