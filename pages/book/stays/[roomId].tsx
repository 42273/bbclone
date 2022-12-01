import { useRouter } from "next/router";
import ColorBtn from "../../../component/layout/headparts/menuModal.tsx/colorBtn";
import { SxProps } from '@mui/system';
import format from "date-fns/format";
import { differenceInDays, getDate, sub } from "date-fns";
import { Box, Divider, IconButton, Radio, Typography } from "@mui/material"
import { GetServerSidePropsContext } from "next";
import * as React from 'react';
import { useSession } from "next-auth/react";
import { bookingRegitReq } from "../../../util/utils";
import Head from "next/head";
import dbConnect from "../../../lib/dbConnect";
import room, { RoomShcemaProps } from "../../../lib/model/room";
import Image from "next/image";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import NoBgBtn from "../../../component/body/roomId/noBgBtn";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const radioBoxStyle: SxProps = {
    display: 'flex', justifyContent: "space-between", alignItems: "flex-start",
    p: "15px", m: "-1px"
}
export default function BookStaysPage({ bookInfo, roomInfo }: {
    roomId: number, bookInfo: {
        numberOfAdults: number, numberOfChildren: number, checkin: string, numberOfInfants: number, checkout: string
    }, roomInfo: RoomShcemaProps
}) {
    const router = useRouter();
    const [checkDate, setCheckDate] = React.useState<{ startDate: Date, endDate: Date }>({ startDate: new Date(bookInfo.checkin), endDate: new Date(bookInfo.checkout) });
    const [guest, setGuest] = React.useState<{adult: number, children: number, infants: number}>({ adult: bookInfo.numberOfAdults, children: bookInfo.numberOfChildren, infants: bookInfo.numberOfInfants })
    const session = useSession()
    const [cost, setCost] = React.useState<number>(((roomInfo.price?.price!) * (differenceInDays(checkDate.endDate, checkDate.startDate))))
    const [costOption, setCostOption] = React.useState<"a" | "b">("a")
    React.useEffect(() => {
        const calcCost = ((roomInfo.price?.price!) * (differenceInDays(checkDate.endDate, checkDate.startDate)));
        setCost(calcCost)
    }, [checkDate])

    const optionHandleChange = (value: "a" | "b", checked: boolean) => {
        setCostOption(value);
    }

    return (
        <>
            <Head>
                <title>예약 요청</title>
            </Head>
            <Box sx={{ flexDirection: 'column', display: "flex", width: '100%', minWidth: '500px' }} >
                <Box flex={1} sx={{ px: '10px', mx: "10%" }} >
                    <Box>
                        <h1 style={{ paddingTop: '64px', paddingBottom: '16px', width: '100%' }} >
                            <IconButton sx={{ mr: 2 }} onClick={() => router.back()} >
                                <ArrowBackIosIcon sx={{ ml: '5px', fontWeight: 'bold' }} />
                            </IconButton>
                            예약 요청
                        </h1>
                    </Box>
                    <Box sx={{ display: "flex", wordBreak: "keep-all" }}  >
                        <Box sx={{ minWidth: '450px', width: '55%' }} >
                            <h2>예약 정보</h2>
                            <Box sx={{ justifyContent: "space-between", display: 'flex', lineHeight: '40px' }}>
                                <Box>
                                    <h3 style={{ margin: 0, color: "#333333" }}>날짜</h3>
                                    {format(checkDate.startDate, "yyyy년 MM월 dd일") + "~" + getDate(checkDate.endDate) + "일"}
                                </Box>
                                <Box onClick={()=>router.back()} >
                                    <NoBgBtn style={{ color: 'black',textUnderlinePosition:"under" }}>
                                        수정(뒤로가기)
                                    </NoBgBtn>
                                </Box>
                            </Box>
                            <Box sx={{ justifyContent: "space-between", display: 'flex', lineHeight: '40px' }}>
                                <Box>
                                    <h3 style={{ margin: 0, color: "#333333" }} >게스트</h3>
                                    {bookInfo.numberOfInfants > 0 ?
                                        `게스트 ${Number(bookInfo.numberOfAdults) + Number(bookInfo.numberOfChildren)}명, 유아 ${bookInfo.numberOfInfants}명`
                                        :
                                        `게스트 ${Number(bookInfo.numberOfAdults) + Number(bookInfo.numberOfChildren)}명`
                                    }
                                </Box>
                                <Box onClick={()=>router.back()} >
                                    <NoBgBtn style={{ color: 'black' ,textUnderlinePosition:"under"}}>
                                        수정(뒤로가기)
                                    </NoBgBtn>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 4 }} />
                            <Box>
                                <h2>결제 방식 선택하기</h2>
                                <Box sx={{ border: "1px solid rgb(221,221,221)", borderCollapse: 'collapse', borderRadius: '8px', my: 2 }}>
                                    <label style={{ cursor: "pointer" }}>
                                        <Box sx={costOption === 'a' ? { ...radioBoxStyle, padding: "13px", border: "2px solid black", borderTopLeftRadius: '8px', borderTopRightRadius: '8px' } : radioBoxStyle}>
                                            <Box width={'90%'} my={0.5} >
                                                <span style={{ justifyContent: "space-between", display: "flex", marginBottom: 5 }}>
                                                    <span style={{ color: "#000000", fontSize: "16px", fontWeight: 800 }} >전액 결제</span>
                                                    <span><b>￦ {cost.toLocaleString()}</b></span>
                                                </span>
                                                <span>총액을 결제하시면 모든 절차가 완료됩니다.</span>
                                            </Box>
                                            <Radio
                                                checked={costOption === 'a'} disableRipple
                                                onChange={(event) => optionHandleChange("a", event.target.checked)}
                                                value="a"
                                                name="radio-buttons" sx={{ heightL: '24px', m: 0, p: 0, color: '#222222', }}
                                                inputProps={{ 'aria-label': 'A' }}
                                            />
                                        </Box>
                                    </label>
                                    <label style={{ cursor: "pointer" }}>
                                        <Box sx={costOption === 'b' ? { ...radioBoxStyle, padding: "13px", border: "2px solid black", borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' } : radioBoxStyle}>
                                            <Box width={'90%'} my={0.5}>
                                                <span style={{ justifyContent: "space-between", display: "flex", marginBottom: 5 }}>
                                                    <span style={{ color: "#000000", fontSize: "16px", fontWeight: 800 }} >요금 일부는 지금 결제, 나머지는 나중에 결제</span>
                                                    <span><b>￦ {(~~(cost / 2)).toLocaleString()}</b></span>
                                                </span>
                                                <span>지금 ₩{(~~(cost / 2)).toLocaleString()}을(를) 결제하시면, 나머지 금액(₩{(cost - (~~(cost / 2))).toLocaleString()})은 동일한 결제수단으로 2022년 12월 24일 자동 청구됩니다. 추가 수수료는 없습니다.</span>
                                            </Box>
                                            <Radio
                                                checked={costOption === 'b'}
                                                onChange={(event) => optionHandleChange("b", event.target.checked)}
                                                value="b"
                                                name="radio-buttons" sx={{ heightL: '24px', m: 0, p: 0, color: '#222222', ":checked": { color: "black" } }}
                                                inputProps={{ 'aria-label': 'B' }}
                                            />
                                        </Box>
                                    </label>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 4 }} />
                            <Box>
                                <h2>결제 수단</h2>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={10}
                                            onChange={() => { }}
                                            defaultValue={10}
                                        >
                                            <MenuItem value={10}>신용카드 또는 체크카드</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 4 }} />
                            <Box>
                                <h2>필수 입력 정보</h2>
                                <Box sx={{ justifyContent: "space-between", display: 'flex', my: 2 }}>
                                    <Box width={'80%'}>
                                        <h3 style={{ margin: 0, color: "#000000" }}>호스트에게 메시지 보내기</h3>
                                        <span>호스트에게 여행 목적과 도착 예정 시간을 알려주세요.</span>
                                    </Box>
                                    <Box>
                                        <NoBgBtn disable style={{ borderRadius: '8px', color: 'black', border: 1, textDecoration: "unset", ":hover": { textDecoration: "unset" } }}>
                                            추가
                                        </NoBgBtn>
                                    </Box>
                                </Box>
                                <Box sx={{ justifyContent: "space-between", display: 'flex', my: 2, mt: 4 }}>
                                    <Box width={'80%'}>
                                        <h3 style={{ margin: 0, color: "#000000" }}>전화번호</h3>
                                        <span>여행 업데이트를 받으려면 전화번호를 입력하고 인증해주세요.</span>
                                    </Box>
                                    <Box>
                                        <NoBgBtn disable style={{ borderRadius: '8px', color: 'black', border: 1, textDecoration: "unset", ":hover": { textDecoration: "unset" } }}>
                                            추가
                                        </NoBgBtn>
                                    </Box>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 4 }} />
                            <Box>
                                <h2>환불 정책</h2>
                                <Box>
                                    {
                                        differenceInDays(checkDate.startDate, Date.now()) > 5 ?
                                            <span><b>{
                                                format(sub(checkDate.startDate, { days: 5 }), "MM월 dd일")} 전까지 무료로 취소하실 수 있습니다. </b>체크인 날짜인 {format(checkDate.startDate, "MM월 dd일")} 전에 취소하면 부분 환불을 받으실 수 있습니다.</span>
                                            :
                                            <span><b>{format(checkDate.startDate, "MM월 dd일")} 오후 12:00 전에 취소하면 부분 환불을 받으실 수 있습니다. </b>그 이후에는 취소 시점에 따라 환불액이 결정됩니다. </span>
                                    }
                                </Box>
                            </Box>
                            <Divider sx={{ my: 4 }} />
                            <Box sx={{ display: 'flex', my: 3 }}>
                                <Box sx={{ mx: 1, width: '60px' }}>
                                    <Image src={"/images/book/calendar.png"} alt="calendarIcon" width={40} height={32} />
                                </Box>
                                <Box >
                                    <span>
                                        <span style={{ fontWeight: 500 }}>
                                            호스트가 24시간 이내 예약 요청을 수락하기 전까지는 예약이 아직 확정된 것이 아닙니다.
                                        </span><br />
                                        예약 확정 전까지는 요금이 청구되지 않습니다.
                                    </span>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 4 }} />
                            <Box>
                                <PayPalScriptProvider options={{ "client-id": "AYMPOEJqaxf4tvVAWhSEjG6OmqiTcsTM1tKPFmy4sM5rcDaRCP-mGkkqQC0lJ0BpT9Y8kOt10tzDPsq1"
                                ,intent:"authorize"}}>
                                    <PayPalButtons  style={{ layout: "horizontal", tagline: false }} forceReRender={[cost]} createOrder={(data, action) => {
                                        return action.order.create({
                                            purchase_units: [{
                                                amount: {
                                                    value: '1'
                                                },
                                            }]
                                        })
                                    }} onApprove={async (data, actions) => {
                                        const results = await bookingRegitReq(roomInfo.roomId, data, guest, checkDate, cost, costOption === "a" ? true : false, session.data?.user?.email!)
                                        if (results.result) {
                                            await actions.order?.authorize()
                                            router.push("/book/execution?productId="+roomInfo.roomId+"&id="+data.orderID)
                                        } else {
                                            alert("예약 오류")
                                        }
                                    }}/>
                                </PayPalScriptProvider>
                                <ColorBtn color="rgb(218,9,101)" style={{ color: 'white', m: 1, px: 4, py: 1.5, fontSize: '18px', fontWeight: 'bold', borderRadius: 2 }}>
                                    예약 요청
                                </ColorBtn>
                                testid:sb-jjo8z22322393@personal.example.com
                                pw:97@uEmi9
                            </Box>
                        </Box>
                        <Box sx={{ minWidth: '350px', width: '50%', height: '100%', display: 'flex', position: 'sticky', top: 100, justifyContent: "flex-end", }} >
                            <Box sx={{ border: '1px solid rgb(221,221,221)', width: '80%', p: 3, borderRadius: "6px" }}>
                                <Box sx={{ display: 'flex', flexDirection: "row", }}>
                                    <Image alt="homeCover" src={roomInfo?.photo![0]} width={130} height={100} />
                                    <Box sx={{ display: 'flex', flexDirection: "column",mx:3 }}>
                                        <span style={{color:"#444444",fontSize:'14px'}}>
                                            {roomInfo.group}
                                        </span>
                                        <span style={{marginTop:'2px',fontSize:'17px', wordBreak:"break-word"}}>
                                            {roomInfo.title ?? "임시타이틀"}
                                        </span>
                                    </Box>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <span style={{ fontWeight: 600 }}><span style={{ color: 'rgb(230,30,77)' }}>에어</span>커버</span>를 통한 예약보호
                                <Divider sx={{ my: 2 }} />
                                <h2>요금 세부정보</h2>
                                <Box sx={{ display: 'flex', width: '100%' }}>
                                    <Typography width={'70%'} sx={{textDecoration: 'underline', textUnderlinePosition: 'under', lineHeight: '35px', letterSpacing: '-0.2px'                                    }} >
                                        ￦ {roomInfo.price?.price?.toLocaleString()} x {differenceInDays(checkDate.endDate, checkDate.startDate)                                        }박<br />                                        서비스 수수료
                                    </Typography>
                                    <Typography width={'30%'} sx={{ lineHeight: '35px', letterSpacing: '-0.2px', textAlign: "right" }}>
                                        ￦{(cost*(costOption==="b"?0.5:1))?.toLocaleString()}
                                        <br />
                                        ￦{(~~((cost*(costOption==="b"?0.5:1)) * 0.14)).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Box sx={{ alignItems: "center", display: 'flex', width: '100%', mt: 3, pt: 3, borderTop: '1px solid rgba(0,0,0,0.12)', }}>
                                    <Typography width={'70%'} fontWeight='bold' >
                                        총 합계(KRW)
                                    </Typography>
                                    <Typography fontWeight='bold' width={'30%'} sx={{ lineHeight: '35px', letterSpacing: '-0.2px', textAlign: "right" }}>
                                        ￦{(cost*(costOption==="b"?0.5:1) + (~~((cost*(costOption==="b"?0.5:1)) * 0.14)))?.toLocaleString()}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 3 }} />
                                <Typography sx={{ fontSize: "12px", color: "#222222" }}>
                                    해외에서 결제가 처리되기 때문에 카드 발행사에서 추가 수수료를 부과할 수 있습니다.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

BookStaysPage.layout = "books"
export async function getServerSideProps(props: GetServerSidePropsContext) {
    const { numberOfAdults, numberOfChildren, checkin, numberOfInfants, checkout, roomId } = props.query
    if (!(numberOfAdults && numberOfChildren && checkin && numberOfInfants && checkout && roomId)) {
        return {
            notFound: true,
        }
    }
    await dbConnect()
    const roomInfo = await room.findOne({ roomId: roomId }, { _id: 0 }).lean();
    return {
        props: {
            roomId: roomId,
            bookInfo: {
                numberOfAdults, numberOfChildren, checkin, numberOfInfants, checkout
            },
            roomInfo: roomInfo
        }
    }
}