import { styled, alpha } from '@mui/material/styles';
import { Divider, Menu, MenuItem, MenuProps } from '@mui/material';
import React from 'react';
import ModalFrame from './menuModal.tsx/modalFrame';
import { ContextType, Ctx } from '../../../context/context';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

type MenuListProps = {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleClose: () => void;
    isLogin: boolean | undefined;
}

export default function MenuList({ isLogin, anchorEl, open, handleClose }: MenuListProps) {


    const [loginModalOpen, setLoginModalOpen] = React.useState(false);
    const { logout }: { logout: () => void } = React.useContext(Ctx)!;
    const session = useSession();
    const router = useRouter();
    React.useEffect(() => {
        if (loginModalOpen === true && session.status === 'authenticated') setLoginModalOpen(false)
    }, [session.status])
    const handleOpen: () => void = () => {
        handleClose();
        setLoginModalOpen(true)
    }

    return (
        <>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transitionDuration={1}
            >
                {
                    !isLogin &&
                    [
                        <MenuItem key={1} onClick={handleOpen} disableRipple>
                            <b>?????? ??????</b>
                        </MenuItem>,
                        <MenuItem key={2} onClick={handleOpen} disableRipple>
                            ?????????
                        </MenuItem>
                    ]
                }
                {
                    isLogin && [
                        <MenuItem disabled key={1} onClick={handleClose} disableRipple>
                            <b>?????????</b>
                        </MenuItem>,
                        <MenuItem disabled key={2} onClick={handleClose} disableRipple>
                            <b>??????</b>
                        </MenuItem>,
                        <MenuItem key={3} onClick={() => alert('??????????????????.')} disableRipple>
                            <b>??????</b>
                        </MenuItem>,
                        <MenuItem key={4} onClick={() => alert('??????????????????.')} disableRipple>
                            <b>???????????????</b>
                        </MenuItem>
                    ]
                }
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={() => router.push("/become-a-host")} disableRipple>
                    ?????? ????????? ??????
                </MenuItem>
                <MenuItem onClick={() => router.push("/become-a-host")} disableRipple>
                    ?????? ???????????????
                </MenuItem>
                {
                    isLogin && [
                        <MenuItem key={1} onClick={() => alert(`?????? ???????????? ????????? ${session.data?.user?.email} ?????????!`)} disableRipple>
                            ??????
                        </MenuItem>,
                        <Divider key={2} sx={{ my: 0.5 }} />
                    ]
                }
                <MenuItem onClick={handleClose} disableRipple>
                    ?????????
                </MenuItem>
                {
                    isLogin &&
                    <MenuItem onClick={() => logout()} disableRipple>
                        ????????????
                    </MenuItem>
                }
            </StyledMenu>
            <ModalFrame open={loginModalOpen} setOpen={setLoginModalOpen} />
        </>
    )
}