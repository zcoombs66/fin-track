import NavBar from "./NavBar"
import Welcome from "./Welcome"
import Message from "./Message"
import frontImage from "../../assets/splash.jpg"
import Image from "next/image"


export default function Splash() {
    return (
        <div>
            <NavBar />
            <Welcome />
            <Image src={frontImage} alt="image-placeholder" />
            <Message />
        </div>
    )
}