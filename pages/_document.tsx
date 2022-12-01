import { Html, Head, Main, NextScript } from 'next/document'
import loader from '../styles/loader';

export default function Document() {
    return (
        <Html>
            <Head />
            <head >
                <style>
                    {loader}
                </style>
                <title>여행은 살아보는 거야</title>
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet" />
            </head>
            <body>
                <div id={'globalLoader'}>
                    <div className="loader">
                        <div />
                        <div />
                    </div>
                </div>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}