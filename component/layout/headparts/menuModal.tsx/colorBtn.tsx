import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { SxProps } from '@mui/system';


type RGB = `rgb(${number}, ${number}, ${number})`;
// type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
// type HEX = `#${string}`;

type ColorBtnProps = {
    color?: string;
    // | RGBA | HEX;
    children: any;
    style?: SxProps;
    disable?: boolean
}
export default function ColorBtn({ disable, color, children, style }: ColorBtnProps) {
    let bgcor = color?.slice(0, -1) + ",0.8)"
    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: color,
        backgroundColor: color,
        '&:hover': {
            backgroundColor: bgcor,
        },
    }));

    return (
        <>
            <ColorButton disabled={disable ? true : false} sx={style} variant="contained" >
                {children}
            </ColorButton>
        </>
    )
}