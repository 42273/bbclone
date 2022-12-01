import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { IconButton } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const titleStyle: SxProps = {
    borderBottom: "1px solid #eeeeee",
    textAlign: "center",
    mt: 1, mb: 2,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
}

type ModalHeaderProps = {
    modalShape: string;
    setOpen: (shape: string) => void;
}
export default function ModalHeader({ modalShape, setOpen }: ModalHeaderProps) {


    return (
        <>
            <Box sx={titleStyle}>
                <IconButton onClick={() => setOpen(modalShape)} style={{ position: "absolute", left: "3.5%", top: "2vh" }}>
                    {
                        modalShape === "login" ?
                            <CloseIcon fontSize='small' htmlColor='black' />
                            :
                            <ArrowBackIosIcon />
                    }
                </IconButton>
                <DialogTitle style={{ fontSize: 16, fontWeight: 600 }}>
                    {modalShape === "login" ? "로그인 또는 회원 가입?"
                        :
                        modalShape === "register" ? "회원 가입 완료하기"
                            : "로그인"
                    }
                </DialogTitle>
            </Box>
        </>
    )
}