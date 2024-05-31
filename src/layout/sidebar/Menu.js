import { BsHouseDoor, BsHouseDoorFill } from "react-icons/bs";

export const menus = [
  {
    label: "Home",
    to: "/",
    icon: <BsHouseDoor />,
    clickIcon: <BsHouseDoorFill />,
  },
  {
    label: "사원",
    to: "/employee",
    icon: <BsHouseDoor />,
    clickIcon: <BsHouseDoorFill />,
    children: [
      {
        label: "사원정보조회",
        to: "search",
      },
      {
        label: "사원이력조회",
        to: "history",
      },
    ],
  },
  {
    label: "부서",
    to: "/department",
    icon: <BsHouseDoor />,
    clickIcon: <BsHouseDoorFill />,
    children: [
      {
        label: "부서/팀조회",
        to: "search",
      },
    ],
  },
  {
    label: "비품",
    to: "/product",
    icon: <BsHouseDoor />,
    clickIcon: <BsHouseDoorFill />,
    children: [
      {
        label: "비품조회",
        to: "list",
      },
      {
        label: "비품대여현황",
        to: "rentalstate",
      },
      {
        label: "비품관리목록",
        to: "history",
      },
      {
        label: "비품상세목록",
        to: "detail",
      },
    ],
  },
];

export default menus;
