import Image from "next/image";
import Splash from "./components/splash/page";
import AddTransaction from "./components/addtransaction/AddTransaction";
import TransactionHistory from "./components/transactionhistory/TransactionHistory";

// import Transaction from "./components/Transaction";
import connectMongoDB from "../../config/mongodb";
import SignUp from "./components/signUp/SignUp";

export default function Home() {

  
  connectMongoDB();

  return (
    <div>
     <Splash />
     <br />
     <AddTransaction />
     
    </div>
  );
}
