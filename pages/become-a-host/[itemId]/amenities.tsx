import { useRouter } from "next/router";
import Grid from '@mui/material/Grid';
import { rightGridStyle } from "./property-type-group";
import { Box, Typography } from "@mui/material"
import { GetServerSidePropsContext } from "next";
import * as React from 'react';
import { getYourSpaceUpdate } from "../../../util/utils";
import { SxProps } from '@mui/system';
import TextGrid from "../../../component/hostLayout/textGrid";
import HelpBtn from "../../../component/hostLayout/headparts/helpBtn";
import ExitBtn from "../../../component/hostLayout/headparts/exitBtn";
import HostFooter from "../../../component/hostLayout/footerparts/hostFooter";
import AmenitiesUtilIcon from "../../../component/hostLayout/pageTrib/amenitiesUtilIcon";
import { useSession } from "next-auth/react";

export default function AmenitiesPage({ itemId }: { itemId: number }) {
    const router = useRouter();
    const [utils, setUtils] = React.useState<Array<string>>([]);

    const session = useSession()
    const nextStepHandle = async (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        try {
            const rst = await getYourSpaceUpdate("amenities",
                session.data?.user?.email as string,
                // "a@b.com",
                itemId, utils);
            if (rst.result) {
                router.push("/become-a-host/" + itemId + "/title")
            }
            else {
                alert("error")
            }
        } catch (e: any) {
            alert("error : " + e.message)
            console.log(e.message)
        }
    }
    const handleChange = (prop: string) => {
        if (utils.includes(prop)) {
            setUtils(c => c.filter(i => i !== prop));
        } else {

            setUtils(current => [...current, prop])
        }
    }
    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                textAlign="center"
            >
                <TextGrid>
                    숙소 편의시설 정보를 추가하세요
                </TextGrid>
                <Grid sx={rightGridStyle} item xs={6}>
                    <Box onClick={() => router.push("/")} style={{ position: "fixed", right: 50, top: 30 }}>
                        <HelpBtn />
                        <ExitBtn />
                    </Box>
                    <Box flex={1} style={{
                        paddingTop: 10,
                        overflowY: "scroll",
                        justifyContent: "center",
                    }}
                        sx={{ mt: 15 }}
                    >
                        <Typography variant="h5">
                            특별히 내세울 만한 편의시설이 있나요?
                        </Typography>
                        <AmenitiesUtilIcon utils={utils} handleChange={handleChange} />
                        {/* 특별히 내세울 만한 편의시설이 있나요? */}
                        {/* 다음과 같은 안전 관련 물품이 있나요? */}
                    </Box>
                    <HostFooter backFunction={() => router.back()} nextFunction={nextStepHandle} />
                </Grid>
            </Grid>
        </>
    )
}

AmenitiesPage.layout = "host"

export async function getServerSideProps(props: GetServerSidePropsContext) {
    const itemId = props.query.itemId;
    return {
        props: {
            itemId: itemId
        }
    }
}