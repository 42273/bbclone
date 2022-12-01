import { Box } from "@mui/material"
import Paper from '@mui/material/Paper';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import InputBase from '@mui/material/InputBase';
import { FormEvent, } from "react";
import SearchBottom from "./searchBottom";

interface SearchBarProps {
    searchHandle: (evt: FormEvent<HTMLFormElement>) => void;
    keyword: string;
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    nowPositionHandle: () => void;
    open: boolean;
    setOpen: (b: boolean) => void;
    searchPrid: [{ description?: string }];
    clickListHandle: (keyword: string | undefined) => void
}

export default function SearchBar({
    keyword, setKeyword,
    open, setOpen, nowPositionHandle, searchHandle, searchPrid, clickListHandle
}: SearchBarProps) {
    return (
        <>
            <Paper
                className="preventd"
                component="form"
                sx={{
                    top: "130px",
                    position: "relative",
                    borderRadius: 5,
                }}
                onFocus={() => setOpen(true)}
                onSubmit={evt => searchHandle(evt)}
                onKeyDown={(evt) => { if (evt.key === "Enter") searchHandle(evt) }}
            >
                <Box className="preventd" sx={{
                    display: 'flex'
                    , alignItems: 'center',
                    borderRadius: 5,
                    border: 2, borderColor: open ? "black" : "white"
                }}>
                    <FmdGoodIcon sx={{ ml: 2 }} />
                    <InputBase
                        onChange={evt => setKeyword(evt.target.value)}
                        value={keyword}
                        sx={{
                            px: "10px", py: "15px",
                            ml: 1, flex: 1, "::placeholder": { fontSize: 50 }
                        }}
                        placeholder="주소를 입력하세요."
                        id="searchInput"
                    />
                </Box>
                <SearchBottom keyword={keyword} clickHandle={clickListHandle} searchPrid={searchPrid} open={open} nowPositionHandle={nowPositionHandle} />
            </Paper>

        </>
    )
}