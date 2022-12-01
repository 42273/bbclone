import { Box } from "@mui/material"
import NearMeIcon from '@mui/icons-material/NearMe';
import { SxProps } from '@mui/system';
import { Typography } from "@mui/material"
import BusinessIcon from '@mui/icons-material/Business';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

const focusListStyle: SxProps = {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    mt: 2
}
const searchTxtStyle: SxProps = {
    wordBreak: "keep-all",
    textAlign: "left",
    fontSize: 12
}
const BottomListStyle: SxProps = {
    display: "flex",
    flexDirection: "column",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
}
const iconStyle: SxProps = {
    backgroundColor: "#eeeeee", borderRadius: 5, fontSize: 28, mr: 1
}
interface SearchBottomProps {
    open: boolean;
    nowPositionHandle: () => void;
    searchPrid: [{ description?: string }];
    keyword: string;
    clickHandle: (keyword: string | undefined) => void;
}

export default function SearchBottom({ clickHandle, keyword, open, nowPositionHandle, searchPrid }: SearchBottomProps) {

    return (
        <>
            {open &&
                <Box sx={BottomListStyle} >
                    <List>
                        {
                            keyword && searchPrid.map((item, index) => {
                                return (
                                    <ListItem sx={{ width: "100%" }} disablePadding key={index}>
                                        <ListItemButton onClick={() => clickHandle(item?.description)}>
                                            <ListItemIcon>
                                                <BusinessIcon sx={iconStyle} />
                                            </ListItemIcon>
                                            <Typography sx={searchTxtStyle} > {item?.description}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                        {
                            !keyword &&
                            <ListItem sx={focusListStyle} disablePadding>
                                <ListItemButton onClick={nowPositionHandle} >
                                    <NearMeIcon sx={iconStyle} />
                                    <Typography sx={{ fontSize: 14 }} > 현재 위치 사용</Typography>
                                </ListItemButton>
                            </ListItem>
                        }
                    </List>
                </Box>
            }
        </>
    )
}