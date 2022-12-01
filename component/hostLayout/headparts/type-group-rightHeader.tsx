import * as React from 'react';
import { Box } from "@mui/material";
import ColorBtn from "../../layout/headparts/menuModal.tsx/colorBtn";
import { useRouter } from 'next/router';

export default function TYHostRightHeader() {
    const router = useRouter()
    return (
        <>
            <Box onClick={() => router.push("/")} display={"block"}>
                <ColorBtn
                    color="rgb(0,0,0)"
                    style={{
                        borderRadius: 5,
                        color: "white",
                        opacity: 0.8
                    }} >나가기</ColorBtn>
            </Box>
        </>
    )
}