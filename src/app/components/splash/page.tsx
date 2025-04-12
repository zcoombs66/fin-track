import NavBar from "./NavBar"
import Welcome from "./Welcome"
import Message from "./Message"
// import frontImage from "../../assets/splash.jpg"
import Image from "next/image"

const splashPath = "/splash.jpg";

export default function Splash() {
    return (
        <div>
            <NavBar />
            <Welcome />
            <Image 
                src={splashPath} 
                alt="image-placeholder" 
                width={500}
                height={75}
                className="w-full h-75 object-cover"
            />
            <Message />
        </div>
    )
}