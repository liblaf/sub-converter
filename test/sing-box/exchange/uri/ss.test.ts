import { singboxFromUri } from "@/sing-box/exchange";
import { expect, test } from "vitest";

test.for([
  // https://github.com/shadowsocks/shadowsocks-org/wiki/SIP002-URI-Scheme
  {
    uri: "ss://YWVzLTEyOC1nY206dGVzdA@192.168.100.1:8888#Example1",
    expected: {
      type: "shadowsocks",
      tag: "Example1",
      server: "192.168.100.1",
      server_port: 8888,
      method: "aes-128-gcm",
      password: "test",
    },
  },
  {
    uri: "ss://cmM0LW1kNTpwYXNzd2Q@192.168.100.1:8888/?plugin=obfs-local%3Bobfs%3Dhttp#Example2",
    expected: {
      type: "shadowsocks",
      tag: "Example2",
      server: "192.168.100.1",
      server_port: 8888,
      method: "rc4-md5",
      password: "passwd",
    },
  },
  {
    uri: "ss://2022-blake3-aes-256-gcm:YctPZ6U7xPPcU%2Bgp3u%2B0tx%2FtRizJN9K8y%2BuKlW2qjlI%3D@192.168.100.1:8888#Example3",
    expected: {
      type: "shadowsocks",
      tag: "Example3",
      server: "192.168.100.1",
      server_port: 8888,
      method: "2022-blake3-aes-256-gcm",
      password: "YctPZ6U7xPPcU+gp3u+0tx/tRizJN9K8y+uKlW2qjlI=",
    },
  },
  {
    uri: "ss://2022-blake3-aes-256-gcm:YctPZ6U7xPPcU%2Bgp3u%2B0tx%2FtRizJN9K8y%2BuKlW2qjlI%3D@192.168.100.1:8888/?plugin=v2ray-plugin%3Bserver#Example3",
    expected: {
      type: "shadowsocks",
      tag: "Example3",
      server: "192.168.100.1",
      server_port: 8888,
      method: "2022-blake3-aes-256-gcm",
      password: "YctPZ6U7xPPcU+gp3u+0tx/tRizJN9K8y+uKlW2qjlI=",
    },
  },
])("sing-box From URI (ss)", ({ uri, expected }) => {
  expect(singboxFromUri(uri)).toStrictEqual(expected);
});

test.for([
  {
    uri: "ss://YWVzLTI1Ni1nY206UEFTU1dPUkRAZXhhbXBsZS5jb206MTIzNDU#NAME",
    expected: {
      type: "shadowsocks",
      tag: "NAME",
      server: "example.com",
      server_port: 12345,
      method: "aes-256-gcm",
      password: "PASSWORD",
    },
  },
  {
    uri: "ss://YWVzLTI1Ni1nY206UEFTU1dPUkQ@example.com:12345#NAME",
    expected: {
      type: "shadowsocks",
      tag: "NAME",
      server: "example.com",
      server_port: 12345,
      method: "aes-256-gcm",
      password: "PASSWORD",
    },
  },
])("sing-box From URI (ss)", ({ uri, expected }) => {
  expect(singboxFromUri(uri)).toStrictEqual(expected);
});
