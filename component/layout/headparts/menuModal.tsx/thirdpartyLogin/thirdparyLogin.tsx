import Image from 'next/image';
import google from "../../../../../public/googlesvg.png"
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ThirdparyLogin({ source, handleClose }: {
    source: string, handleClose: () => void
}) {
    const [id, setId] = useState<string>("");

    const session = useSession();
    useEffect(() => {
        switch (source) {
            case "구글":
                setId("gLogin");
                break;
            default:
                break;
        }
    }, [])

    const signHandle = () => {
        const topX = screenX + screen.width / 2 - 400 / 2;
        const topY = screenY + screen.height / 2 - 550 / 2;
        window.open(
            "/popup/" + id,
            "popup",
            `top=${topY},left=${topX},width=600,height=550`
        );
    }
    return (
        <>
            <Box sx={{ mx: 4, my: 2 }}>
                <Button
                    disableRipple
                    onClick={signHandle}
                    sx={{ width: "100%", height: "3rem", border: 3, borderColor: "black", borderWidth: 1 }}
                >
                    {id === "gLogin" && <Image style={{ position: "absolute", left: 10 }} height={20} alt='googleSvg' src={google} />}
                    <span style={{ fontSize: 14, color: "#333333", width: "max-content", fontWeight: "bold" }}>{source + "로 로그인하기"}</span>
                </Button>
            </Box>
        </>
    )
}