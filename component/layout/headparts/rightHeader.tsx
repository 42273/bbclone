import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import LanguageIcon from '@mui/icons-material/Language';
import TableRowsSharpIcon from '@mui/icons-material/TableRowsSharp';
import React from 'react';
import { useRouter } from 'next/router';

type RightProps = {
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
    open: boolean;
    langModalOpen: boolean;
    setLanguageOpen: () => void
}

export default function RightHeader({ setLanguageOpen, langModalOpen, handleClick, open }: RightProps) {
    const router = useRouter()
    const goToHostHandle = () => {
        router.push("/become-a-host");
    }

    return (
        <>
            <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: "row"
            }}>
                <IconButton onClick={goToHostHandle} aria-label="delete" sx={{ borderRadius: 20 }} >
                    <span style={{ fontSize: 15, color: "black", fontWeight: "bold" }} >호스트 되기</span>
                </IconButton>
                <IconButton aria-label="delete" onClick={setLanguageOpen} >
                    <LanguageIcon fontSize='small' />
                </IconButton>
                <Button
                    sx={{ borderRadius: 20, p: 1, pl: 1.5 }}
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    disableElevation
                    onClick={handleClick}
                    variant="outlined"
                    style={{ borderColor: "gray" }}
                >
                    <TableRowsSharpIcon sx={{ color: "#444444", mr: 0.8 }} />
                    <AccountCircleSharpIcon sx={{ color: "#444444", htmlC: "20" }} />
                </Button>
            </div>
        </>
    )
}