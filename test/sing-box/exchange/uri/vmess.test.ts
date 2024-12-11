import { singboxFromUri } from "@/sing-box/exchange";
import { expect, test } from "vitest";

test.for([
  // https://github.com/2dust/v2rayN/wiki/%E5%88%86%E4%BA%AB%E9%93%BE%E6%8E%A5%E6%A0%BC%E5%BC%8F%E8%AF%B4%E6%98%8E(ver-2)
  {
    uri: "vmess://eyJ2IjoiMiIsInBzIjoiIOWkh-azqOaIluWIq-WQjSAgIiwiYWRkIjoiMTExLjExMS4xMTEuMTExIiwicG9ydCI6IjMyMDAwIiwiaWQiOiIxMzg2Zjg1ZS02NTdiLTRkNmUtOWQ1Ni03OGJhZGI3NWUxZmQiLCJhaWQiOiIxMDAiLCJzY3kiOiJ6ZXJvIiwibmV0IjoidGNwIiwidHlwZSI6Im5vbmUiLCJob3N0Ijoid3d3LmJiYi5jb20iLCJwYXRoIjoiLyIsInRscyI6InRscyIsInNuaSI6Ind3dy5jY2MuY29tIiwiYWxwbiI6ImgyIiwiZnAiOiJjaHJvbWUifQ",
    expected: {
      type: "vmess",
      tag: " 备注或别名  ",
      server: "111.111.111.111",
      server_port: 32000,
      uuid: "1386f85e-657b-4d6e-9d56-78badb75e1fd",
      alter_id: 100,
      security: "auto",
    },
  },
])("sing-box From URI (vmess)", ({ uri, expected }) => {
  expect(singboxFromUri(uri)).toStrictEqual(expected);
});

test.for([
  {
    uri: "vmess://eyJwcyI6Ik5BTUUiLCJwb3J0IjoiMTIzNDUiLCJpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImFpZCI6MCwibmV0IjoidGNwIiwidHlwZSI6Im5vbmUiLCJ0bHMiOiJub25lIiwiYWRkIjoiOC44LjguOCJ9",
    expected: {
      type: "vmess",
      tag: "NAME",
      server: "8.8.8.8",
      server_port: 12345,
      uuid: "00000000-0000-0000-0000-000000000000",
      alter_id: 0,
      security: "auto",
    },
  },
])("sing-box From URI (vmess)", ({ uri, expected }) => {
  expect(singboxFromUri(uri)).toStrictEqual(expected);
});
