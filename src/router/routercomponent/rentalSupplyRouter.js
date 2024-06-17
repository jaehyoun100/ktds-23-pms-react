import RentalSupplyApp from "../../components/rentalsupply/RentalSupplyApp";
import RentalSupplyModification from "../../components/rentalsupply/components/RentalSupplyModification";
import RentalSupplyRegist from "../../components/rentalsupply/components/RentalSupplyRegist";
import RentalSupplyLogView from "../../components/rentalsupply/components/RentalSupplyLogView";
import RentalSupplyGet from "../../components/rentalsupply/components/RentalSupplyGet";

const rentalSupplyRouter = {
  path: "rentalsupply/",
  children: [
    { index: true, element: <RentalSupplyApp /> },
    // { path: "view", element: <RentalSupplyView /> },
    { path: "regist", element: <RentalSupplyRegist /> },
    { path: "modify/:rsplId", element: <RentalSupplyModification /> },
    { path: "log", element: <RentalSupplyLogView /> },
    { path: "get", element: <RentalSupplyGet /> },
  ],
};

export default rentalSupplyRouter;
