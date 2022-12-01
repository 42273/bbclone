import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import LoginModal from './loginModal';
import ModalHeader from './modalHeader';
import RegisterForm from './registerForm';
import Box from '@mui/material/Box';
import { authFlow, passwordSubmitFlow } from '../../../../util/utils';
import PasswordForm from './passwordForm';
import { Ctx } from '../../../../context/context';
import { signIn, signOut, useSession } from "next-auth/react"
import { Divider, Typography } from '@mui/material';
import ThirdparyLogin from './thirdpartyLogin/thirdparyLogin';
import { useRouter } from 'next/router';
import Spinner from '../../spinnner';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type LoginModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalFrame({ open, setOpen }: LoginModalProps) {
    const [modalShape, setModalShape] = React.useState<string>("login");
    const [email, setEmail] = React.useState<string>("");
    const [pwError, setPwError] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const ctx = React.useContext(Ctx);
    const router = useRouter()
    const session = useSession()

    const emailSubmit = async (email: string) => {
        if (!email) return;
        try {
            const rst = await authFlow(email);
            setEmail(email);
            setLoading(false)
            if (rst.datas === "goToRegist") {
                //이메일 체크하기 => 이메일이 가입이 되지 않았다면
                setModalShape("register")
            } else if (rst.datas === "goToLogin") {
                //이메일이 가입이 되었다면 패스유ㅓ드 받는 창으로
                setModalShape("password")
            } else {
                return alert("에러발생!!!")
            }

        } catch (e: unknown) {
            if (e instanceof Error) console.log(e.message);
            console.log(e);
        } finally {
            if (loading) {
                setLoading(false)
            }
        }
    }


    const passwordSubmit: (password: string) => void = async (password) => {
        console.time()
        try {
            const rst = await passwordSubmitFlow(email, password);
            if (rst!.ok) {
                ctx?.login()
                setLoading(false)
                setOpen(false);
                router.push("/")
            } else {
                setPwError(true);
            }
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
            console.log(e);
        } finally {
            setLoading(false)
        }
        console.timeEnd();
    }


    const handleClose = () => {
        setModalShape("login")
        setOpen(false)
    };
    const modalCloseControl = (shape: string) => {
        switch (shape) {
            case "login":
                handleClose();
                break;
            case "password":
            case "register":
                setModalShape("login")
                break;
        }
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                {
                    modalShape === "login" &&
                    <div>
                        <ModalHeader modalShape={modalShape} setOpen={modalCloseControl} />
                        <Box sx={{ minWidth: 500 }}>
                            <LoginModal setLoading={setLoading} emailSubmit={emailSubmit} handleClose={handleClose} />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", px: 4, alignItems: "center" }}>
                            <Divider sx={{ flex: 1 }} />
                            <Typography sx={{ fontSize: 14, mx: 1.5 }} >또는</Typography>
                            <Divider sx={{ flex: 1 }} />
                        </Box>
                        <ThirdparyLogin handleClose={handleClose} source={"구글"} />
                    </div>
                }
                {
                    modalShape === "register" &&
                    <>
                        <ModalHeader modalShape={modalShape} setOpen={modalCloseControl} />
                        <RegisterForm setModalShape={setModalShape} email={email} />
                    </>
                }
                {
                    modalShape === "password" &&
                    <div>
                        <ModalHeader modalShape={modalShape} setOpen={modalCloseControl} />
                        <Box sx={{ minWidth: 500 }}>
                            <PasswordForm setLoading={setLoading} pwError={pwError} setPwError={setPwError} passwordSubmit={passwordSubmit} />
                        </Box>
                    </div>
                }
                {loading && <Spinner loading={loading} />}
            </Dialog>
        </div>
    );
}