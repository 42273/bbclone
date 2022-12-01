import { Box, Typography } from "@mui/material"
import { guestType } from "../../../pages/rooms/[roomId]"
import MinusIcon from "../../hostLayout/pageTrib/minusIcon"
import PlusIcon from "../../hostLayout/pageTrib/plusIcon"
import { SxProps } from '@mui/system';

type ItemType = {
    maxGuest: number;
    guest: guestType;
    handleGuestPlus: (type: keyof guestType) => void;
    handleGuestMinus: (type: keyof guestType) => void;

}
const plusMinusIconBoxStyle: SxProps = {
    p: 2,
    display: "flex",
    alignItems: 'center',
    justifyContent: "space-between",
    wordBreak: 'keep-all'
}
const boxStyle: SxProps = {
    width: '40%', maxWidth: '115px', justifyContent: "space-between", display: 'flex'
}
export default function PlaceItemPlusMinusPopperContent({ maxGuest, guest, handleGuestMinus, handleGuestPlus }: ItemType) {


    return <>
        <Box sx={plusMinusIconBoxStyle}>
            <Typography >
                <b> 성인</b><br /><span style={{ fontSize: '14px' }}>만 13세 이상</span>
            </Typography>
            <Box sx={boxStyle}>
                <MinusIcon disabled={guest.adult === 1 ? true : false} minusHandle={() => handleGuestMinus('adult')} />
                {guest.adult}
                <PlusIcon disabled={(guest.child + guest.adult) >= maxGuest ? true : false} plusHandle={() => handleGuestPlus('adult')} />
            </Box>
        </Box>
        <Box sx={plusMinusIconBoxStyle}>
            <Typography > <b>어린이</b><br /><span style={{ fontSize: '14px' }}>만 2~12세</span></Typography>
            <Box sx={boxStyle}>
                <MinusIcon disabled={guest.child === 0 ? true : false} minusHandle={() => handleGuestMinus('child')} />
                {guest.child}
                <PlusIcon disabled={(guest.child + guest.adult) >= maxGuest ? true : false} plusHandle={() => handleGuestPlus('child')} />
            </Box>
        </Box>
        <Box sx={plusMinusIconBoxStyle}>
            <Typography > <b>유아</b><br /><span style={{ fontSize: '14px' }}>만 2세 미만</span>
            </Typography>
            <Box sx={boxStyle}>
                <MinusIcon disabled={guest.kid === 0 ? true : false} minusHandle={() => handleGuestMinus('kid')} />
                {guest.kid}
                <PlusIcon plusHandle={() => handleGuestPlus('kid')} />
            </Box>
        </Box>
        <Box sx={plusMinusIconBoxStyle}>
            <Typography > <b>반려동물</b><br /><span style={{ fontSize: '14px' }}>보조동물을 동반하시나요?</span>
            </Typography>
            <Box sx={boxStyle}>
                <MinusIcon disabled />
                0
                <PlusIcon disabled />
            </Box>
        </Box>
        <Box p={2} sx={{ color: '#222222', fontSize: '12px' }}>
            이 숙소의 최대 숙박 인원은 6명(유아 포함)입니다. 반려동물 동반은 허용되지 않습니다.
        </Box>


    </>
}