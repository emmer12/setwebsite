import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import constants from "@/lib/utils/constants";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const token = await getToken({ req });
        try {

            if (token && token.role === constants.roles.VENDOR) {

                const vendor = await prisma.vendor.findFirst({
                    where: {
                        userId: token.id as string,
                        approval_status: "Approved"
                    }
                })

                if (!vendor) return res.status(401).end(`UnAuthorized`);
                if (vendor.stripe_account_id && !vendor.stripe_account_id) {
                    const accountLink = await generateAccountLink(vendor.stripe_account_id);
                    return res.status(200).json({
                        msg: "Account connected",
                        url: accountLink,
                    });
                }
                if (vendor.stripe_connected) return res.status(200).end(`You Account as already been connected`);
                const account = await stripe.accounts.create({
                    type: "custom",
                    country: "AE",
                    email: token.email,
                    // external_account: token,
                    capabilities: {
                        card_payments: { requested: true },
                        transfers: { requested: true },
                    },

                    metadata: {
                        vendorId: vendor.id,
                        userId: vendor.userId,
                        companyName: vendor.company_name,
                    }
                });

                const accountLink = await generateAccountLink(account.id);

                await prisma.vendor.update({
                    where: {
                        id: vendor.id
                    },
                    data: {
                        stripe_account_id: account.id
                    }
                })

                res.status(200).json({
                    msg: "Account connected",
                    url: accountLink,
                });


            } else {
                res.status(401).end(`UnAuthorized`);
            }




            //   res.status(200).json({
            //     success: true,
            //   });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        } finally {
        }
    } else {
    }
};



async function generateAccountLink(account_id: string) {
    const accountLink = await stripe.accountLinks.create({
        account: account_id,
        refresh_url: process.env.USER_STRIPE_SETTING_CONNECT_URL,
        return_url: process.env.USER_STRIPE_SETTING_CONNECTED_URL,
        type: "account_onboarding",
    });

    return accountLink;
}


export default handler;
