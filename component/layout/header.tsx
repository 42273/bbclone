import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import HeaderSearch from './headparts/search';
import Logo from './headparts/homeLogo';
import RightHeader from './headparts/rightHeader';
import MenuList from './headparts/menuList';
import { Ctx } from '../../context/context';
import LangModal from './headparts/langModal';

export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const ctx = React.useContext(Ctx);
    const [langModalOpen, setLangModalOpen] = React.useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const setLanguageOpen = () => {
        setLangModalOpen(c => !c);
    }

    return (
        <>
            <Toolbar sx={{ width: '100%', mt: '3px', borderBottom: 1, borderColor: 'divider', minWidth: '650px' }}>
                <Logo />
                <HeaderSearch />
                <div>
                    <RightHeader langModalOpen={langModalOpen} setLanguageOpen={setLanguageOpen} open={open} handleClick={handleClick} />
                    <MenuList isLogin={ctx?.isLogin} anchorEl={anchorEl} open={open} handleClose={handleClose} />
                </div>
            </Toolbar>
            <LangModal langModalOpen={langModalOpen} setLanguageOpen={setLanguageOpen} />
        </>
    )
}