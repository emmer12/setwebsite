const constants = {
  payment_type: {
    BACKDROP: "backdrop",
    SAF_SUB: "set_and_forget_sub",
    DEE_DIGITAL_SUB: "dee_digital_subscription",
    QUOTE_SUB: "quote_subscription",
    VENDOR_SUB: "vendor_subscription",
    SAF_TOP_UP: "saf_top_up",
    AI_TOP_UP: "ai_top_up",
    SAF_DEBIT: "saf_debit",
    AI_DEBIT: "ai_debit",
  },
  payment_status: {
    PAID: "PAID",
    UNPAID: "UNPAID",
  },
  vendor_subscriptions: {
    BASIC: 100,
    QUOTE: 190,
  },
  creative_ai_subscriptions: {
    BASIC: 100,
    PRO: 190,
  },
  saf_subscriptions: {
    BASIC: 100,
    PRO: 190,
  },
  limit: {
    SAF: 30,
  },
  subscription_type: {
    SAF_BASIC: "SAF_BASIC",
    SAF_PRO: "SAF_PRO",
    DEE_AI_BASIC: "DEE_AI_BASIC",
    DEE_AI_PRO: "DEE_AI_PRO",
    VENDOR_BASIC: "VENDOR_BASIC",
    VENDOR_PRO: "VENDOR_PRO",
  },
  roles: {
    ADMIN: "ADMIN",
    VENDOR: "VENDOR",
    USER: "USER",
  },

  legal: {
    VENDOR_REG:
      "By clicking here, you acknowledge and agree to adhere to the highest standards when serving our clients, including the commitment to respond to all leads within 24 hours. Failure to meet this requirement may result in the opportunity to send a quotation being forfeited. Additionally, you understand that our platform acts as a connection facilitator, and any transactions or agreements are solely between you and the client. Please carefully review and accept these terms before proceeding with your Vendor Registration Subscription.",
    BACKDROP_PURCHASE: "",
  },

  approval_status: {
    PENDING: "Pending",
    APPROVED: "Approved",
    DISAPPROVED: "Disapproved",
  },

  points: {
    SAF: 1,
    AI: 2,
  },


};

export default constants;
