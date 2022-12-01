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
import FloorPlanItem from "../../../component/hostLayout/pageTrib/floorPlanItem";
import { useSession } from "next-auth/react";

const bodyBoxStyle: SxProps = {
    mt: "88px",
    px: "48px",
    mb: "82px",
    overflowY: "visible",
    scrollbarWidth: 0
}
export interface SelectedState {
    guest: number,
    bed: number,
    bedroom: number,
    bathroom: number
}

export default function FloorPlanPage({ itemId }: { itemId: number }) {
    const router = useRouter();
    const [selected, setSelected] = React.useState<SelectedState>({
        guest: 5,
        bed: 2,
        bedroom: 1,
        bathroom: 1
    });
    const session= useSession();
    const nextStepHandle = async (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        try {
            const rst = await getYourSpaceUpdate("floorPlan",
            session.data?.user?.email as string,
            itemId, selected);
            if (rst.result) {
            router.push("/become-a-host/" + itemId + "/amenities")
            }
            else {
            alert("error")
            }
        } catch (e: any) {
            alert("error : " + e.message)
            console.log(e.message)
        }
    }

    const plusHandle = (prop: keyof SelectedState) => {
        if ((prop === "guest") && (selected[prop] === 16)) { return }
        else if (selected[prop] === 50) {
            return;
        };
        setSelected(current => ({ ...current, [prop]: current[prop] + 1 })
        );
    }

    const minusHandle = (prop: keyof SelectedState) => {
        if (selected[prop] === 0) {
            return;
        }
        setSelected(current => ({ ...current, [prop]: current[prop] - 1 })
        )
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
                    숙소에서 맞이할 최대 인원수를 알려주세요.
                </TextGrid>
                <Grid sx={rightGridStyle} item xs={6}>
                    <Box onClick={()=>router.push("/")} style={{ position: "fixed", right: 50, top: 30 }}>
                        <HelpBtn />
                        <ExitBtn />
                    </Box>
                    <Box flex={1} style={{paddingTop: 10,justifyContent: "center",}}
                        sx={{ scrollbarGutter: "unset" }}
                    >
                        <Box sx={bodyBoxStyle}>
                            <FloorPlanItem type={"guest"} selected={selected.guest} plusHandle={plusHandle} minusHandle={minusHandle}>
                                게스트
                            </FloorPlanItem>
                            <FloorPlanItem type="bed" selected={selected.bed} plusHandle={plusHandle} minusHandle={minusHandle} >
                                침대
                            </FloorPlanItem>
                            <FloorPlanItem type="bedroom" selected={selected.bedroom} plusHandle={plusHandle} minusHandle={minusHandle}>
                                침실
                            </FloorPlanItem>
                            <FloorPlanItem type="bathroom" selected={selected.bathroom} plusHandle={plusHandle} minusHandle={minusHandle} >
                                욕실
                            </FloorPlanItem>
                            <Typography pt={"32"} fontWeight={600} fontSize={"18px"} lineHeight={"24px"}>
                            </Typography>
                        </Box>
                    </Box>
                    <HostFooter backFunction={() => router.back()} nextFunction={nextStepHandle} />
                </Grid>
            </Grid>
        </>
    )
}
FloorPlanPage.layout = "host"

export async function getServerSideProps(props: GetServerSidePropsContext) {
    const itemId = props.query.itemId;
    return {
        props: {
            itemId: itemId
        }
    }
}