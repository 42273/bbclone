import { useRouter } from "next/router";
import { Box } from "@mui/material"
import ColorBtn from "../../layout/headparts/menuModal.tsx/colorBtn";
export default function HostLayOutFooter({ nextStepHandle, goBackHandler }: {
    nextStepHandle: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promise<void>;
    goBackHandler?: () => void;
}) {
    const router = useRouter()
    return <>
        <Box style={{
            display: "flex", flexDirection: "row", padding: "15px",
            justifyContent: "space-between",
            alignItems: "center",
            transform: "translateX(-50%)",
            position: "fixed", bottom: 0,
            left: "50%", right: 0,
            width: "75vw"
        }} >
            <div onClick={() => router.back()} style={{ cursor: "pointer", right: 0, margin: 0 }}>
                <ColorBtn style={{ color: "black", width: "80px", mt: 1.5, py: 1.5 }}
                    color={"rgb(250,250,250)"} >뒤로 </ColorBtn>
            </div>
            <div style={{
                right: 0
            }}
                onClick={nextStepHandle}>
                <ColorBtn style={{
                    color: "white", width: "130px", py: 1.5, mt: 1.5
                }}
                    color={"rgb(0,0,0)"} >다음 </ColorBtn>
            </div>
        </Box>
    </>
}