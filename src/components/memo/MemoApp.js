import { useCallback, useMemo, useState } from "react";
import "./Memo.module.css";
import ReceiveMemoApp from "./ReceiveMemoApp";
import { loadMyData } from "../../http/memoHttp";
import { useFetch } from "../hook/useFetch";
import { useDispatch } from "react-redux";
import { memoAction } from "../../store/toolkit/slice/memoSlice";

export default function Memo() {
  const token = localStorage.getItem("token");
  const memoDispatch = useDispatch();

  const fetchLoadMyData = useCallback(() => {
    if (token) {
      return loadMyData;
    } else {
      return () => {
        return undefined;
      };
    }
  }, [token]);
  const fetchToken = useMemo(() => {
    return { token };
  }, [token]);
  const { data } = useFetch(undefined, fetchLoadMyData(), fetchToken);
  const { body: myInfo } = data || {};
  memoDispatch(memoAction.saveMyInfo({ myInfo: myInfo }));

  return (
    <>
      <ReceiveMemoApp token={token} myInfo={myInfo} />
    </>
  );
}
