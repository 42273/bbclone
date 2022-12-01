import type { NextApiHandler, NextApiResponse } from 'next'
import Account from '../../../lib/model/account'
import dbConnect from '../../../lib/dbConnect'

export type Response = {
  result: boolean,
  datas?: string;
}

const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const handler: NextApiHandler = async (req, res: NextApiResponse<Response>) => {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!emailRegExp.test(email)) {
      return res.status(500).json({ result: false, datas: "notEmail" })
    }
    try {
      await dbConnect()
      const data = await Account.findOne({ email: email });
      if (!data) {
        return res.status(200).json({ result: true, datas: "goToRegist" })
      } else {
        return res.status(200).json({ result: false, datas: "goToLogin" })
      }
    } catch (e) {
      return res.status(500).json({ result: false })
    }
  }
  else {
    return res.status(500).json({ result: false })
  }
}

export default handler
