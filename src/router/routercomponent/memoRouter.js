import MemoApp from "../../components/memo/MemoApp";
import SendMemoApp from "../../components/memo/SendMemoApp";
import WriteMemo from "../../components/memo/WirteMemo";
import SaveMemoApp from "../../components/memo/SaveMemoApp";
import ReplyMemo from "../../components/memo/ReplyMemo";

const memoRouter = {
  path: "memo/",
  children: [
    { index: true, element: <MemoApp /> },
    { path: "writeMemo", element: <WriteMemo /> },
    // { path: "receive", element: <ReceiveMemoApp /> },
    { path: "send", element: <SendMemoApp /> },
    { path: "save", element: <SaveMemoApp /> },
    { path: "reply", element: <ReplyMemo /> },
  ],
};

export default memoRouter;
