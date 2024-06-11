import RentalSupplyApp from "../../components/rentalsupply/RentalSupplyApp";
import RentalSupplyModification from "../../components/rentalsupply/components/RentalSupplyModification";
import RentalSupplyRegist from "../../components/rentalsupply/components/RentalSupplyRegist";
import RentalSupplyView from "../../components/rentalsupply/components/RentalSupplyView";

const rentalSupplyRouter = {
  path: "rentalsupply/",
  children: [
    { index: true, element: <RentalSupplyApp /> },
    { path: "view", element: <RentalSupplyView /> },
    { path: "regist", element: <RentalSupplyRegist /> },
    { path: "modify", element: <RentalSupplyModification /> },
  ],
};

export default rentalSupplyRouter;
