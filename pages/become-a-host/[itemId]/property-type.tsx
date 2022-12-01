import { useRouter } from "next/router";
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import TYHostRightHeader from "../../../component/hostLayout/headparts/type-group-rightHeader";
import ColorBtn from "../../../component/layout/headparts/menuModal.tsx/colorBtn";
import { rightGridStyle } from "./property-type-group";
import { Box, Typography } from "@mui/material"
import { GetServerSidePropsContext } from "next";
import room from "../../../lib/model/room";
import property from "../../../lib/model/property";
import * as React from 'react';
import { getYourSpaceUpdate } from "../../../util/utils";
import { SxProps } from '@mui/system';
import TextGrid from "../../../component/hostLayout/textGrid";
import { useSession } from "next-auth/react";

const btnStyle: SxProps = {
    width: "70vh",
    borderRadius: 4,
    py: 2.5,
    my: 0.5,
    px: 3,
    justifyContent: "flex-start",
}

export default function PropertyTypePage({ property, itemId }: { property: Array<{ property: string, description: string }>, itemId: number }) {
    const router = useRouter();
    const [selected, setSelected] = React.useState<string>("");
    const session = useSession();
    const nextStepHandle = async (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (selected === "") return evt.preventDefault();
        try {
            const rst = await getYourSpaceUpdate("property",
                session.data?.user?.email as string,
                itemId, selected);
            if (rst) {
                router.push("/become-a-host/" + itemId + "/privacy-type")
            }
            else {
                alert("error")
            }
        } catch (e: any) {
            alert("error : " + e.message)
            console.log(e.message)
        }
        router.push("/become-a-host/" + itemId + "/privacy-type")
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
                    다음 중 숙소를 가장 잘 설명하는 문구는 무엇인가요?
                </TextGrid>
                <Grid sx={rightGridStyle} item xs={6}>
                    <TYHostRightHeader />
                    <Box flex={1} style={{
                        paddingTop: 10,
                        overflowY: "scroll",
                        justifyContent: "center",
                    }} >
                        {
                            property.map(p => {
                                return (
                                    <ToggleButton
                                        disableRipple
                                        sx={btnStyle}
                                        key={p.property}
                                        value={p.property}
                                        selected={p.property === selected}
                                        onChange={() => {setSelected(p.property);}}
                                    >
                                        <Box color="black" textAlign={"left"} >
                                            <Typography sx={{ fontWeight: "bold" }} >
                                                {p.property}
                                            </Typography>
                                            {p.description}
                                        </Box>
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

PropertyTypePage.layout = "host"
export async function getServerSideProps(props: GetServerSidePropsContext) {
    const group = await room.findOne({ roomId: props.query.itemId }, { _id: 0, group: 1 }).lean() as Object
    const properties = await property.findOne(group, { _id: 0, types: 1 }).lean();
    const itemId = props.query.itemId;
    return {
        props: {
            property: properties!.types,
            itemId: itemId
        }
    }
}