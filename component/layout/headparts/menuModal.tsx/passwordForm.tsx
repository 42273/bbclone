import DialogContent from '@mui/material/DialogContent';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import ColorBtn from './colorBtn';
import { FormControl, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import * as React from 'react';

interface PasswordFormProps {
    passwordSubmit: (password: string) => void;
    pwError: boolean;
    setPwError: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: (b: boolean) => void
}
const style: SxProps = {
    px: 1,
    mb: 3
};

interface valuesStateProps {
    showPassword: boolean,
    password: string,
}

export default function PasswordForm({ setLoading, pwError, setPwError, passwordSubmit }: PasswordFormProps) {

    const [values, setValues] = React.useState<valuesStateProps>({
        showPassword: false,
        password: '',
    });

    const handleChange =
        (prop: keyof valuesStateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
            if (pwError) setPwError(false);
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const submithandle = () => {
        setLoading(true);
        passwordSubmit(values.password);
    }

    const enterSubmit = (evt: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (evt.key === "Enter") {
            submithandle()
        }
    }

    return (


        <>
            <Box sx={style}>
                <DialogContent>
                    <FormControl
                        sx={{ mt: 4, width: "100%" }}
                        error={pwError}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
                        <OutlinedInput
                            onKeyDown={enterSubmit}
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            label="비밀번호"
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Box
                                        onClick={handleClickShowPassword}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        <Typography> {values.showPassword ? "숨기기" : "표시"}</Typography>
                                    </Box>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <div onClick={submithandle}>
                        <ColorBtn style={{ color: "white", width: "100%", mt: 1.5, py: 1.5 }}
                            color={"rgb(220,16,98)"} >계속 </ColorBtn>
                    </div>
                </DialogContent>
            </Box>
        </>
    )
}