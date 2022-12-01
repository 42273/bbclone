import { Container } from "@mui/system";
import { ReactNode } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from "date-fns/locale";
import Logo from "../layout/headparts/homeLogo";
import { Box, Divider } from "@mui/material";
import Footer from "../layout/footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function BookLayout({ children }: { children: ReactNode }) {
    const session = useSession();
    const router = useRouter();
    if (session.status === 'unauthenticated') {
        router.push('/')
        return null;
    }
    return (
        <>
            <Container sx={{ height: '100vh' }} maxWidth={"xl"} disableGutters={true} >
                <header>
                    <Box >
                        <Logo />
                        <Divider sx={{ py: 0.6265, color: '#717171' }} />
                    </Box>
                </header>
                <main>
                    <LocalizationProvider dateFormats={{ monthAndYear: 'yyyy년 MM월' }} adapterLocale={ko} dateAdapter={AdapterDateFns}>
                        {children}
                    </LocalizationProvider>
                </main>
                <Footer className="bookFooter" />
            </Container>
        </>
    )
}

