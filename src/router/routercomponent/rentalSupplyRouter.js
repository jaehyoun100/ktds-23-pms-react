import RentalSupplyApp from "../../components/rentalsupply/RentalSupplyApp";
import RentalSupplyModification from "../../components/rentalsupply/components/RentalSupplyModification";
import RentalSupplyRegist from "../../components/rentalsupply/components/RentalSupplyRegist";

const rentalSupplyRouter = {
  path: "rentalsupply/",
  children: [
    { index: true, element: <RentalSupplyApp /> },
    // { path: "view", element: <RentalSupplyView /> },
    { path: "regist", element: <RentalSupplyRegist /> },
    { path: "modify/:rsplId", element: <RentalSupplyModification /> },
  ],
};

export default rentalSupplyRouter;
