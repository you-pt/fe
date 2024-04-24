import { useState, useCallback } from "react";
import axios from "axios";

export interface InputType {
  [name: string]: string;
}

export const useInputs = (initialState = {}) => {
  const [state, setState] = useState<any>(initialState);

  const handleInput: (
    event: React.ChangeEvent<HTMLInputElement> | null | undefined,
    options: any
  ) => void = useCallback(
    (event, options) => {
      const name = options?.name || event?.target.name;
      const value = options?.value || event?.target.value;
      setState((prev: InputType) => ({
        ...prev,
        [name]: value,
      }));
    },
    [state]
  );

  return [state, handleInput];
};

export const handleSubmit = async (
  url: string,
  data: InputType,
  withCredentials: boolean = false
) => {
  if (!data) return;
  const req = await axios({
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `http://localhost:3001`,
      "Access-Control-Allow-Credentials": "true",
    },
    data,
    withCredentials,
  });
  return req;
};

