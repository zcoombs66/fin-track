import Splash from "./components/splash/page";
import connectMongoDB from "../../config/mongodb";

export default function Home() {

  
  connectMongoDB();

  return (
    <div>
     <Splash />     
    </div>
  );
}
