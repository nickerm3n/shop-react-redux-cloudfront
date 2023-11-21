import axios, { AxiosError } from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { CartItem } from "~/models/CartItem";

// TODO: Replace with actual user ID
// Given that the requirements lack clear guidance on how to accurately record and utilize the user ID in the backend, I've decided to block the test ID for now.

const MOCK_USER_ID = "1c90e5f8-23d5-4229-9e43-0515d8d5c439";

export function useCart() {
  return useQuery<CartItem[], AxiosError>("cart", async () => {
    const res = await axios.get<CartItem[]>(
      `${API_PATHS.cart}/profile/cart?userId=${MOCK_USER_ID}`,
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
        },
      }
    );
    return res.data;
  });
}

export function useCartData() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<CartItem[]>("cart");
}

export function useInvalidateCart() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("cart", { exact: true }),
    []
  );
}

export function useUpsertCart() {
  return useMutation((values: CartItem) =>
    axios.put<CartItem[]>(`${API_PATHS.cart}/profile/cart`, values, {
      headers: {
        Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
      },
    })
  );
}
