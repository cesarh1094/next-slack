import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dispatch, SetStateAction } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod, getZodConstraint } from "@conform-to/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

type SignUpCardProps = {
  setState: Dispatch<SetStateAction<SignInFlow>>;
};

const SignUpFormSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Email is invalid"),
    password: z.string({ required_error: "Password is required" }).min(20),
    confirmPassword: z.string({
      required_error: "Please confirm password",
    }),
  })
  // Validate that the password and confirmPassword are the same
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function SignUpCard({ setState }: SignUpCardProps) {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SignUpFormSchema });
    },
    constraint: getZodConstraint(SignUpFormSchema),
  });

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl">Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-3" {...getFormProps(form)}>
          <div className="grid gap-1">
            <Input
              disabled={false}
              placeholder="Email"
              className={cn(
                fields.email.errors ? "invalid:border-red-800" : "",
              )}
              {...getInputProps(fields.email, { type: "email" })}
            />
            {fields.email.errors ? (
              <div className="text-red-800 text-sm" id={fields.email.errorId}>
                {fields.email.errors}
              </div>
            ) : null}
          </div>
          <div className="grid gap-1">
            <Input
              disabled={false}
              placeholder="Password"
              className={cn(
                fields.password.errors ? "invalid:border-red-800" : "",
              )}
              {...getInputProps(fields.password, { type: "password" })}
            />
            {fields.password.errors ? (
              <div
                className="text-red-800 text-sm"
                id={fields.password.errorId}
              >
                {fields.password.errors}
              </div>
            ) : null}
          </div>
          <div className="grid gap-1">
            <Input
              disabled={false}
              placeholder="Confirm password"
              className={cn(
                fields.confirmPassword.errors ? "invalid:border-red-800" : "",
              )}
              {...getInputProps(fields.confirmPassword, { type: "password" })}
            />
            {fields.confirmPassword.errors ? (
              <div
                className="text-red-800 text-sm"
                id={fields.confirmPassword.errorId}
              >
                {fields.confirmPassword.errors}
              </div>
            ) : null}
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={false}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={false}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute left-2.5 top-2.5" />
            Continue with Google
          </Button>
          <Button
            disabled={false}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute left-2.5 top-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signIn")}
          >
            Sign in
          </button>
        </p>
      </CardContent>
    </Card>
  );
}
