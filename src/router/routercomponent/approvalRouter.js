import ApprovalApp from "../../components/approval/ApprovalApp";

const approvalRouter = {
  path: "approval/",
  children: [{ index: true, element: <ApprovalApp /> }],
};

export default approvalRouter;
