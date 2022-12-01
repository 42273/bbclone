import { Box } from "@mui/material"
import { SxProps } from '@mui/system';
import { DateRange } from "@mui/x-date-pickers-pro";
import format from "date-fns/format";

const selectTopButtonStyle: SxProps = {
    height: '50px',
    width: '50%',
    cursor: 'pointer',
    borderTop: '1px solid #717171',
    borderBottom: '1px solid #717171',
    borderRight: '1px solid #717171',
    borderCollapse: "collapse",
    display: "flex",
    flexDirection: "column",
    px: 2,
    py: '2px',
    justifyContent: "center"
}

interface RightStickyButtonProps {
    calendarRef: React.MutableRefObject<HTMLElement>;
    tripDay: DateRange<Date>;
    handleDateClick: (event: React.MouseEvent) => void;

}
export default function RightStickyButton({ calendarRef, tripDay, handleDateClick }: RightStickyButtonProps) {
    return <Box className="preventG" ref={calendarRef} onClick={handleDateClick} style={{ display: "flex" }}>
        <Box sx={{
            ...selectTopButtonStyle, borderTopLeftRadius: '5px', borderLeft: '1px solid #717171',
        }}>
            <span style={{ fontSize: '8px' }}>체크인</span>
            <span style={{ fontSize: '14px' }}>{tripDay[0] ? format(tripDay[0]! ?? null, 'yyyy. MM. dd') : "날짜 추가"}</span>
        </Box>
        <Box sx={{
            ...selectTopButtonStyle,
            borderTopRightRadius: '5px',
        }}>
            <span style={{ fontSize: '8px' }}>체크아웃</span>
            <span style={{ fontSize: '14px' }}>{tripDay[1] ? format(tripDay[1]! ?? null, 'yyyy. MM. dd') : "날짜 추가"}</span>
        </Box>
    </Box>
}