import { GetServerSidePropsContext } from "next";
import ThirdpartyRegister from "../../component/layout/headparts/menuModal.tsx/thirdpartyLogin/thirdpartyRegister";
import * as React from 'react';
import Head from "next/head";

export default function Register({ params }: GetServerSidePropsContext) {
    return (
        <>
            <Head>
                <title>가입</title>
            </Head>
            <ThirdpartyRegister email={params?.email as string} provider={params?.provier as string}
                providerAccountId={params?.providerAccountId as string}
            />
        </>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {

    return {
        props: {
            params: {
                provier: context.query.Login ?? null,
                email: context.query.email ?? null,
                providerAccountId: context.query.providerAccountId ?? null
            }
        },
    }
}



Register.layout = "noLine";
