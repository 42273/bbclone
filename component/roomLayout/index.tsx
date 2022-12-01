import { Container } from "@mui/system";
import { ReactNode } from "react";
import Header from "../layout/header";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from "date-fns/locale";

export default function RoomLayout({ children }: { children: ReactNode }) {

    return (
        <>
            <Container maxWidth={"xl"} disableGutters={true} >
                <header >
                    <Header />
                </header>
                <main>
                    <LocalizationProvider dateFormats={{ monthAndYear: 'yyyy년 MM월' }} adapterLocale={ko} dateAdapter={AdapterDateFns}>
                        {children}
                    </LocalizationProvider>
                </main>
            </Container>
        </>
    )
}

