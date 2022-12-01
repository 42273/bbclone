import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import { signIn } from 'next-auth/react';

export default function SocialPopup(props: GetServerSidePropsContext) {
    const session = useSession()
    const [provider, setProvider] = useState<string | undefined>()
    useEffect(() => {
        switch (props.query.social) {
            case "gLogin":
                setProvider("google")
                break;
            default:
                break;
        }
        if (session.status === "unauthenticated") {
            signIn(provider)
        }
        if (session.status === "authenticated") {
            window.close()
        }
    }, [session.status])

    return (
        <>
        </>
    )

}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            query: context.query
        },
    }
}
SocialPopup.layout = "noLine";
