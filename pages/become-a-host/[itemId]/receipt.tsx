import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material"
import { GetServerSidePropsContext } from "next";
import * as React from 'react';
import { getYourSpaceUpdate } from "../../../util/utils";
import { SxProps } from '@mui/system';
import HelpBtn from "../../../component/hostLayout/headparts/helpBtn";
import ExitBtn from "../../../component/hostLayout/headparts/exitBtn";
import HostLayOutFooter from "../../../component/hostLayout/footerparts/host-layout-footer";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import Paper from '@mui/material/Paper';
import room, { RoomShcemaProps } from "../../../lib/model/room";
import Image from "next/image";
import { useSession } from "next-auth/react";

const bodyBoxStyle: SxProps = {
    display: "flex",
    width: "100%",
    flexDirection: "column",
}

const contentTextStyle: React.CSSProperties = {
    fontSize: '14px',
    marginLeft: '5px',
    wordBreak: "keep-all",
}

export default function Photo({ itemId, roomInfo }: { itemId: number, roomInfo: RoomShcemaProps }) {
    const router = useRouter();
    const session = useSession();
    const nextStepHandle = async (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        try {
            const rst = await getYourSpaceUpdate("receipt",
                session.data?.user?.email as string,
                itemId, 'complete'
            )
            if (rst.result) {
                alert("완료!")
                router.push("/");
            } else {
                alert('error!')
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                alert("error : " + e.message)
                console.log(e.message)
            }
            console.log(e);
        }
    }
    return (
        <>
            <Box
                sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Box onClick={() => router.push("/")} style={{ position: "fixed", right: 50, top: 30 }}>
                    <HelpBtn />
                    <ExitBtn />
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: 10,
                        mt: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        wordBreak: "keep-all",
                        mb: "80px",
                        height: "100vh",
                    }}
                >
                    <Box
                        sx={{
                            minHeight: "320px",
                            maxHeight: 'min("700px","50vh")',
                            flex: 1,
                            width: '80vw',
                            minWidth: '600px',
                            maxWidth: '850px'
                        }}
                    >
                        <Box
                            sx={bodyBoxStyle}>
                            <h1 style={{ color: "#222222", fontSize: '48px' }}>
                                숙소 검토하기<br />
                                <span style={{ color: "#717171", fontSize: "18px" }}>게스트에게 표시되는 정보는 다음과 같습니다. 모든 정보가 정확한지 확인하세요.</span>
                            </h1>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', maxHeight: '50vh' }}>
                            <Box sx={{ width: '50%', minWidth: '350px', p: 5 }}>
                                <Paper elevation={3} sx={{ height: 'auto', width: 320, cursor: "pointer", p: 1 }} >
                                    <Image draggable={false} src={roomInfo.photo![0]?.toString()} alt='roomCover' style={{ position: "relative" }} height={300} width={300} />
                                    <Typography textAlign={'center'}>
                                        ￦{roomInfo!.price!.price} / 박
                                    </Typography>
                                </Paper>
                            </Box>
                            <Box sx={{ width: '50%', minWidth: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 2 }}>
                                <h2 >다음 단계</h2>
                                <Box sx={{ my: 1, display: 'flex', flexDirection: "row", width: '400px', alignItems: 'center' }}>
                                    <Box sx={{ minWidth: '32px', width: '10%' }}>
                                        <EventAvailableRoundedIcon fontSize="medium" />
                                    </Box>
                                    <span style={contentTextStyle}>
                                        <h3 style={{ lineHeight: '1px' }}>세부 정보를 확인하고 숙소를 등록하세요</h3>
                                        본인 인증이 필요하거나 현지 정부에 등록해야 하는 경우 안내해드리겠습니다.
                                    </span >
                                </Box>
                                <Box sx={{ my: 1, display: 'flex', flexDirection: "row", width: '400px', alignItems: 'center' }}>
                                    <Box sx={{ minWidth: '32px', width: '10%' }}>
                                        <NewspaperIcon />
                                    </Box>
                                    <span style={contentTextStyle}>
                                        <h3 style={{ lineHeight: '1px' }} >달력 설정하기</h3>
                                        숙소 예약 가능일을 선택해주세요. 숙소는 등록 완료 후 24시간이 지나면 일반에 공개됩니다.
                                    </span>
                                </Box>
                                <Box sx={{ my: 1, display: 'flex', flexDirection: "row", width: '400px', alignItems: 'center' }}>
                                    <Box sx={{ minWidth: '32px', width: '10%' }}>
                                        <CreateOutlinedIcon />
                                    </Box>
                                    <span style={contentTextStyle}>
                                        <h3 style={{ lineHeight: '1px' }}>설정 변경하기</h3>
                                        숙소 이용규칙 설정, 환불 정책 선택, 게스트의 예약 방식 선택 등 필요한 작업을 하세요.
                                    </span>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <HostLayOutFooter nextStepHandle={nextStepHandle} />
            </Box>
        </>
    )
}
Photo.layout = "host"
export async function getServerSideProps(props: GetServerSidePropsContext) {
    const itemId = props.query.itemId;
    const roomInfo = await room.findOne({ roomId: itemId }, { _id: 0 }).lean();
    return {
        props: {
            itemId: itemId,
            roomInfo: roomInfo
        }
    }
}