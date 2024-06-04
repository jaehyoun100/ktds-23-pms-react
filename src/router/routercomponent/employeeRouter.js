import EmployeeApp from "../../components/employee/EmployeeApp";
import EmployeeView from "../../components/employee/components/EmployeeView";

const employeeRouter = {
  path: "employee/",
  children: [
    { index: true, element: <EmployeeApp /> },
    { path: "view/:empId", element: <EmployeeView /> },
  ],
};

export default employeeRouter;
