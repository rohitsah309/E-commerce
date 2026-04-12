import headphoneImg from "../../assets/Headphone.jpg";
import mouseImg from "../../assets/HP_mouse.jpg";
import monitorImg from "../../assets/asus_monitor.jpg";
import keyboardImg from "../../assets/keyboard.png";
import chargerImg from "../../assets/charger.webp";
import airpodsImg from "../../assets/airpods.jpeg";

const productsdata = [
    {
        id : 1,
        tag : "Best Seller",
        category: "Audio",
        brand: "Marshall",
        name: "Monitor III A.N.C Black",
        rating:4.4,
        reviews: 2341,
        price:29999,
        image: headphoneImg
    },
    {
        id : 2,
        tag : "New",
        category: "Gaming",
        brand: "DELL",
        name: "Alienware Wireless Gaming Mouse",
        rating:4.4,
        reviews: 1890,
        price:8199,
        oldPrice:9999, 
        image: mouseImg
    },
    {
        id : 3,
        tag : "Top Rated",
        category: "Displays",
        brand: "ASUS",
        name: "proArt Display PA32UCDM",
        rating:4.9,
        reviews: 987,
        price:201889,
        oldPrice:300000,
        image: monitorImg
    },
    {
        id : 4,
        tag : "",
        category: "Peripherals",
        brand: "HP",
        name: "HP 970 Creator Keyboard (Wireless)",
        rating:4.2,
        reviews: 987,
        price:7999,
        oldPrice:11989,
        image: keyboardImg
    },

    {
        id : 5,
        tag : " ",
        category: "Accessories",
        brand: "Nothing",
        name: "Nothing 65W Fast Charger",
        rating:4.2,
        reviews: 987,
        price:2499,
        oldPrice:3999, 
        image: chargerImg
    },
    {
        id : 6,
        tag : "Premium ",
        category: "Audio",
        brand:"Apple",
        name: "AirPods Pro 3",
        rating:4.4,
        reviews: 987,
        price:24900,
        oldPrice:25900,
        image: airpodsImg
    }


];

export default productsdata