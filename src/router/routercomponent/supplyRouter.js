import SupplyApp from "../../components/supply/SupplyApp";
import SupplyLogView from "../../components/supply/components/SupplyLogView";
import SupplyModification from "../../components/supply/components/SupplyModification";
import SupplyRegist from "../../components/supply/components/SupplyRegist";
// import SupplyView from "../../components/supply/components/SupplyView";

const supplyRouter = {
  path: "supply/",
  children: [
    { index: true, element: <SupplyApp /> },
    // { path: "view", element: <SupplyView /> },
    { path: "regist", element: <SupplyRegist /> },
    { path: "modify/:splId", element: <SupplyModification /> },
    { path: "log", element: <SupplyLogView /> },
  ],
};

export default supplyRouter;
