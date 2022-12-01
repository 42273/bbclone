import { useRouter } from "next/router";
import { Box, TextField, Typography, IconButton, Checkbox } from "@mui/material"
import { GetServerSidePropsContext } from "next";
import * as React from 'react';
import { getYourSpaceUpdate } from "../../../util/utils";
import { SxProps } from '@mui/system';
import HelpBtn from "../../../component/hostLayout/headparts/helpBtn";
import ExitBtn from "../../../component/hostLayout/headparts/exitBtn";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ErrorIcon from '@mui/icons-material/Error';
import HostLayOutFooter from "../../../component/hostLayout/footerparts/host-layout-footer";
import { useSession } from "next-auth/react";
const bodyBoxStyle: SxProps = {
    display: "flex",
    width: "100%",
    flexDirection: "column",
}

const iconStyle: SxProps = {
    mx: 1,
    border: 1,
    borderRadius: 12,
    width: '40px',
    height: '40px',
    backgroundColor: 'white',
}

const pricePickerStyle: SxProps = {
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#f7f7f7",
    p: '32px',
    border: '1px solid #dddddd',
    borderRadius: '12px',
    mt: 2
}

export default function Photo({ itemId }: { itemId: number }) {
    const router = useRouter();
    const [price, setPrice] = React.useState<number>(0);
    const [inputProp, setInputProp] = React.useState<{ error: boolean, discount: boolean }>({ error: false, discount: false });
    const [priceBound, setPriceBound] = React.useState<{ min: number | null, max: number | null }>({ min: null, max: null })
    const session = useSession();
    const nextStepHandle = async (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (price === 0) return;
        if (inputProp.error) return evt.preventDefault();
        try {
            const rst = await getYourSpaceUpdate("price",
                session.data?.user?.email as string,
                itemId, { price, discount: inputProp.discount });
            if (rst.result) {
                router.push("/become-a-host/" + itemId + "/receipt")
            }
            else {
                alert("error")
            }
        } catch (e: any) {
            alert("error : " + e.message)
            console.log(e.message)
        }
    }

    React.useEffect(() => {
        setPriceBound({
            min: 13401, max: 13400392
        })
    }, [])
    React.useEffect(() => {
        if ((price > priceBound.max!) || (price < priceBound.min!)) {
            setInputProp(current => ({ ...current, error: true }))
        } else {
            if (inputProp.error) {
                setInputProp(current => ({ ...current, error: false }))
            }
        }
    }, [price])
    const handlePriceButton = (type: string) => {
        switch (type) {
            case 'minus':
                if (price <= priceBound.min!) return;
                if (price > priceBound.max!) return setPrice(priceBound.max!);
                return setPrice(current => (current - 1000));
            case 'plus':
                if (price >= priceBound.max!) return;
                if (price < priceBound.min!) return setPrice(priceBound.min!);
                return setPrice(current => (current + 1000));
        }
    }
    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (evt) => {
        setPrice(~~evt.target.value)
    }
    return (
        <>
            <Box
                sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Box onClick={() => router.push("/")} style={{ position: "fixed", right: 50, top: 30 }}>
                    <HelpBtn />
                    <ExitBtn />
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: 10,
                        mt: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        wordBreak: "keep-all",
                        mb: "80px",
                        height: "100vh",
                    }}
                >
                    <Box
                        sx={{
                            minHeight: "320px",
                            maxHeight: 'min("700px","50vh")',
                            flex: 1,
                            width: '80vw',
                            minWidth: '600px'
                        }}
                    >
                        <Box
                            sx={bodyBoxStyle}>
                            <h1 style={{ color: "#222222" }}>
                                이제 요금을 설정하세요
                                <br />
                                <span style={{ color: "#717171", fontSize: "18px" }}>
                                    언제든지 변경하실 수 있습니다.
                                </span>
                            </h1>
                            <Box sx={pricePickerStyle} >
                                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                                    <IconButton disabled={price <= priceBound.min! ? true : false} sx={iconStyle} onClick={() => handlePriceButton('minus')} >
                                        <RemoveIcon />
                                    </IconButton>
                                    <TextField inputMode="numeric" placeholder="₩00"
                                        value={price === 0 ? '' : price}
                                        onChange={handleChange}
                                        inputProps={{ style: { height: '80%', textAlign: "center", margin: 0, width: '100%', fontWeight: '600', fontSize: '32px', lineHeight: '38px' } }}
                                        type={'number'} sx={{ width: '400px', backgroundColor: "white" }}
                                        error={inputProp.error} id="outlined-basic" variant="outlined" />
                                    <IconButton disabled={price >= priceBound.max! ? true : false} sx={iconStyle} onClick={() => handlePriceButton('plus')} >
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                                /박
                                <Typography sx={{ display: "flex", fontSize: '12px', alignItems: "center", height: "30px" }}>
                                    {inputProp.error ?
                                        <>
                                            <span style={{ color: "#C13515" }}><ErrorIcon /></span> &nbsp;&nbsp;
                                            <span style={{ color: "rgb(211,47,47)" }}>
                                                기본 요금으로 ₩{priceBound.min!.toLocaleString()}~₩{priceBound.max!.toLocaleString()} 사이의 값을 입력해 주세요.
                                            </span>
                                        </> : <></>
                                    }
                                </Typography>
                                <Typography sx={{ width: 360, textAlign: "center" }}>
                                    이 지역에서 비슷한 숙소의 요금은 보통 ₩83,141~₩138,568 사이입니다.
                                </Typography>
                                {/* <HiOutlineInformationCircle aria-hidden={false} size={24} /> */}
                            </Box>
                            <Box sx={pricePickerStyle} >
                                <h1 style={{ color: "#111111", fontSize: "18px" }} onClick={() => setInputProp(current => ({ ...current, discount: !current.discount }))} >
                                    단기간에 예약률을 높이는 법
                                    <Checkbox
                                        checked={inputProp.discount}
                                        edge='end'
                                        // size="large"
                                        disableRipple
                                        sx={{
                                            // position: "absolute",
                                            // right: "5%",
                                            top: "-10px",
                                            float: "right",
                                            borderRadius: 100,
                                            color: "#999999",
                                            '&.Mui-checked': {
                                                color: "rgb(10,10,10)",
                                            },
                                        }}
                                    />
                                    <Typography sx={{ fontSize: "18px" }}>
                                        <span style={{ color: "#222222" }}>
                                            첫 게스트 3명에게 20% 할인 혜택을 제공하여 더 빨리 예약을 받아보세요. 자세히 알아보기
                                        </span>
                                    </Typography>
                                </h1>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <HostLayOutFooter nextStepHandle={nextStepHandle} />
            </Box>
        </>
    )
}
Photo.layout = "host"
export async function getServerSideProps(props: GetServerSidePropsContext) {
    const itemId = props.query.itemId;
    return {
        props: {
            itemId: itemId
        }
    }
}