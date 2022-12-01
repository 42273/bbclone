import { Box, Button, Typography } from "@mui/material"
import { bodyBoxStyle } from "../../../pages/become-a-host/[itemId]/photo";
import Image from "next/image";
import * as React from 'react';

type EmptyProps = {
    dropHandle: React.DragEventHandler;
    fileSelectHandle: React.ChangeEventHandler<HTMLInputElement>;
}
export default function Empty({ dropHandle, fileSelectHandle }: EmptyProps) {
    const [draging, setDraging] = React.useState(false);
    const ref = React.useRef<HTMLInputElement>(null!)
    return (
        <>
            <Box
                sx={bodyBoxStyle}>
                <h1 style={{ color: "#222222" }}>
                    하우스보트 사진 추가하기
                    <Typography sx={{ fontSize: "18px" }}>
                        <span style={{ color: "#717171" }}>
                            숙소 등록을 시작하려면 사진 5장을 제출하셔야 합니다. 나중에 추가하거나 변경하실 수 있습니다.
                        </span>
                    </Typography>
                </h1>
            </Box>
            <Box
                onDragOver={(evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                }}
                onDrop={dropHandle}
                onDragEnter={(evt) => {
                    setDraging(true);
                }}
                onDragLeave={(evt) => {
                    setDraging(false);
                }}
                sx={{
                    display: "flex",
                    border: "1px dashed rgb(176, 176, 176)", maxWidth: "640px",
                    width: "100%",
                    minHeight: "320px",
                    maxHeight: 'min("700px","50vh")',
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                <Image src={"/images/gallery.png"} alt="gallery" width={64} height={64} />
                {draging &&
                    <Typography sx={{ fontWeight: 800, fontSize: 20 }} >
                        업로드하려면 사진을 끌어서 놓으세요
                    </Typography>
                }
                {
                    !draging &&
                    <>
                        <Typography sx={{ fontWeight: 800, fontSize: 20 }} >
                            여기로 사진을 끌어다 놓으세요.
                        </Typography>
                        <Typography>
                            5장 이상의 사진을 선택하세요.
                        </Typography>
                        <Button disableElevation disableRipple disableFocusRipple disableTouchRipple
                            onClick={() => { ref.current.click() }} sx={{ textDecoration: 'underline', fontWeight: 600 }} >
                            기기에서 업로드
                        </Button>
                    </>
                }
                <input onChange={fileSelectHandle} multiple type={"file"} ref={ref} style={{ display: "none" }} accept="image/*" />
            </Box>
        </>
    )
}