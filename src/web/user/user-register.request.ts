import { z } from "zod";

export const userRegisterRequest = z.object({
  name: z.string(),
  address: z.string(),
  email: z.string().email(),
  password: z.string(),
  creditcard_type: z.string(),
  creditcard_number: z
    .string()
    .refine((value) => isValidCreditCardNumber(value), {
      message: "Credit card data invalid.",
    }),
  creditcard_name: z.string(),
  creditcard_expired: z
    .string()
    .refine((value) => isValidCreditCardExpirationDate(value), {
      message: "Credit card expiration date invalid.",
    }),
  creditcard_cvv: z
    .string()
    .length(3, { message: "CVV must be 3 characters long" }),
});

export type UserRegisterRequest = z.infer<typeof userRegisterRequest>;

function isValidCreditCardNumber(value: string): boolean {
  /* Remove spaces and dashes from the credit card number */
  const sanitizedValue = value.replace(/\s+/g, "").replace(/-/g, "");
  /* Check if the credit card number consists of only digits and has a length between 13 and 19 characters */
  return /^\d{13,19}$/.test(sanitizedValue);
}

function isValidCreditCardExpirationDate(value: string): boolean {
  const [month, year] = value.split("/");
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = new Date().getMonth() + 1;
  const parsedMonth = parseInt(month, 10);
  const parsedYear = parseInt(year, 10);

  return (
    /^\d{2}$/.test(month) &&
    /^\d{4}$/.test(year) &&
    parsedMonth >= 1 &&
    parsedMonth <= 12 &&
    parsedYear >= parseInt(currentYear, 10) &&
    (parsedYear > parseInt(currentYear, 10) ||
      (parsedYear === parseInt(currentYear, 10) && parsedMonth >= currentMonth))
  );
}
