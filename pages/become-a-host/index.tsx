import { Box, Typography } from "@mui/material"
import Icon from "../../component/hostLayout/headparts/icon"
import Grid from '@mui/material/Grid';
import { SxProps } from '@mui/system';
import ColorBtn from "../../component/layout/headparts/menuModal.tsx/colorBtn";
import { useRouter } from "next/router";
import room from "../../lib/model/room";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { getYourSpaceUpdate } from "../../util/utils";
import dbConnect from "../../lib/dbConnect";
import Head from "next/head";

const leftGridStyle: SxProps = {
    height: "100vh",
    overflow: "hidden",
    backgroundPosition: 'center',
    backgroundSize: "cover",
    margin: "0px auto",
}
const rightGridStyle: SxProps = {
    height: "100vh",
    display: "flex",
    backgroundColor: "black",
    flexDirection: "column",
}
const typeStyle: SxProps = {
    wordBreak: "keep-all",
    color: "white",
    verticalAlign: "middle",
}
export default function BecomeAHostHone(props: GetServerSidePropsContext & { itemId?: { roomId?: number | null, phase?: string | null } }) {
    const router = useRouter();
    const roomId = props?.itemId?.roomId
    const phase = props?.itemId?.phase
    const session = useSession();
    const nextStepHandle = () => {
        const query = roomId ?? Date.now()
        if (!roomId) {
            getYourSpaceUpdate("index", session?.data?.user?.email as string, query, "index")
        }
        switch (phase) {
            case "group":
                return router.push("/become-a-host/" + query + "/property-type");
            case "property":
                return router.push("/become-a-host/" + query + "/privacy-type");
            case "privacy":
                return router.push("/become-a-host/" + query + "/location");
            case "location":
                return router.push("/become-a-host/" + query + "/amenities");
            case "floorPlan":
                return router.push("/become-a-host/" + query + "/amenities");
            case "amenities":
                return router.push("/become-a-host/" + query + "/title");
            case "title":
                return router.push("/become-a-host/" + query + "/photo");
            case "photo":
                return router.push("/become-a-host/" + query + "/price");
            case "price":
                return router.push("/become-a-host/" + query + "/receipt");
            default:
                return router.push("/become-a-host/" + query + "/property-type-group")
        }
    }
    return (
        <>
            <Head>
                <title>호스트 되기</title>
            </Head>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                textAlign="center"
            >
                <Grid item sx={leftGridStyle} xs={6}>
                    <Icon />
                    <video autoPlay muted loop style={{
                        backgroundSize: "cover", minWidth: "100%",
                        minHeight: "100vh", objectFit: "cover",
                        overflow: "hidden", position: "relative",
                    }}
                        src="/video/host.webm"
                        controls={false}
                    />
                </Grid>
                <Grid sx={rightGridStyle} item xs={6}>
                    <Box flex={1} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} >
                        <Typography variant="h3" sx={typeStyle} >
                            간단한 10단계로 호스팅 시작하기
                        </Typography>
                        <Typography variant="h4" sx={typeStyle}>
                            에어비앤비 호스트가 되어보세요. 에어비앤비에서 모든 과정을 도와드립니다.
                        </Typography>
                    </Box>
                    <div onClick={nextStepHandle}>
                        <ColorBtn style={{ color: "white", width: "130px", mt: 1.5, py: 1.5 }}
                            color={"rgb(230,30,82)"} >시작하기 </ColorBtn>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}
BecomeAHostHone.layout = "host"
export async function getServerSideProps(props: GetServerSidePropsContext) {
    let already = null;
    try {
        await dbConnect()
        const session = await getSession(props)
        console.log(session?.user?.email)
        if (session?.user?.email) {
            already = await room.findOne({ email: session?.user?.email, complete: { complete: false, Date: null } }, { _id: 0, roomId: 1, phase: 1 }).lean();
        }
    } catch (e: unknown) {
        if (e instanceof Error) console.log(e.message);
    }
    return {
        props: {
            itemId: already ?? null
        }
    }
}