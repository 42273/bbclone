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
                <title>?????? ??????</title>
            </Head>
            <Box sx={{ flexDirection: 'column', display: "flex", width: '100%', minWidth: '500px' }} >
                <Box flex={1} sx={{ px: '10px', mx: "10%" }} >
                    <Box>
                        <h1 style={{ paddingTop: '64px', paddingBottom: '16px', width: '100%' }} >
                            <IconButton sx={{ mr: 2 }} onClick={() => router.back()} >
                                <ArrowBackIosIcon sx={{ ml: '5px', fontWeight: 'bold' }} />
                            </IconButton>
                            ?????? ??????
                        </h1>
                    </Box>
                    <Box sx={{ display: "flex", wordBreak: "keep-all" }}  >
                        <Box sx={{ minWidth: '450px', width: '55%' }} >
                            <h2>?????? ??????</h2>
                            <Box sx={{ justifyContent: "space-between", display: 'flex', lineHeight: '40px' }}>
                                <Box>
                                    <h3 style={{ margin: 0, color: "#333333" }}>??????</h3>
                                    {format(checkDate.startDate, "yyyy??? MM??? dd???") + "~" + getDate(checkDate.endDate) + "???"}
                                </Box>
                                <Box onClick={()=>router.back()} >
                                    <NoBgBtn style={{ color: 'black',textUnderlinePosition:"under" }}>
                                        ??????(????????????)
                                    </NoBgBtn>
                                </Box>
                            </Box>
                            <Box sx={{ justifyContent: "space-between", display: 'flex', lineHeight: '40px' }}>
                                <Box>
                                    <h3 style={{ margin: 0, color: "#333333" }} >?????????</h3>
                                    {bookInfo.numberOfInfants > 0 ?
                                        `????????? ${Number(bookInfo.numberOfAdults) + Number(bookInfo.numberOfChildren)}???, ?????? ${bookInfo.numberOfInfants}???`
                                        :
                                        `????????? ${Number(bookInfo.numberOfAdults) + Number(bookInfo.numberOfChildren)}???`
                                    }
                                </Box>
                                <Box onClick={()=>router.back()} >
                                    <NoBgBtn style={{ color: 'black' ,textUnderlinePosition:"under"}}>
                                        ??????(????????????)
                                    </NoBgBtn>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 4 }} />
                            <Box>
                                <h2>?????? ?????? ????????????</h2>
                                <Box sx={{ border: "1px solid rgb(221,221,221)", borderCollapse: 'collapse', borderRadius: '8px', my: 2 }}>
                                    <label style={{ cursor: "pointer" }}>
                                        <Box sx={costOption === 'a' ? { ...radioBoxStyle, padding: "13px", border: "2px solid black", borderTopLeftRadius: '8px', borderTopRightRadius: '8px' } : radioBoxStyle}>
                                            <Box width={'90%'} my={0.5} >
                                                <span style={{ justifyContent: "space-between", display: "flex", marginBottom: 5 }}>
                                                    <span style={{ color: "#000000", fontSize: "16px", fontWeight: 800 }} >?????? ??????</span>
                                                    <span><b>??? {cost.toLocaleString()}</b></span>
                                                </span>
                                                <span>????????? ??????????????? ?????? ????????? ???????????????.</span>
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
                                                    <span style={{ color: "#000000", fontSize: "16px", fontWeight: 800 }} >?????? ????????? ?????? ??????, ???????????? ????????? ??????</span>
                                                    <span><b>??? {(~~(cost / 2)).toLocaleString()}</b></span>
                                                </span>
                                                <span>?????? ???{(~~(cost / 2)).toLocaleString()}???(???) ???????????????, ????????? ??????(???{(cost - (~~(cost / 2))).toLocaleString()})??? ????????? ?????????????????? 2022??? 12??? 24??? ?????? ???????????????. ?????? ???????????? ????????????.</span>
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
                                <h2>?????? ??????</h2>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={10}
                                            onChange={() => { }}
                                            defaultValue={10}
                                        >
                                            <MenuItem value={10}>???????????? ?????? ????????????</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 4 }} />
                            <Box>
                                <h2>?????? ?????? ??????</h2>
                                <Box sx={{ justifyContent: "space-between", display: 'flex', my: 2 }}>
                                    <Box width={'80%'}>
                                        <h3 style={{ margin: 0, color: "#000000" }}>??????????????? ????????? ?????????</h3>
                                        <span>??????????????? ?????? ????????? ?????? ?????? ????????? ???????????????.</span>
                                    </Box>
                                    <Box>
                                        <NoBgBtn disable style={{ borderRadius: '8px', color: 'black', border: 1, textDecoration: "unset", ":hover": { textDecoration: "unset" } }}>
                                            ??????
                                        </NoBgBtn>
                                    </Box>
                                </Box>
                                <Box sx={{ justifyContent: "space-between", display: 'flex', my: 2, mt: 4 }}>
                                    <Box width={'80%'}>
                                        <h3 style={{ margin: 0, color: "#000000" }}>????????????</h3>
                                        <span>?????? ??????????????? ???????????? ??????????????? ???????????? ??????????????????.</span>
                                    </Box>
                                    <Box>
                                        <NoBgBtn disable style={{ borderRadius: '8px', color: 'black', border: 1, textDecoration: "unset", ":hover": { textDecoration: "unset" } }}>
                                            ??????
                                        </NoBgBtn>
                                    </Box>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 4 }} />
                            <Box>
                                <h2>?????? ??????</h2>
                                <Box>
                                    {
                                        differenceInDays(checkDate.startDate, Date.now()) > 5 ?
                                            <span><b>{
                                                format(sub(checkDate.startDate, { days: 5 }), "MM??? dd???")} ????????? ????????? ???????????? ??? ????????????. </b>????????? ????????? {format(checkDate.startDate, "MM??? dd???")} ?????? ???????????? ?????? ????????? ????????? ??? ????????????.</span>
                                            :
                                            <span><b>{format(checkDate.startDate, "MM??? dd???")} ?????? 12:00 ?????? ???????????? ?????? ????????? ????????? ??? ????????????. </b>??? ???????????? ?????? ????????? ?????? ???????????? ???????????????. </span>
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
                                            ???????????? 24?????? ?????? ?????? ????????? ???????????? ???????????? ????????? ?????? ????????? ?????? ????????????.
                                        </span><br />
                                        ?????? ?????? ???????????? ????????? ???????????? ????????????.
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
                                            alert("?????? ??????")
                                        }
                                    }}/>
                                </PayPalScriptProvider>
                                <ColorBtn color="rgb(218,9,101)" style={{ color: 'white', m: 1, px: 4, py: 1.5, fontSize: '18px', fontWeight: 'bold', borderRadius: 2 }}>
                                    ?????? ??????
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
                                            {roomInfo.title ?? "???????????????"}
                                        </span>
                                    </Box>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <span style={{ fontWeight: 600 }}><span style={{ color: 'rgb(230,30,77)' }}>??????</span>??????</span>??? ?????? ????????????
                                <Divider sx={{ my: 2 }} />
                                <h2>?????? ????????????</h2>
                                <Box sx={{ display: 'flex', width: '100%' }}>
                                    <Typography width={'70%'} sx={{textDecoration: 'underline', textUnderlinePosition: 'under', lineHeight: '35px', letterSpacing: '-0.2px'                                    }} >
                                        ??? {roomInfo.price?.price?.toLocaleString()} x {differenceInDays(checkDate.endDate, checkDate.startDate)                                        }???<br />                                        ????????? ?????????
                                    </Typography>
                                    <Typography width={'30%'} sx={{ lineHeight: '35px', letterSpacing: '-0.2px', textAlign: "right" }}>
                                        ???{(cost*(costOption==="b"?0.5:1))?.toLocaleString()}
                                        <br />
                                        ???{(~~((cost*(costOption==="b"?0.5:1)) * 0.14)).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Box sx={{ alignItems: "center", display: 'flex', width: '100%', mt: 3, pt: 3, borderTop: '1px solid rgba(0,0,0,0.12)', }}>
                                    <Typography width={'70%'} fontWeight='bold' >
                                        ??? ??????(KRW)
                                    </Typography>
                                    <Typography fontWeight='bold' width={'30%'} sx={{ lineHeight: '35px', letterSpacing: '-0.2px', textAlign: "right" }}>
                                        ???{(cost*(costOption==="b"?0.5:1) + (~~((cost*(costOption==="b"?0.5:1)) * 0.14)))?.toLocaleString()}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 3 }} />
                                <Typography sx={{ fontSize: "12px", color: "#222222" }}>
                                    ???????????? ????????? ???????????? ????????? ?????? ??????????????? ?????? ???????????? ????????? ??? ????????????.
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