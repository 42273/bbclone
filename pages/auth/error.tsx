import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router"

export default function AuthError(props:InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    return (
        <>
        <h1> ERROR PAGES! </h1>
        <h2>{props.params.error}</h2>
        <h3>{props.params.email}</h3>
        </>
    )
}


export async function getServerSideProps(props:GetServerSidePropsContext) {
    return {
        props: {
            params:props.query ??"default"
        }
    }

}