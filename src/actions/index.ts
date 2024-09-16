import { defineAction } from "astro:actions";
import { z } from "astro:content";

export async function mutateData(method: string, path: string, SignupPayload?: any) {
  const baseUrl = import.meta.env.STRAPI_URL || "http://localhost:1337";
  const url = new URL(path, baseUrl);

  const authToken = import.meta.env.TOKEN;

  const headers: any = {
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(url.href, {
      method: method,
      headers,
      body: JSON.stringify({ ...SignupPayload }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

interface SignupPayload {

	username: string,
    email: string,
	password: string,
	
}
interface LoginPayload {
	identifier: string,
	password: string,
}
interface LoginData {
	email: string,
	password: string,
}
export const server = {
  sign_up: defineAction({
    accept: "form",
    input: z.object({
	  username: z.string({message: 'this field has to be filled'}),
      email: z
        .string({ message: "This field has to be filled." })
        .email("This is not a valid email."),
	  password: z.string({message: 'this field has to be filled'})
    }),

    handler: async (formData:  SignupPayload ) => {
      // insert comments in db
      console.log(formData);

      const Payload: SignupPayload = {
          email: formData.email,
		  username: formData.username,
		  password: formData.password
      };

      const responseData = await mutateData("POST", "api/auth/local/register", Payload);

      if (!responseData) {
        return {
          strapiErrors: null,
          message: "Ops! Something went wrong. Please try again.",
        };
      }

      if (responseData.error) {
        return {
          strapiErrors: responseData.error,
          message: "Failed to Register.",
        };
      }

      return {
        data: responseData,
        strapiErrors: null,
      };
    },
  }),
  sign_in: defineAction({
	accept: "form",
    input: z.object({
      email: z
        .string({ message: "This field has to be filled." })
        .email("This is not a valid email."),
	  password: z.string({message: 'this field has to be filled'})
    }),

    handler: async (formData: LoginData ) => {
      // insert comments in db
      console.log(formData);

      const Payload: LoginPayload = {
          identifier: formData.email,
		  password: formData.password
      };

      const responseData = await mutateData("POST", "api/auth/local", Payload);

      if (!responseData) {
        return {
          strapiErrors: null,
          message: "Ops! Something went wrong. Please try again.",
        };
      }

      if (responseData.error) {
        return {
          strapiErrors: responseData.error,
          message: "Failed to Register.",
        };
      }

      return {
        data: responseData,
        strapiErrors: null,
      };
    },
  })
};