import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ColorBtn from './colorBtn';
import * as React from 'react';
import { SxProps } from '@mui/system';
import { Checkbox, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import { Divider } from '@mui/material';
import ErrMsg from './errMsg';
import { registerFlow } from '../../../../util/utils';


const style: SxProps = {
    px: 1,
    mb: 3
};

const explanation: SxProps = {
    fontSize: 12,
    letterSpacing: "0.05em",
}

const errStyle: SxProps = {
    color: "rgb(211,47,47)"
}


export interface StateProps {
    lastName: string;
    password?: string;
    firstName: string;
    showPassword: boolean;
    birthday: number | null;
    email: string;
    marketing: boolean;
    policy: boolean;
    providerAccountId?: string;
    provider?: string;
}
export interface ErrMsgProps {
    password: string;
    lastName: string;
    firstName: string;
    birthday: string;
    email: string;
    policy: string;

}
export interface ErrModeProps {
    password: boolean;
    lastName: boolean;
    firstName: boolean;
    birthday: boolean;
    email: boolean;
    policy: boolean;
    showPassword?: null;
    marketing?: boolean | null;
    provider?: string;
    providerAccountId?: string;

}
export default function RegisterForm({ email, setModalShape }: { email: string, setModalShape: (value: string) => void }) {

    const [values, setValues] = React.useState<StateProps>({
        password: '',
        lastName: '',
        firstName: '',
        showPassword: false,
        birthday: null,
        email: email,
        marketing: false,
        policy: false
    });

    const [errmsg] = React.useState<ErrMsgProps>({
        password: "비밀번호를 입력하세요.",
        lastName: "성을 입력하세요",
        firstName: "이름을 입력하세요.",
        birthday: "계속하시려면 생일을 선택하세요.",
        email: "이메일이 필요합니다.",
        policy: "계속하려면 동의해주세요."
    })
    const [errMode, setErrMode] = React.useState<ErrModeProps>({
        password: false,
        lastName: false,
        firstName: false,
        birthday: false,
        email: false,
        policy: false,
        showPassword: null,
        marketing: null,
    })
    const handleChange =
        (prop: keyof StateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
            if (errMode[prop]) {
                setErrMode(current => ({ ...current, [prop]: false }))
            }
            // console.log(errMode)
        };


    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleSubmit = async () => {
        let value = false
        if (values.lastName.length === 0) {
            setErrMode(
                current => ({
                    ...current, lastName: true
                })
            )
            value = true
        }
        if (values.firstName.length === 0) {
            setErrMode(
                current => ({
                    ...current, firstName: true
                })
            )
            value = true

        }
        if (values.birthday === null) {
            setErrMode(
                current => ({
                    ...current, birthday: true
                })
            )
            value = true

        }

        if (values.email.length === 0) {
            setErrMode(
                current => ({
                    ...current, email: true
                })
            )
            value = true

        }
        if ((values!.password as string).length === 0) {
            setErrMode(
                current => ({
                    ...current, password: true
                })
            )
            value = true
        }
        if (values.policy === false) {
            setErrMode(
                current => ({
                    ...current, policy: true
                })
            )
            value = true
        }

        if (value) {
            return;
        }
        const rst = await registerFlow(values);
        if (rst.result) {
            setModalShape("login");
        } else {
            console.log(rst.datas)
            alert("Error");
        }
    }

    const handlePolicy = (prop: keyof StateProps) => {
        setValues(current => ({ ...current, [prop]: !current[prop] }));
    }
    return (
        <>
            <DialogContent>
                <Box
                    id="scroll-dialog-description"
                >
                    <Box sx={style}>
                        <Box>

                            <TextField
                                margin="none"
                                id="name"
                                label="이름(예:길동)"
                                type="email"
                                fullWidth
                                error={errMode.firstName}
                                onChange={handleChange('firstName')}
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                label="성(예:홍)"
                                type="email"
                                fullWidth
                                onChange={handleChange('lastName')}
                                error={errMode.lastName}
                            />
                            {
                                (errMode.firstName || errMode.lastName) &&
                                <ErrMsg>
                                    {errMode.firstName ?
                                        errmsg.firstName : errmsg.lastName}
                                </ErrMsg>
                            }
                            {
                                errMode.firstName || errMode.lastName ||
                                <Typography variant='caption' sx={explanation}>
                                    정부 발급 신분증에 표시된 이름과 일치하는지 확인하세요.
                                </Typography>
                            }
                            <TextField
                                sx={{ mt: 4 }}
                                InputProps={{ inputProps: { min: "1900-01-01", max: "9999-12-31" } }}
                                margin="normal"
                                id="name"
                                label="생년월일"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                defaultValue={null}
                                fullWidth
                                error={errMode.birthday}
                                onChange={handleChange('birthday')}
                            />
                            {errMode.birthday ? <ErrMsg>{errmsg.birthday}</ErrMsg> : ""}
                            {
                                errMode.birthday ||
                                <Typography variant='caption' sx={explanation}>
                                    만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 에어비앤비의 다른 회원에게 공개되지 않습니다.
                                </Typography>
                            }
                            <TextField
                                sx={{ mt: 4 }}
                                margin="normal"
                                id="name"
                                label="이메일"
                                type="email"
                                fullWidth
                                error={errMode.email}
                                defaultValue={values.email}
                                onChange={handleChange('email')}
                                helperText={errMode.email ? <ErrMsg>{errmsg.email}</ErrMsg> : ""}
                            />
                            {
                                errMode.email ||
                                <Typography variant='caption' sx={explanation}>
                                    예약 확인과 영수증을 이메일로 보내드립니다.
                                </Typography>
                            }
                            <FormControl
                                sx={{ mt: 4 }}
                                fullWidth variant="outlined"
                            >
                                <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    fullWidth
                                    label="비밀번호"
                                    error={errMode.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Box
                                                onClick={handleClickShowPassword}
                                                sx={{ cursor: "pointer" }}
                                            >
                                                {values.showPassword ? "숨기기" : "표시"}
                                            </Box>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            {
                                !errMode.password ||
                                <ErrMsg>{errmsg.password}</ErrMsg>
                            }
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box>
                            <FormControl component="fieldset" variant="standard">

                                <IconButton onClick={() => handlePolicy("policy")} disableRipple>
                                    <Typography variant='caption' sx={{ mr: 8, textAlign: "start" }} ><span style={{ fontWeight: 600, color: "#333333" }}>개인정보 수집 및 이용에 동의합니다. <br /> </span>
                                        1. 에어비앤비가 수집하는 개인 정보 에어비앤비 플랫폼을 이용
                                        하는 데 필요한 정보 당사는 회원님이 에어비앤비
                                        플랫폼을 이용할 때 회원님의 개인 정보를 수집합니다. <br />
                                        그렇지 않은 경우, 에어비앤비는 요청하신 서비스를 회원님께 제공하지 못할 수 있습니다. 이러한 정보에는 다음이 포함됩니다.</Typography>
                                    <Checkbox
                                        checked={values.policy}
                                        value={values.policy}
                                        edge='end'
                                        disableRipple
                                        sx={{
                                            position: "absolute",
                                            right: "5%",
                                            top: "0%",
                                            borderRadius: 100,
                                            color: "#999999",
                                            '&.Mui-checked': {
                                                color: "rgb(10,10,10)",
                                            },
                                        }}
                                    />
                                </IconButton>
                                {
                                    errMode.policy &&
                                    <ErrMsg>
                                        {errmsg.policy}
                                    </ErrMsg>
                                }
                            </FormControl>
                            <FormControl sx={{ mt: 2 }} component="fieldset" variant="standard">
                                <IconButton onClick={() => handlePolicy("marketing")} disableRipple>
                                    <Typography variant='caption' sx={{ mr: 8, textAlign: "start" }} >
                                        <span style={{ fontWeight: 600, color: "#333333" }}>마케팅 이메일 수신을 원합니다(선택).<br /></span>
                                        에어비앤비 회원 전용 할인, 추천 여행 정보, 마케팅 이메일, 푸시 알림을 보내드립니다. 계정 설정 또는 마케팅 알림에서 언제든지 수신을 거부할 수 있습니다.</Typography>
                                    <Checkbox
                                        checked={values.marketing}
                                        // value={values.policy}
                                        edge='end'
                                        disableRipple
                                        sx={{
                                            position: "absolute",
                                            right: "5%",
                                            top: "0%",
                                            borderRadius: 100,
                                            color: "#999999",
                                            '&.Mui-checked': {
                                                color: "rgb(10,10,10)",
                                            },
                                        }}
                                    />
                                </IconButton>
                            </FormControl>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant='body2' >
                            동의 및 계속하기를 선택하여 에어비앤비 서비스 약관, 결제 서비스 약관, 위치기반서비스 이용약관, 차별 금지 정책, 개인정보 처리방침에 동의합니다.
                        </Typography>
                        <div onClick={handleSubmit}>
                            <ColorBtn style={{ color: "white", width: "100%", mt: 1.5, py: 1.5 }}
                                color={"rgb(220,16,98)"} >동의 및 계속하기 </ColorBtn>
                        </div>
                    </Box>
                </Box>
            </DialogContent>
        </>
    )
}