import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material"
import { GetServerSidePropsContext } from "next";
import * as React from 'react';
import { getYourSpaceUpdate } from "../../../util/utils";
import HelpBtn from "../../../component/hostLayout/headparts/helpBtn";
import ExitBtn from "../../../component/hostLayout/headparts/exitBtn";
import HostLayOutFooter from "../../../component/hostLayout/footerparts/host-layout-footer";
import TextField from '@mui/material/TextField';
import { useSession } from "next-auth/react";

export default function TitlePage({ itemId }: { itemId: number }) {
    const router = useRouter();
    const [title, setTitle] = React.useState<string>('');

    const session = useSession();
    const nextStepHandle = async (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        try {
            const rst = await getYourSpaceUpdate("title",
                session.data?.user?.email as string,
                itemId, title);
            if (rst.result) {
                router.push("/become-a-host/" + itemId + "/photo")
            }
            else {
                alert("error")
            }
        } catch (e: any) {
            alert("error : " + e.message)
            console.log(e.message)
        }
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(evt.target.value)
    }
    return (
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
                    px: "80px",
                    wordBreak: "keep-all",
                    mb: "80px",
                    height: "100vh"
                }}
            >
                <Box sx={{ minHeight: "320px", maxHeight: 'min("700px","50vh")', flex: 1 }} >
                    <TextField
                        margin="none"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                    />
                    <Box>
                        <h1 style={{ color: "#222222" }}>
                            이제 하우스보트에 이름을 지⁠어⁠주⁠세⁠요
                            <Typography sx={{ fontSize: "18px" }}>
                                <span style={{ color: "#717171" }}>
                                    숙소 이름은 짧을수록 효과적입니다. 나중에 언제든지 변경할 수 있으니, 너무 걱정하지 마세요.
                                </span>
                            </Typography>
                        </h1>
                    </Box>
                </Box>
            </Box>
            <HostLayOutFooter nextStepHandle={nextStepHandle} />
        </Box>
    )
}

TitlePage.layout = "host"


export async function getServerSideProps(props: GetServerSidePropsContext) {
    const itemId = props.query.itemId;
    return {
        props: {
            itemId: itemId
        }
    }
}