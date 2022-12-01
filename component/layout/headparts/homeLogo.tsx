import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png"

export default function Logo() {

    return (
        <>
            <Link rel="preload" href={"/"} style={{ cursor: "pointer" }}>
                <Image
                    priority={true}
                    src={logo} alt="logo"
                />
            </Link>
        </>
    )
}