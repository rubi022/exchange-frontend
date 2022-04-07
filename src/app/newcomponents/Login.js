import {
    Card,
    Grid,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
} from '@mui/material'
import React, { useState } from 'react'
// import useAuth from 'app/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
// import { Box, styled, useTheme } from '@mui/system'
import { Box, styled } from '@mui/system'

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
// import { Paragraph, Span } from 'app/components/Typography'
import { Span } from 'app/components/Typography'

// import { Link, Navigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";

import { setWithExpiry } from "../utils/setExpiry";


// styling
const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))





const JwtLogin = (user, setUser) => {
    //   code
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keepLogged, setKeepLogged] = useState(false);
    if (user) return <Navigate to="/" />;

    async function handleFormSubmit(e) {
        e.preventDefault();

        let item = { email, password };
        let result = await fetch(
            "https://cp.btfd.cc/api/v2/barong/identity/sessions",

            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(item),
            }
        );
        result = await result.json();
        console.log({ result });
        if (result?.errors)
            return toast.error("Authentication failed", {
                position: "top-center",
            });
        console.log("result", result);
        if (keepLogged) setWithExpiry("user-info", result, 86400000);
        //  localStorage.setItem("user-info", JSON.stringify(result));

        setUser(result);
        // navigate('/product');
    }



    return (
        <JWTRoot>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <JustifyBox p={4} height="100%">
                            <IMG
                                src="/assets/images/illustrations/dreamer.svg"
                                alt=""
                            />
                        </JustifyBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <ContentBox>
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    value={email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                />
                                <TextValidator
                                    sx={{ mb: '12px', width: '100%' }}
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => setPassword(e.target.value)}

                                    name="password"
                                    type="password"
                                    value={password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <FormControlLabel
                                    sx={{ mb: '12px', maxWidth: 288 }}
                                    name="agreement"
                                    onChange={(e) => setKeepLogged(e.target.checked)}
                                    control={
                                        <Checkbox
                                            size="small"
                                            onChange={(e) => setKeepLogged(e.target.checked)}

                                            checked={keepLogged}
                                        />
                                    }
                                    label="Remeber me"
                                />

                                {/* {message && (
                                    <Paragraph sx={{ color: textError }}>
                                        {message}
                                    </Paragraph>
                                )} */}

                                <FlexBox mb={2} flexWrap="wrap">
                                    <Box position="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            // disabled={loading}
                                            type="submit"
                                        >
                                            Sign in
                                        </Button>
                                        {/* {loading && (
                                            <StyledProgress
                                                size={24}
                                                className="buttonProgress"
                                            />
                                        )} */}
                                    </Box>
                                    <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() =>
                                            navigate('/session/signup')
                                        }
                                    >
                                        Sign up
                                    </Button>
                                </FlexBox>
                                <Button
                                    sx={{ color: 'primary' }}
                                    onClick={() =>
                                        navigate('/session/forgot-password')
                                    }
                                >
                                    Forgot password?
                                </Button>
                            </ValidatorForm>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </JWTRoot>
    )
}

export default JwtLogin
