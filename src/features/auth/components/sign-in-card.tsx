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
import { z } from "zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { cn } from "@/lib/utils";
import { useAuthActions } from "@convex-dev/auth/react";
import { useFormState, useFormStatus } from "react-dom";
import { TriangleAlert, LoaderCircleIcon } from "lucide-react";

const SignInFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Email is invalid"),
  password: z
    .string({ required_error: "Password is required" })
    .min(20, "Password should be at least 20 characters"),
});

type SignInCardProps = {
  setState: Dispatch<SetStateAction<SignInFlow>>;
};

function SubmitButton() {
  const status = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full relative"
      size="lg"
      disabled={status.pending}
    >
      Continue
      {status.pending ? (
        <LoaderCircleIcon className="size-4 absolute right-2.5 top-2.5 animate-spin" />
      ) : null}
    </Button>
  );
}

export function SignInCard({ setState }: SignInCardProps) {
  const { signIn } = useAuthActions();

  const [lastResult, action] = useFormState(
    async (_: unknown, formData: FormData) => {
      const submission = parseWithZod(formData, { schema: SignInFormSchema });

      if (submission.status !== "success") {
        return submission.reply();
      }

      try {
        await signIn("password", {
          email: submission.value.email,
          password: submission.value.password,
          flow: "signIn",
        });
      } catch (e) {
        return submission.reply({ formErrors: ["Invalid email or password"] });
      }
    },
    undefined,
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SignInFormSchema });
    },
    constraint: getZodConstraint(SignInFormSchema),
  });

  function handleAuthProviderSignIn(provider: "github" | "google") {
    signIn(provider);
  }

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl">Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-3" action={action} {...getFormProps(form)}>
          {form.errors ? (
            <div className="p-3 bg-red-100 text-red-800 rounded-md flex items-center gap-x-2 text-sm">
              <TriangleAlert className="size-4" />
              {form.errors}
            </div>
          ) : (
            ""
          )}
          <div className="grid gap-1">
            <Input
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
          <SubmitButton />
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={false}
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => handleAuthProviderSignIn("google")}
          >
            <FcGoogle className="size-5 absolute left-2.5 top-2.5" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => handleAuthProviderSignIn("github")}
          >
            <FaGithub className="size-5 absolute left-2.5 top-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {"Don't"} have an account?{" "}
          <button
            type="button"
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signUp")}
          >
            Sign up
          </button>
        </p>
      </CardContent>
    </Card>
  );
}
