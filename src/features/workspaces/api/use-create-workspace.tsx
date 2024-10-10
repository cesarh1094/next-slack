import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback } from "react";
import React from "react";

type Options<TSuccessData> = {
  onSuccess?: (data: TSuccessData) => void;
  onError?: (error?: unknown) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export function useCreateWorkspace() {
  const mutation = useMutation(api.workspaces.create);
  const [data, setData] = React.useState<Awaited<
    ReturnType<typeof mutation>
  > | null>(null);
  const [error, setError] = React.useState<unknown>(null);

  const [mutationStatus, setMutationStatus] = React.useState<
    "success" | "error" | "pending" | "settled" | null
  >(null);

  let isPending = React.useMemo(
    () => "pending" === mutationStatus,
    [mutationStatus]
  );
  let isSuccess = React.useMemo(
    () => "success" === mutationStatus,
    [mutationStatus]
  );
  let isError = React.useMemo(
    () => "error" === mutationStatus,
    [mutationStatus]
  );
  let isSettled = React.useMemo(
    () => "settled" === mutationStatus,
    [mutationStatus]
  );

  const mutate = useCallback(
    async (
      values: Parameters<typeof mutation>[0],
      options?: Options<Awaited<ReturnType<typeof mutation>>>
    ) => {
      try {
        // Reset values for other "states"
        setData(null);
        setError(null);

        // When making API call, set to true
        setMutationStatus("pending");

        const response = await mutation(values);

        // Set data from successful API mutation
        setData(response);

        options?.onSuccess?.(response);
        return response;
      } catch (e) {
        // Set error from unesuccessful API mutation
        setError(e);

        options?.onError?.(e);

        if (options?.throwError) {
          setMutationStatus("error");
          throw e;
        }
      } finally {
        setMutationStatus("settled");

        options?.onSettled?.();
      }
    },
    [mutation]
  );

  return {
    mutate,
    data,
    error,
    isError,
    isSettled,
    isSuccess,
    isPending,
  };
}
