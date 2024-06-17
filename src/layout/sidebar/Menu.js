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
  },
  {
    label: "부서",
    to: "/deptteam",
    icon: <BsHouseDoor />,
    clickIcon: <BsHouseDoorFill />,
  },
  {
    label: "비품",
    to: "/supply",
    icon: <BsHouseDoor />,
    clickIcon: <BsHouseDoorFill />,
    children: [
      {
        label: "소모품조회",
        to: "/supply",
      },
      {
        label: "대여품조회",
        to: "/rentalsupply",
      },
    ],
  },
  {
    label: "프로젝트",
    to: "/project",
    icon: <BsHouseDoor />,
    clickIcon: <BsHouseDoorFill />,
  },
  {
    label: "쪽지",
    to: "/memo",
    icon: <BsHouseDoor />,
    clickIcon: <BsHouseDoorFill />,
    children: [
      {
        label: "쪽지쓰기",
        to: "/memo/writeMemo",
      },
      {
        label: "쪽지발신함",
        to: "/memo/send",
      },
      {
        label: "쪽지보관함",
        to: "/memo/save",
      },
    ],
  },
  {
    label: "지식관리",
    to: "/knowledge",
    icon: <BsHouseDoor />,
    clickIcon: <BsHouseDoorFill />,
  },
];

export default menus;
