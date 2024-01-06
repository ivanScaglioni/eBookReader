import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from 'cookie';
import { SignJWT, jwtVerify } from 'jose';
import { verifyJWT } from "@/safety/JWT";




const handleLogin = async (req: NextApiRequest, res: NextApiResponse) => {



    const { method, body } = req;

    var isLogin: boolean = false

    if (req.headers.cookie) {

        isLogin = await verifyJWT(req.headers.cookie);

    }


    switch (method) {
        case "GET":
            if (!isLogin) return res.status(401);
            try {
                return res.status(200).json({ 'payload': 'jwt' })
            } catch (error) {
                return res.status(401).json({ msg: "invalid token" });
            }
        case "POST":
            try {
                console.log("post")
                const data = await JSON.parse(body);
                if (data !== process.env.PASSWORD_ADMIN) return res.status(401).json({ msg: "CHUPALA" });
                const jwtConstructor = new SignJWT({ name: 'admin', role: 'admin' });
                const encoder = new TextEncoder();
                const jwt = await jwtConstructor
                    .setProtectedHeader({ alg: 'HS256', type: 'JWT' })
                    .setIssuedAt()
                    .setExpirationTime('2h')
                    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
                const serialized = serialize('authorization', jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 1000 * 60 * 60 * 2,
                    path: '/'
                })

                res.setHeader('Set-Cookie', serialized);

                return res.status(200).json('login succesfull');
            } catch (error) {
                return res.status(401).json({ msg: "invalid password" });
            }

        case 'DELETE':

            if (!isLogin) return res.status(401).json({ error: 'no token' });
            try {
                const encoder = new TextEncoder();

                const serialized = serialize('authorization', '0', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 0,
                    path: '/'
                });
                res.setHeader('Set-Cookie', serialized);
                return res.status(200).json('Sign out succesfully');
            } catch (error) {
                return res.status(401).json({ msg: "invalid token" });
            }

        default:
            return res.status(400).json({ msg: "this method is not supported" });


    }

}


export default handleLogin;