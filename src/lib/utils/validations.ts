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
  country: z.string().max(20),
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
