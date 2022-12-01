import { StateProps } from "../component/layout/headparts/menuModal.tsx/registerForm";
import { Response } from "../pages/api/account/auth-flow";
import { signIn, SignInResponse } from "next-auth/react"

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const authFlow: (email: string) => Promise<Response> = async (email) => {
    const response = await fetch(BASE_URL + "api/account/auth-flow", {
        method: "post", headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email })
    })
    const rst = await response.json();
    return rst
}


export const registerFlow: (data: StateProps) => Promise<Response>
    = async (data) => {
        const response = await fetch(BASE_URL + "api/account/register", {
            method: "post", headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data
            })
        })
        const rst = await response.json();
        return rst
    }


export const passwordSubmitFlow: (email: string, password: string) => Promise<SignInResponse | undefined> = async (email, password) => {
    const result = await signIn("credentials",
        {
            redirect: false,
            email: email,
            password: password
        }
    );
    return result
}

export const getYourSpaceUpdate: (phase: string, email: string, roomId: number, data: string | object) => Promise<Response> =
    async (phase, email, roomId, data) => {
        if (!phase || !email || !roomId || !data) {
            return;
        }
        const response = await fetch(BASE_URL + "api/updateYourList/getYourSpace", {
            method: "post", headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phase: phase, data: data, email: email, roomId: roomId })
        })
        const rst = await response.json();
        return rst
    }




type OnApproveData = {
    billingToken?: string | null;
    facilitatorAccessToken: string;
    orderID: string;
    payerID?: string | null;
    paymentID?: string | null;
    subscriptionID?: string | null;
    authCode?: string | null;
};
type guestData = {
    adult: number, children: number, infants: number
}
type checkType = { startDate: Date, endDate: Date }

export const bookingRegitReq: (roomId: number, data: OnApproveData, guest: guestData, checkDate: checkType, cost: number, option: boolean, userEmail: string) => Promise<Response> =
    async (roomId, data, guest, checkDate, cost, option, userEmail) => {
        const { orderID, payerID } = data
        const checkin = checkDate.startDate.toString();
        const checkout = checkDate.endDate.toString();
        const response = await fetch(BASE_URL + "api/updateYourList/getYourBooking", {
            method: "post", headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                roomId,
                data: {
                    orderID, payerID
                },
                guest,
                book: {
                    checkin,
                    checkout
                },
                cost,
                option,
                userEmail: userEmail
            })
        })
        const rst = await response.json();
        return rst
    }