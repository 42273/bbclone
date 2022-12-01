import { createContext } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material"
import { GetServerSidePropsContext } from "next";
import * as React from 'react';
import { SxProps } from '@mui/system';
import HelpBtn from "../../../component/hostLayout/headparts/helpBtn";
import ExitBtn from "../../../component/hostLayout/headparts/exitBtn";
import Empty from "../../../component/hostLayout/photo/empty";
import Fill from "../../../component/hostLayout/photo/fill";
import Spinner from "../../../component/layout/spinnner";
import HostLayOutFooter from "../../../component/hostLayout/footerparts/host-layout-footer";
import { useSession } from "next-auth/react";
import dbConnect from "../../../lib/dbConnect";
import room, { RoomShcemaProps } from "../../../lib/model/room";

export const bodyBoxStyle: SxProps = {
    display: "flex",
    maxWidth: "640px",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
}
export default function Photo({ itemId, roomInfo }: { itemId: number, roomInfo: RoomShcemaProps }) {
    const router = useRouter();
    const [files, setFiles] = React.useState<File[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false)
    const session = useSession();
    const nextStepHandle = async (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (files.length < 5) return;
        try {
            const formdata = new FormData();
            formdata.append("itemId", itemId.toString());
            formdata.append("phase", "photo");
            formdata.append("email",
                session.data?.user?.email as string,
            )
            files.forEach(one => formdata.append("photos", one));
            setLoading(true)
            const response = await fetch(
                "/api/hosting/uploadPhotos",
                {
                    method: "POST",
                    body: formdata,
                }
            )
            const rst = await response.json();
            if (rst) {
                router.push("/become-a-host/" + itemId + "/price");
            } else {
                alert('sth happend wrong?')
            }
        } catch (e: any) {
            alert("error : " + e.message)
            console.log(e.message)
        } finally { setLoading(false) }
    }
    React.useEffect(() => {
        if (roomInfo.photo?.length! > 0) {
            console.log(roomInfo.photo)
        }
    }, [])
    const dropHandle: React.DragEventHandler = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const data = Array.from(evt.dataTransfer.files);
        setFiles(c => [...c, ...data])
    }
    const fileSelectHandle: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        if (evt.target.files) {
            const data = Array.from(evt.target.files);
            setFiles(c => [...c, ...data])
        }
    }
    const filesDeleteHandle = (idx: number) => {
        let newone = files.filter((file, index) => idx !== index)
        setFiles([...newone]);
    }
    return (
        <>
            {loading && <Spinner loading={loading} />}
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
                    <Box
                        sx={{
                            minHeight: "320px",
                            maxHeight: 'min("700px","50vh")',
                            flex: 1
                        }}
                    >
                        {files.length === 0 &&
                            <Empty dropHandle={dropHandle} fileSelectHandle={fileSelectHandle} />
                        }
                        {files.length > 0 &&
                            <Fill filesDeleteHandle={filesDeleteHandle} dropHandle={dropHandle} fileSelectHandle={fileSelectHandle} files={files} />
                        }
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
    let roomInfo = null;
    try {
        await dbConnect();
        roomInfo = await room.findOne({ roomId: itemId }, { _id: 0 }).lean();

    } catch (e: unknown) {
        if (e instanceof Error) console.log(e.message);
        else console.log(e);
        return {
            notFound: true
        }
    }
    return {
        props: {
            itemId: itemId,
            roomInfo: roomInfo
        }
    }
}
