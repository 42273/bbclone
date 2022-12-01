import { ReactNode } from "react";
import { Container } from "@mui/system";
import * as React from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function HostLayout({ children }: { children: ReactNode }) {

    const session = useSession();
    const router = useRouter();
    if (session.status === 'unauthenticated') {
        router.push('/');
        alert('login!');
        return  null;
    }
    return (
        <>
            {
                session.status === 'authenticated' &&
                <Container maxWidth={false} disableGutters={true} >
                    {children}
                </Container>
            }
        </>
    )
}