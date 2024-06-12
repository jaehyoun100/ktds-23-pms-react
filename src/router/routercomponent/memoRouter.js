import MemoApp from "../../components/memo/MemoApp";
import ReceiveMemoApp from "../../components/memo/ReceiveMemoApp";
import SendMemoApp from "../../components/memo/SendMemoApp";
import WriteMemo from "../../components/memo/WirteMemo";

const memoRouter = {
  path: "memo/",
  children: [
    { index: true, element: <MemoApp /> },
    { path: "writeMemo", element: <WriteMemo /> },
    { path: "receive", element: <ReceiveMemoApp /> },
    { path: "send", element: <SendMemoApp /> },
    // { path: "archived", element: <MemoArchived /> },
  ],
};

export default memoRouter;
