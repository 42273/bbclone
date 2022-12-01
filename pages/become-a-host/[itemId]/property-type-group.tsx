import { useRouter } from "next/router";
import Grid from '@mui/material/Grid';
import { SxProps } from '@mui/system';
import ColorBtn from "../../../component/layout/headparts/menuModal.tsx/colorBtn";
import ToggleButton from '@mui/material/ToggleButton';
import * as React from 'react';
import { Box, Typography } from "@mui/material"
import { GetServerSidePropsContext } from "next";
import Property, { PropertyShcemaProps } from "../../../lib/model/property";
import TYHostRightHeader from "../../../component/hostLayout/headparts/type-group-rightHeader";
import Image from "next/image";
import { getYourSpaceUpdate } from "../../../util/utils";
import { useSession } from "next-auth/react";
import TextGrid from "../../../component/hostLayout/textGrid";
import room from "../../../lib/model/room";
import dbConnect from "../../../lib/dbConnect";

export const leftGridStyle: SxProps = {
    height: "100vh",
    background: 'linear-gradient(355deg,rgba(67,34,170,1)0%,rgba(141,33,153,1)35%,#D32677 100%)',
    color: "white",
    display: "flex",
    alignItems: "center",
    p: "6vh",
}

export const rightGridStyle: SxProps = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
}

export const btnStyle: SxProps = {
    mx: "11%",
    borderRadius: 4,
    py: 2.5,
    my: 0.5,
    px: 3,
    justifyContent: "flex-start",

}

const contentStyle: SxProps = {
    fontWeight: "bold", fontSize: 22
    , color: "black"
}

export default function BecomeAHostPTG({ property, itemId }: { property: PropertyShcemaProps[], itemId: number }) {
    const router = useRouter();
    const [selected, setSelected] = React.useState<string>("");
    const session = useSession()
    const nextStepHandle = async (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (selected === "") return evt.preventDefault();
        try {
            const rst = await getYourSpaceUpdate("group",
                session.data?.user?.email as string,
                itemId, selected);
            if (rst) {
                router.push("/become-a-host/" + itemId + "/property-type")
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
                <TextGrid>
                    호스팅할 숙소 유형을 알려주세요.
                </TextGrid>
                <Grid sx={rightGridStyle} item xs={6}>
                    <TYHostRightHeader />
                    <Box flex={1} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} >
                        {
                            property.map(p => {
                                // console.log(p.image)
                                return (
                                    <ToggleButton
                                        disableRipple
                                        sx={btnStyle}
                                        key={p.group}
                                        value={p.group}
                                        selected={p.group === selected}
                                        onChange={() => {
                                            setSelected(p.group);
                                        }}
                                    >
                                        <Typography sx={contentStyle}>
                                            {p.group}
                                        </Typography>
                                        <Image style={{ display: "block", marginLeft: "auto" }} width={56} height={56} src={p.image as string} alt="groupTypeImg" />
                                    </ToggleButton>
                                )
                            })
                        }
                    </Box>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 20 }} >
                        <div onClick={() => router.push("/become-a-host")} style={{ cursor: "pointer" }}>
                            <ColorBtn style={{ color: "black", width: "80px", mt: 1.5, py: 1.5 }}
                                color={"rgb(250,250,250)"} >뒤로 </ColorBtn>
                        </div>
                        <div onClick={(evt) => nextStepHandle(evt)}>
                            <ColorBtn style={{ color: "white", width: "130px", mt: 1.5, py: 1.5 }}
                                color={"rgb(0,0,0)"} >시작하기 </ColorBtn>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Box>
            </Box>
        </>
    )
}
BecomeAHostPTG.layout = "host"

export async function getServerSideProps(props: GetServerSidePropsContext) {
    const itemId = props.query.itemId;
    try {

        await dbConnect()
        const one = await room.findOne({ roomId: itemId }).lean()
        if (!one) {
            room.create({
                roomId: itemId
            })
        }
    } catch (e: unknown) {
        if (e instanceof Error) console.log(e.message)
    }
    const properties = await Property.find({}, { _id: 0 }).lean();
    const data = properties.map(one => {
        let imgsrc = ""
        switch (one.group) {
            case "아파트":
                imgsrc = "/images/groups/apartment.webp"
                break;
            case "주택":
                imgsrc = "/images/groups/hotel.webp"
                break;
            case "별채":
                imgsrc = "/images/groups/house.webp"
                break;
            case "부티크 호텔":
                imgsrc = "/images/groups/outbuilding.webp"
                break;
            default:
                break;
        }
        return { ...one, image: imgsrc }
    })
    return {
        props: {
            property: data,
            itemId: itemId
        }
    }
}