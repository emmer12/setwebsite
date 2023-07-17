const constants = {
  payment_type: {
    BACKDROP: "backdrop",
    SAF_SUB: "set_and_forget_sub",
    DEE_DIGITAL_SUB: "dee_digital_subscription",
    QUOTE_SUB: "quote_subscription",
    VENDOR_SUB: "vendor_subscription",
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
};

export default constants;
