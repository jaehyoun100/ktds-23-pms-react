import RentalSupplyApp from "../../components/rentalsupply/RentalSupplyApp";
import RentalSupplyRegist from "../../components/rentalsupply/components/RentalSupplyRegist";
import RentalSupplyView from "../../components/rentalsupply/components/RentalSupplyView";

const rentalSupplyRouter = {
  path: "rentalsupply/",
  element: <RentalSupplyApp />,
  children: [
    { path: "view", element: <RentalSupplyView /> },
    { path: "regist", element: <RentalSupplyRegist /> },
  ],
};

export default rentalSupplyRouter;
