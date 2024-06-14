import MemoApp from "../../components/memo/MemoApp";
import SendMemoApp from "../../components/memo/SendMemoApp";
import WriteMemo from "../../components/memo/WirteMemo";
import SaveMemoApp from "../../components/memo/SaveMemoApp";

const memoRouter = {
  path: "memo/",
  children: [
    { index: true, element: <MemoApp /> },
    { path: "writeMemo", element: <WriteMemo /> },
    // { path: "receive", element: <ReceiveMemoApp /> },
    { path: "send", element: <SendMemoApp /> },
    { path: "save", element: <SaveMemoApp /> },
  ],
};

export default memoRouter;
