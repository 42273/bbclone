import ErrorIcon from '@mui/icons-material/Error';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import ColorBtn from './colorBtn';
import { useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { KeyboardEvent } from "react";

type LoginModalProps = {
    handleClose: () => void;
    emailSubmit: (email: string) => void;
    setLoading: (b: boolean) => void
}

const style: SxProps = {
    px: 1,
    mb: 0
};

const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export default function LoginModal({ setLoading, emailSubmit, handleClose }: LoginModalProps) {
    const [errorMode, setErrorMode] = useState<boolean>(false);
    const [errType, setErrType] = useState<string>("");
    const emailRef = useRef<HTMLInputElement>(null!)

    const emailConfirm = () => {
        if (!(emailRef!.current.value)) {
            setErrorMode(true);
            setErrType("이메일이 필요합니다.")
            return;
        }
        if (!emailRegExp.test(emailRef.current!.value)) {
            setErrorMode(true);
            setErrType("이메일을 입력하세요.");
            return;
        }
        setErrorMode(false);
        setLoading(true);
        emailSubmit(emailRef.current!.value);
    }

    const enterSubmit = (evt: KeyboardEvent) => {
        if (evt.code === "Enter") {
            emailConfirm();
        }
    }

    return (
        <>

            <Box sx={style}>
                <DialogTitle style={{ fontSize: 22, fontWeight: 600 }}>
                    {"에어비엔비에 오신 것을 환영합니다."}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="이메일"
                        type="email"
                        sx={{ backgroundColor: "white" }}
                        fullWidth
                        onChange={() => { if (errorMode) { setErrorMode(false) } }}
                        inputRef={emailRef}
                        error={errorMode}
                        onKeyDown={enterSubmit}
                    />
                    {errorMode ?
                        <Typography sx={{ display: "flex" }}>
                            <span style={{ color: "rgb(220,16,98)" }}><ErrorIcon /></span> &nbsp;&nbsp; <span style={{ color: "rgb(220,16,98)" }}>{errType}</span>
                        </Typography>
                        : ""}
                    <div onClick={emailConfirm}>
                        <ColorBtn style={{ color: "white", width: "100%", mt: 1.5, py: 1.5 }}
                            color={"rgb(220,16,98)"} >계속 </ColorBtn>
                    </div>
                </DialogContent>
            </Box>
        </>
    )
}