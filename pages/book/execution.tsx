import { Box, Divider, Typography } from "@mui/material"
import { differenceInDays, format, getDate, sub } from "date-fns"
import { GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import dbConnect from "../../lib/dbConnect"
import booking, { BookingShcemaProps } from "../../lib/model/booking"
import room from "../../lib/model/room"

type PageProps = {
    productId: string,
    bookInfo: BookingShcemaProps
}

export default function ExecutionPage({ productId, bookInfo }: PageProps) {
    const setDate = (date: string) => {
        const y = Number(date.slice(0, 4));
        const m = Number(date.slice(4, 6)) - 1;
        const d = Number(date.slice(6, 8));
        return new Date(y, m, d);
    }
    const startDate = setDate(bookInfo.checkin);
    const endDate = setDate(bookInfo.checkout);
    return <>
        <Head>
            <title>예약 완료</title>
        </Head>
        <Box sx={{ flexDirection: 'column', display: "flex", width: '100%', minWidth: '500px' }} >
            <Box flex={1} sx={{ px: '10px', mx: "10%", mt: '50px' }} >
                <Box sx={{ display: "flex", wordBreak: "keep-all" }}  >
                    <Box sx={{ minWidth: '450px', width: '55%' }} >
                        <Box style={{ wordBreak: "keep-all" }}>
                            <h1 style={{ paddingTop: '64px', paddingBottom: '16px', width: '100%' }} >
                                예약 요청을 보냈습니다.
                            </h1>
                            <Box >
                                <span>
                                    <span style={{ fontWeight: 500 }}>
                                        호스트가 24시간 이내 예약 요청을 수락하기 전까지는 예약이 아직 확정된 것이 아닙니다.
                                    </span><br />
                                    예약 확정 전까지는 호스트에게 요금이 전달되지 않습니다. {bookInfo.userEmail} 로 예약 요청에 대한 답변을 받게 됩니다.
                                </span>
                            </Box>
                        </Box>
                        <h2>예약 정보</h2>
                        <Box sx={{ justifyContent: "space-between", display: 'flex', lineHeight: '40px' }}>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <span style={{ width: '50%' }}>
                                    <h3 style={{ margin: 0, color: "#333333" }}>체크인 날짜</h3>
                                    {format(startDate, "yyyy년 MM월 dd일")}
                                </span >
                                <span style={{ width: '50%' }}>
                                    <h3 style={{ margin: 0, color: "#333333" }}>체크아웃 날짜</h3>
                                    {format(endDate, "yyyy년 MM월 dd일")}
                                </span>
                            </Box>
                        </Box>
                        <Box sx={{ justifyContent: "space-between", display: 'flex', lineHeight: '40px' }}>
                            <Box>
                                <h3 style={{ margin: 0, color: "#333333" }} >게스트</h3>
                                성인 {Number(bookInfo.numberOfAdults)} 명{bookInfo.numberOfChildren > 0 ? `, 어린이 ${bookInfo.numberOfChildren} 명` : ""}
                                {bookInfo.numberOfInfants > 0 ? `, 유아 ${bookInfo.numberOfInfants}명` : ""}
                            </Box>
                        </Box>
                        <Divider sx={{ my: 4 }} />
                        <span style={{ fontWeight: 600 }}><span style={{ color: 'rgb(230,30,77)' }}>에어</span>커버</span>를 통한 예약보호
                        <Divider sx={{ my: 4 }} />
                        <Box>
                            <Box>
                                {
                                    differenceInDays(startDate, Date.now()) > 5 ?
                                        <span><b>{format(sub(startDate, { days: 5 }), "MM월 dd일")} 전까지 무료로 취소하실 수 있습니다. </b>체크인 날짜인 {format(startDate, "MM월 dd일")} 전에 취소하면 부분 환불을 받으실 수 있습니다.</span>
                                        :
                                        <span><b>{format(startDate, "MM월 dd일")} 오후 12:00 전에 취소하면 부분 환불을 받으실 수 있습니다. </b><br />그 이후에는 취소 시점에 따라 환불액이 결정됩니다. </span>
                                }
                            </Box>
                        </Box>
                        <Divider sx={{ my: 4 }} />
                    </Box>
                    <Box sx={{ minWidth: '350px', width: '53%', height: '100%', display: 'flex', position: 'sticky', top: '200px', justifyContent: "flex-end", }} >
                        <Box sx={{ border: '1px solid rgb(221,221,221)', width: '80%', p: 3, borderRadius: "6px" }}>
                            <Box sx={{ display: 'flex', flexDirection: "row", }}>
                                <Image alt="homeCover" src={bookInfo?.product?.photo![0]!} style={{ objectFit: "cover", width: '100%', borderRadius: '8px' }} width={300} height={300} />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: "column", m: 3 }}>
                                <span style={{ color: "#444444", fontSize: '14px' }}>
                                    {bookInfo.product?.email?.split("@")[0]}님이 제공하는  {bookInfo.product?.property} {bookInfo.product?.group} {bookInfo.product?.privacy}
                                </span>
                                <span style={{ marginTop: '2px', fontSize: '17px', wordBreak: "break-word" }}>
                                    {bookInfo.product?.title ?? "임시타이틀"}
                                </span>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ m: 3 }}>
                                <Box>
                                    {bookInfo.product?.location?.info.country + " "}
                                    {bookInfo.product?.location?.info.administrative_area_level_1 + " "}
                                    {bookInfo.product?.location?.info.administrative_area_level_2 + " "}
                                    {bookInfo.product?.location?.info.sublocality_level_1 + " "}
                                    {bookInfo.product?.location?.info.sublocality_level_4}
                                    <span style={{ float: 'right' }}>우편번호   {bookInfo.product?.location?.info.postal_code}</span>
                                </Box><br />
                                <Typography >
                                    욕실 {bookInfo.product?.floorPlan?.bathroom}개 ·
                                    침대 {bookInfo.product?.floorPlan?.bed}개  ·
                                    침실 {bookInfo.product?.floorPlan?.bedroom}개<br />
                                    최대 인원 : {bookInfo.product?.floorPlan?.guest} 명
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
}

ExecutionPage.layout = "books"


export async function getServerSideProps(props: GetServerSidePropsContext) {
    const session = await getSession(props);
    const email = session?.user?.email
    const { productId, id } = props.query;
    let bookInfo = null;
    if (!(productId && email && id)) {
        return {
            notFound: true,
        }
    }
    await dbConnect()
    bookInfo = await booking.findOne({ productId: productId, 'approve.orderId': id, userEmail: email }, { _id: 0 }).populate("product", { _id: 0 }).lean();
    return {
        props: {
            productId,
            bookInfo
        }
    }
}