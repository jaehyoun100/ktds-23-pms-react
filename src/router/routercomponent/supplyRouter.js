import SupplyApp from "../../components/supply/SupplyApp";
import SupplyRegist from "../../components/supply/SupplyRegist";
import SupplyView from "../../components/supply/SupplyView";

const supplyRouter = {
  path: "supply/",
  element: <SupplyApp />,
  children: [
    { path: "view", element: <SupplyView /> },
    { path: "regist", element: <SupplyRegist /> },
  ],
};

export default supplyRouter;
