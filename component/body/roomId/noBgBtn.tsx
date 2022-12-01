import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { SxProps } from '@mui/system';

type NoBgBtnProps = {
    color?: string;
    children: any;
    style?: SxProps;
    disable?: boolean
}
export default function NoBgBtn({ disable, color, children, style }: NoBgBtnProps) {
    const NoBgBtn = styled(Button)<ButtonProps>(({ theme }) => ({
        backgroundColor: '#ffffff',
        textDecoration: "underline",
        boxShadow: "unset",
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: "rgb(240,240,240)",
            textDecoration: "underline",
            boxShadow: "unset",
            fontWeight: "bold",
        },
    }));

    return (
        <>
            <NoBgBtn disableRipple disabled={disable ? true : false} sx={{ ...style, }} variant="contained" >
                {children}
            </NoBgBtn>
        </>
    )
}