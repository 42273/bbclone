import Image from "next/image";
import svgBlack from "../../../public/svgBlack.png"
import { useRouter } from "next/router";
export default function icon() {
    const router = useRouter();
    return (
        <>
            <div style={{ position: "fixed", top: 32, left: 48, cursor: "pointer", zIndex: 2 }} onClick={() => router.push("/")} >
                <Image src={svgBlack} alt="logoSvg" height={44} />
            </div>
        </>
    )
}