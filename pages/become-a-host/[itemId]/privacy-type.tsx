import { useRouter } from "next/router";
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import TYHostRightHeader from "../../../component/hostLayout/headparts/type-group-rightHeader";
import ColorBtn from "../../../component/layout/headparts/menuModal.tsx/colorBtn";
import { SxProps } from '@mui/system';

import { rightGridStyle } from "./property-type-group";
import { Box, Typography } from "@mui/material"
import { GetServerSidePropsContext } from "next";
import * as React from 'react';
import { useSession } from "next-auth/react";
import { getYourSpaceUpdate } from "../../../util/utils";
import TextGrid from "../../../component/hostLayout/textGrid";

export const itemUnitStyle: SxProps = {
    justifyContent: "flex-start",
    maxWidth: "75vh",
    width: "70%",
    borderRadius: 4,
    my: 1,
    px: 3,
    py: 4,
}

export default function PrivacypePage({ itemId }: { itemId: number }) {
    const router = useRouter();
    const [selected, setSelected] = React.useState<string>("");
    const session = useSession()

    const nextStepHandle = async (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (selected === "") return evt.preventDefault();
        try {
            const rst = await getYourSpaceUpdate("privacy",
                session.data?.user?.email as string,
                itemId, selected);
            if (rst) {
                router.push("/become-a-host/" + itemId + "/location")
            }
            else {
                alert("error")
            }
        } catch (e: any) {
            alert("error : " + e.message)
            console.log(e.message)
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
                <TextGrid> 게스트가 머무르게 될 숙소의 종류가 무엇인가요? </TextGrid>
                <Grid sx={rightGridStyle} item xs={6}>
                    <TYHostRightHeader />
                    <Box flex={1} style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >
                        {
                            ["공간 전체", "개인실", "다인실"].map(p => {
                                return (
                                    <ToggleButton
                                        disableRipple
                                        sx={itemUnitStyle}
                                        key={p}
                                        value={p}
                                        selected={p === selected}
                                        onChange={() => { setSelected(p); }}
                                    >
                                        <Typography sx={{ fontWeight: "bold", color: "black", fontSize: 18 }} >
                                            {p}
                                        </Typography>
                                    </ToggleButton>
                                )
                            })
                        }
                    </Box>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 20 }} >
                        <div onClick={() => router.back()} style={{ cursor: "pointer" }}>
                            <ColorBtn style={{ color: "black", width: "80px", mt: 1.5, py: 1.5 }}
                                color={"rgb(250,250,250)"} >뒤로 </ColorBtn>
                        </div>
                        <div onClick={(evt) => nextStepHandle(evt)}>
                            <ColorBtn style={{ color: "white", width: "130px", mt: 1.5, py: 1.5 }}
                                color={"rgb(0,0,0)"} >다음 </ColorBtn>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

PrivacypePage.layout = "host"

export async function getServerSideProps(props: GetServerSidePropsContext) {
    const itemId = props.query.itemId;
    return {
        props: {
            itemId: itemId
        }
    }
}