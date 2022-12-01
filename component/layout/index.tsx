import { Container } from "@mui/system";
import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";
import Nav from "./nav";

export default function Layout({ children }: { children: ReactNode }) {

    return (
        <>
            <Container sx={{ height: '100%' }} maxWidth={false} disableGutters={true} >
                <header >
                    <Header />
                    <Nav />
                </header>
                <main>
                    <Container maxWidth={"xl"} >
                        {children}
                    </Container>
                </main>
                <footer>
                    <Footer className="footer" />
                </footer>
            </Container>
        </>
    )
}

