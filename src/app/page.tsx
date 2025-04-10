import Image from "next/image";
import Splash from "./components/splash/Splash";
import AddTransaction from "./components/addtransaction/AddTransacton";
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
