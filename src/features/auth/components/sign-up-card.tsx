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

type SignUpCardProps = {
  setState: Dispatch<SetStateAction<SignInFlow>>;
};

export function SignUpCard({ setState }: SignUpCardProps) {
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl">Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            disabled={false}
            placeholder="Email"
            type="email"
            required
            value={""}
            onChange={() => {}}
          />
          <Input
            disabled={false}
            placeholder="Password"
            type="password"
            required
            value={""}
            onChange={() => {}}
          />
          <Input
            disabled={false}
            placeholder="Confirm password"
            type="password"
            required
            value={""}
            onChange={() => {}}
          />
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
