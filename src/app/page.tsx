import Image from "next/image";
import Splash from "./components/splash/Splash";
import AddTransaction from "./components/addtransaction/AddTransacton";
// import Transaction from "./components/Transaction";

export default function Home() {

  


  return (
    <div>
     <Splash />
     <br />
     <AddTransaction />
    </div>
  );
}
