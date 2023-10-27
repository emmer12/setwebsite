import { z } from "zod";

const props = {
  full_name: z.string().min(1, { message: "Full name is required" }).max(30),
  email: z.string().email().min(1, { message: "Email is required" }),
};

const defaultBOSchema = z.object({
  full_name: props.full_name,
  email: props.email,
  address: z.string(),
  ep_quote: z.boolean(),
  bp_quote: z.boolean(),
  country: z.string().max(50),
  mobile: z.string().max(20),
  city: z.string().max(50),
  items: z.string().min(5),
});

const requestSchema = z.object({
  ep_quote: z.literal(true),
  event_date: z.string().min(1),
  people_number: z.number().min(1, { message: "People's Number is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  occasion: z.string().min(1, { message: "Occasion is required" }),
});

const normalSchema = z.object({
  ep_quote: z.literal(false),
});

// We mark union depends of is_company attribute
const schemaCond = z.discriminatedUnion("ep_quote", [
  requestSchema,
  normalSchema,
]);

// We intersection with default propertiese
export const backdropOrderSchema = z.intersection(schemaCond, defaultBOSchema);

export const vendorOrderSchema = z.object({
  full_name: props.full_name,
  email: props.email,
  company_location: z
    .string()
    .min(1, { message: "Company location is required" })
    .max(50),
  company_name: z
    .string()
    .min(1, { message: "Company Name is required" })
    .max(50),
  country: z.string().min(1, { message: "Country is required" }).max(30),
  city: z.string().min(1, { message: "City is required" }).max(30),
  coverage_cities: z
    .array(z.string())
    .min(1, { message: "At least a city is required" }),
  services: z
    .array(z.string())
    .min(1, { message: "At least a service required" }),
  vendorCategoryId: z
    .string()
    .min(4, { message: "Coverage is required" })
    .max(30),
});

export const vendorSchema = z.object({
  company_location: z
    .string()
    .min(1, { message: "Company location is required" })
    .max(50),
  company_name: z
    .string()
    .min(1, { message: "Company Name is required" })
    .max(50),
  country: z.string().min(1, { message: "Country is required" }).max(30),
  city: z.string().min(1, { message: "City is required" }).max(30),
  coverage_cities: z
    .array(z.string())
    .min(1, { message: "At least a city is required" }),
  services: z
    .array(z.string())
    .min(1, { message: "At least a service required" }),
  vendorCategoryId: z
    .string()
    .min(4, { message: "Coverage is required" })
    .max(30),
});

export const vendorRequestSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  vendor_id: z.string().min(1, { message: "Vendor is required" }),
});

export const registrationSchema = z.object({
  fullname: z.string().min(1, { message: "Title is required" }),
  pa: z.string().min(1, { message: "Description is required" }),
  vendor_id: z.string().min(1, { message: "Vendor is required" }),
});

export const passwordResetRequestSchema = z.object({
  email: props.email,
});

export const tokenValidationSchema = z.object({
  token: z.string().min(1, { message: "Token is required" }),
});

export const passwordResetSchema = z.object({
  id: z.string().min(1, { message: "Id is required" }),
  token: z.string().min(1, { message: "Token is required" }),
  password: z.string().min(6, { message: "Password is required" }),
  password_confirmation: z
    .string()
    .min(6, { message: "Password Confirmation is required" }),
});

export const passwordUpdateSchema = z.object({
  password: z.string().min(6, { message: "Password is required" }),
  password_confirmation: z
    .string()
    .min(6, { message: "Password Confirmation is required" }),
});

export const topUpSchema = z.object({
  amount: z.number().min(10, { message: "Amount cannot be less than $10" }),
});


export const ratingSchema = z.object({
  full_name: props.full_name,
  email: props.email,
  message: z.string().min(1, { message: "Message is required" }),
  rate: z.number().min(0, { message: "Rating is required" }),
});


export const safPushSchema = z.object({
  user: z.string().min(1, { message: "user is required" }),
  category: z.string().min(1, { message: "Category is required" }),
});
