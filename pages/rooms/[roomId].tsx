import { GetServerSidePropsContext } from "next";
import dbConnect from "../../lib/dbConnect";
import room, { RoomShcemaProps } from "../../lib/model/room";
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import * as React from 'react';
import { SxProps } from '@mui/system';
import { Paper, Typography, Divider, Box } from '@mui/material';
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ColorBtn from "../../component/layout/headparts/menuModal.tsx/colorBtn";
import format from "date-fns/format";
import { differenceInDays } from "date-fns";
import PlaceItemPlusMinusPopperContent from "../../component/body/roomId/placeItemPlusMinusPopperContent";
import RightStickyButton from "../../component/body/roomId/rightStickyButton";
import NoBgBtn from "../../component/body/roomId/noBgBtn";
import { useRouter } from "next/router";
import RoomLocation from "../../component/body/roomId/roomLocation";
import { useSession } from "next-auth/react";
import ImageBox from "../../component/body/roomId/imageBox";
import RoomMainTitle from "../../component/body/roomId/roomMainTitle";
import RoomLeftStaticPage from "../../component/body/roomId/roomLeftStaticPage";
import booking, { BookingShcemaProps } from "../../lib/model/booking";
const roomBodyStyle: SxProps = {
    display: "flex",
    flexDirection: 'column',
    px: '14vw',
    wordBreak: "keep-all"
}
const selectStyle: SxProps = {
    width: '100%',
    height: '50px',
    border: '1px solid #717171',
    display: "flex",
    cursor: "pointer",
    flexDirection: "column",
    px: 2,
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
    mt: '-1px',
    py: '2px'
}
export type guestType = {
    adult: number, child: number, kid: number
}
export default function RoomPage({ roomInfo, bookedInfo }: { roomInfo: RoomShcemaProps, bookedInfo: BookingShcemaProps[] }) {
    const [calendarCount, setCalendarCount] = React.useState<1 | 2 | 3>(2);
    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
    const [anchorCal, setAnchorCal] = React.useState<Element | null>(null);
    const [guest, setGuest] = React.useState<guestType>({ adult: 3, child: 0, kid: 0 });
    const [popOpen, setPopOpen] = React.useState(false);
    const [calendarOpen, setCalendarOpen] = React.useState(false);
    const calendarRef = React.useRef<HTMLElement>(null!);
    const [tripDay, setTripDay] = React.useState<DateRange<Date>>([null, null]);
    const [totalPrice, setTotalPrice] = React.useState(roomInfo.price?.price);
    const router = useRouter();
    const session = useSession();
    let timerForResizeRoomPageStaticCalendarCount: any;
    React.useEffect(() => {
        function handleResize() {
            clearTimeout(timerForResizeRoomPageStaticCalendarCount)
            return timerForResizeRoomPageStaticCalendarCount = setTimeout(() => {
                if (window.innerWidth < 1000) {
                    setCalendarCount(1)
                } else if (window.innerWidth > 1000) {
                    setCalendarCount(2)
                }
            }, 1000)
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
    React.useEffect(() => {
        if (!(tripDay[0] && tripDay[1])) return;
        const day = differenceInDays(tripDay[1], tripDay[0]);
        setTotalPrice((roomInfo.price?.price ?? 0) * day)
    }, [tripDay[0], tripDay[1]])
    React.useEffect(() => {
        bookedInfo.sort((a, b) => Number(a.checkin) - Number(b.checkin))
    }, [])
    const disableDateRange = (day: Date) => {
        const date = Number(format(day, "yyyyMMdd"));
        if (bookedInfo.some(i => (date >= Number(i.checkin)) && (date <= Number(i.checkout)))) {
            return true
        } else {
            return false
        }
    }
    const handleChange = (newValue: DateRange<Date>) => {
        if (newValue[0]?.toString() === newValue[1]?.toString()) return;
        if (newValue[1]) {
            const enddate = Number(format(newValue[1], "yyyyMMdd"));
            const startdate = Number(format(newValue[0]!, "yyyyMMdd"));
            if (bookedInfo.some(i => (enddate >= Number(i.checkin)) && (startdate <= Number(i.checkout)))) {
                return setTripDay([newValue[0], null]);
            } else {
                setTripDay(newValue);
            }
        } else {
            setTripDay(newValue);
        }
    }
    const handleClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget!);
        setPopOpen((prev) => !prev);
    };
    const handleDateClick = (event: React.MouseEvent) => {
        setAnchorCal(event.currentTarget!);
        setCalendarOpen((prev) => !prev);
    };
    const popShowFalsehandle = (evt: any) => {
        if (!popOpen && !calendarOpen) return;
        if (popOpen) {
            if (evt.nativeEvent?.path.some((i: any) => {
                return i.className && i.className?.length && i.className.includes("preventd") ? true : false
            })) { return; }
            setPopOpen(false)
        }
        if (calendarOpen) {
            if (evt.nativeEvent?.path.some((i: any) => {
                return i.className && i.className?.length && i.className.includes("preventG") ? true : false
            })) { return; }
            setCalendarOpen(false)
        }
    };
    const handleGuestPlus = (type: keyof guestType) => {
        if (type !== 'kid' && ((guest.adult + guest.child) >= (roomInfo.floorPlan?.guest!))) return;
        setGuest(current => ({ ...current, [type]: current[type] + 1 }));
    };
    const handleGuestMinus = (type: keyof guestType) => {
        if (guest[type] === 0) return;
        setGuest(current => ({ ...current, [type]: current[type] - 1 }));
    };
    const nextStepHandle = () => {
        if (session.status === 'unauthenticated') return alert('로그인하세요!');
        if (!(tripDay[0] && tripDay[1])) return;
        const checkin = format(tripDay[0], "yyyy-MM-dd")
        const checkout = format(tripDay[1], "yyyy-MM-dd")
        router.push(`/book/stays/${roomInfo.roomId}?numberOfAdults=${guest.adult}&numberOfChildren=${guest.child}&numberOfInfants=${guest.kid}&checkin=${checkin}&checkout=${checkout}`)
    };
    return <>
        <Box onClick={popShowFalsehandle} sx={roomBodyStyle}>
            <RoomMainTitle roomInfo={roomInfo} />
            <ImageBox photo={roomInfo.photo!} />
            <Box sx={{ display: 'flex' }}>
                <RoomLeftStaticPage disableDateRange={disableDateRange} roomInfo={roomInfo} setTripDay={setTripDay} tripDay={tripDay} calendarCount={calendarCount} />
                <Box sx={{ minWidth: '350px', height: '100%', display: 'flex', justifyContent: "flex-end", position: 'sticky', top: 50, }}>
                    <Paper elevation={3} sx={{ width: '95%', maxWidth: '380px', display: 'flex', justifyContent: "center", flexDirection: "column", p: 5, }}>
                        {(tripDay[0] && tripDay[1]) ?
                            <span><span style={{ color: "black", fontSize: "22px", fontWeight: 'bold' }}>￦{roomInfo.price?.price?.toLocaleString()}</span> /박 </span>
                            :
                            <span style={{ fontSize: 22, color: '#222222' }} >요금을 확인하려면 날짜를 입력하세요.</span>
                        }
                        <Box mt={3}>
                            <div>
                                <RightStickyButton handleDateClick={handleDateClick} tripDay={tripDay} calendarRef={calendarRef} />
                                <Box>
                                    <Popper modifiers={[{ name: 'flip', enabled: false }, { name: "preventOverflow", enabled: false, }]}
                                        className="preventG" open={calendarOpen} anchorEl={anchorCal} placement={'bottom'} transition>
                                        {({ TransitionProps }) => (
                                            <Fade {...TransitionProps} timeout={0}>
                                                <Paper elevation={3} sx={{ borderRadius: 5, width: '660px', height: '550px', mt: '-60px', p: 1, ml: 'calc(-20%*1.12)', px: 3 }}>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Box width={'55%'}>
                                                            {(tripDay[0] && tripDay[1]) ?
                                                                <>
                                                                    <h2>{differenceInDays(tripDay[1], tripDay[0])}박</h2>
                                                                    <span style={{ color: '#717171', fontSize: '14px' }}>
                                                                        {format(tripDay[0], "yyyy년 MM월 dd일")} - {format(tripDay[1], "yyyy년 MM월 dd일")}
                                                                    </span>
                                                                </>
                                                                :
                                                                <>
                                                                    <h2>날짜 선택</h2>
                                                                    <span>여행 날짜를 입력하여 정확한 요금을 확인하세요.</span>
                                                                </>
                                                            }
                                                        </Box>
                                                        <Box width='45%' sx={{ display: 'flex', flexDirection: "row", height: '50px', mt: '3.5px', mr: '20px', border: '1px solid #717171', borderRadius: '5px', lineHeight: '1.5', px: '2px' }} >
                                                            <Box sx={{ px: 1.5, py: 1, width: '50%', display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                                                                <span style={{ fontSize: '8px' }}>체크인</span>
                                                                <input onChange={() => { }} className="boxDateInput" type="text" style={{ border: 0, padding: 0, fontSize: '15px', marginTop: '2px', letterSpacing: -0.5 }} value={tripDay[0] ? format(tripDay[0]! ?? null, 'yyyy. MM. dd') : "날짜 추가"} />
                                                            </Box>
                                                            <Box sx={{ ml: '1px', p: 2, width: '50%', display: 'flex', flexDirection: 'column', justifyContent: "center", borderLeft: '1px solid #717171' }}>
                                                                <span style={{ fontSize: '8px' }}>체크아웃</span>
                                                                <input onChange={() => { }} className="boxDateInput" type="text" style={{ border: 0, padding: 0, fontSize: '15px', marginTop: '2px', letterSpacing: -0.5 }} value={tripDay[1] ? format(tripDay[1]! ?? null, 'yyyy. MM. dd') : "날짜 추가"} />
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    {/* 이것은 우측 달력 */}
                                                    <StaticDateRangePicker
                                                        displayStaticWrapperAs="desktop"
                                                        value={tripDay}
                                                        disablePast={true}
                                                        calendars={2}
                                                        toolbarTitle={roomInfo.location?.info.country + "에서 " + "박"}
                                                        inputFormat={"yyyy-MM-dd"}
                                                        mask={"____년__월__일"}
                                                        toolbarFormat={'yyyy년MM월dd일'}
                                                        shouldDisableDate={disableDateRange}
                                                        onChange={handleChange}
                                                        renderInput={(startProps, endProps) => (
                                                            <>
                                                            </>
                                                        )}
                                                    />
                                                    <Box display={'flex'} sx={{ float: 'right' }}>
                                                        <div style={{}} onClick={() => setTripDay([null, null])} >
                                                            <NoBgBtn style={{ color: 'black' }} >날짜 지우기</NoBgBtn>
                                                        </div>
                                                        <div style={{}} onClick={() => setCalendarOpen(false)} >
                                                            <ColorBtn color="rgb(34,34,34)" style={{ color: 'white', margin: '0 auto', right: 0 }} >닫기</ColorBtn>
                                                        </div>
                                                    </Box>
                                                </Paper>
                                            </Fade>
                                        )}
                                    </Popper>
                                </Box>
                                <Box sx={popOpen ? { ...selectStyle, border: 2, px: '15px', py: '1px' } : selectStyle}
                                    onClick={handleClick}>
                                    <span style={{ fontSize: '8px' }}>인원</span>
                                    <div style={{ display: 'flex' }}>
                                        <span style={{ color: 'black' }}>게스트 {guest.adult + guest.child} 명</span>
                                        <span style={{ right: 0, margin: '0 auto' }}>{!popOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />} </span>
                                    </div>
                                </Box>
                                {(tripDay[0] && tripDay[1]) ?
                                    <div onClick={nextStepHandle}>
                                        <ColorBtn color={'rgb(229,29,84)'} style={{ borderRadius: 2.2, width: '100%', mt: 3, fontSize: '16px', fontWeight: '600', height: '3rem', color: "white" }}> 예약하기</ColorBtn>
                                    </div>
                                    :
                                    <div onClick={() => calendarRef.current.click()}>
                                        <ColorBtn color={'rgb(229,29,84)'} style={{ borderRadius: 2.2, width: '100%', mt: 3, fontSize: '16px', fontWeight: '600', height: '3rem', color: "white" }}> 예약 가능 여부 보기</ColorBtn>
                                    </div>
                                }
                                {(tripDay[0] && tripDay[1]) &&
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                        <span style={{ fontSize: '14px', margin: '15px' }}>
                                            예약 확정 전에는 요금이 청구되지 않습니다
                                        </span>
                                        <Box sx={{ display: 'flex', width: '100%' }}>
                                            <Typography width={'70%'} sx={{ textDecoration: 'underline', textUnderlinePosition: 'under', lineHeight: '35px', letterSpacing: '-0.2px' }} >
                                                ￦ {roomInfo.price?.price?.toLocaleString()} x {differenceInDays(tripDay[1], tripDay[0])}박<br />                                                서비스 수수료
                                            </Typography>
                                            <Typography width={'30%'} sx={{ lineHeight: '35px', letterSpacing: '-0.2px', textAlign: "right" }}>
                                                ￦{totalPrice?.toLocaleString()}
                                                <br />
                                                ￦{(~~((totalPrice ?? 0) * 0.14)).toLocaleString()}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', width: '100%', mt: 3, pt: 3, borderTop: '1px solid rgba(0,0,0,0.12)', }}>
                                            <Typography width={'70%'} fontWeight='bold' >                                                총 합계                                            </Typography>
                                            <Typography fontWeight='bold' width={'30%'} sx={{ lineHeight: '35px', letterSpacing: '-0.2px', textAlign: "right" }}>
                                                ￦{(totalPrice ?? 0 + (~~((totalPrice ?? 0) * 0.14)))?.toLocaleString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                }
                                <Box width={'320px'}>
                                    <Popper modifiers={[{ name: 'flip', enabled: false }]}
                                        className="preventd" open={popOpen} anchorEl={anchorEl} placement={'bottom-end'} transition>
                                        {({ TransitionProps }) => (
                                            <Fade {...TransitionProps} timeout={100}>
                                                <Paper elevation={5} sx={{ minWidth: '260px', width: '30vw', maxWidth: '327.5px' }}>
                                                    <PlaceItemPlusMinusPopperContent maxGuest={~~(roomInfo.floorPlan?.guest!)} guest={guest} handleGuestMinus={handleGuestMinus} handleGuestPlus={handleGuestPlus} />
                                                </Paper>
                                            </Fade>
                                        )}
                                    </Popper>
                                </Box>
                            </div>
                        </Box>
                    </Paper>
                </Box>
            </Box>
            <Divider sx={{ my: 5 }} />
            <h2>호스팅 장소</h2>
            <Box width={'100%'} minWidth={'500px'} height={500}>
                <RoomLocation location={roomInfo.location?.coordinate!} />
            </Box>
        </Box>
    </>
}

export async function getServerSideProps(props: GetServerSidePropsContext) {
    const roomId = props.query.roomId;
    let roomInfo = null;
    let bookedInfo = null;
    try {
        await dbConnect();
        roomInfo = await room.findOne({ roomId: roomId }, { _id: 0 }).lean();
        bookedInfo = await booking.find({ productId: roomId }, { _id: 0 }).lean();
    } catch (e: unknown) {
        if (e instanceof Error) console.log(e.message);
        else console.log(e);
        return { notFound: true }
    }
    return {
        props: {
            roomInfo: roomInfo,
            bookedInfo: bookedInfo
        }
    }
}
RoomPage.layout = "rooms"