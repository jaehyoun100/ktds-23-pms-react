import ApprovalApp from "../../components/approval/ApprovalApp";
import ApprovalRequestApp from "../../components/approval/ApprovalRequestApp";

const approvalRouter = {
  path: "approval/",
  children: [
    { index: true, element: <ApprovalApp /> },
    { path: "request/", element: <ApprovalRequestApp /> },
  ],
};

export default approvalRouter;
