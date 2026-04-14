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
        image: headphoneImg,
        description: "The Monitor III A.N.C Black delivers powerful signature sound with advanced active noise cancellation for an immersive listening experience. Designed with iconic Marshall style, it offers exceptional comfort and up to 70 hours of battery life. Perfect for music lovers who want premium sound, style, and long-lasting performance.",

        specs:[
            {label: "Driver", value:"40mm Dynamic"},
            {label: "Battery", value: "70 hours"},
            {label: "Connectivity", value: "Bluetooth 5.3"},
            {label: "weight", value:"320g"}
        ]
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
        image: mouseImg,
        description: "The Alienware Wireless Gaming Mouse is built for precision and speed, featuring a high-performance sensor with up to 26,000 DPI for accurate tracking and smooth gameplay. It offers tri-mode connectivity (2.4GHz, Bluetooth, and wired) along with programmable buttons for customizable control. Designed with a sleek, ergonomic build and RGB lighting, it delivers comfort and performance for long gaming sessions.",
        specs: [
            {label:"DPI", value: "26,000 DPI"},
            {label:"Connectivity", value: "2.4GHZ + Bluetooth + Wired"},
            {label:"Battery", value: "140 hours"},
            {label:"Weight", value: "89g"}
        ]
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
        image: monitorImg,
        description:"The ProArt Display PA32UCDM is a high-end 32-inch 4K QD-OLED monitor built for creators, delivering exceptional color accuracy (ΔE < 1) and 99% DCI-P3 coverage for professional-grade visuals. It features a 240Hz refresh rate, 0.1ms response time, and up to 1000 nits brightness for smooth, vibrant HDR performance. With Thunderbolt 4 connectivity and hardware calibration support, it’s ideal for video editing, design, and content creation.",
        specs: [
            {label: "Size", value: "32-inch"},
            {label: "Resolution", value: "4K UHD"},
            {label: "Refresh Rate", value: "240Hz"},
            {label: "Brightness", value: "1000 nits"}
        ]
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
        image: keyboardImg,
        description:"The HP 970 Creator Keyboard (Wireless) is a premium productivity keyboard designed for creators and professionals, featuring 20+ programmable keys and seamless multi-device connectivity. It offers a comfortable, quiet typing experience with adaptive backlighting and up to 6 months of battery life. Built with a sleek, modern design and secure wireless performance, it’s ideal for efficient multitasking and long work sessions.",

        specs: [
            {label: "Connectivity", value: "Bluetooth + USB"},
            {label: "Battery", value: "6 months"},
            {label: "Keys", value: "Programmable(20+)"},
            {label: "Backlght", value: "Adaptive"}
        ]
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
        image: chargerImg,
        description: "The Nothing 65W Fast Charger delivers high-speed charging with GaN technology, allowing you to power smartphones, tablets, and laptops efficiently. Its compact multi-port design ensures fast, safe, and convenient charging for multiple devices at once.",

        specs: [
            {label: "Power", value:"65w"},
            {label: "Ports", value:"3 (USB-C + USB-A)"},
            {label: "Technology", value:"GaN"},
            {label: "Compatibility", value:"Universal"},
            
        ]
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
        image: airpodsImg,
        description:"The AirPods Pro 3 deliver industry-leading Active Noise Cancellation with immersive spatial audio and crystal-clear sound. They feature advanced health tracking like heart rate sensing, adaptive audio, and a comfortable, secure fit for all-day use.",

        specs: [
            {label: "Audio" , value: "Apatial Audio"},
            {label: "Battery" , value: "30 hours (case)"},
            {label: "Features" , value: "ANC + Transparency"},
            {label: "Connectivity" , value: "Bluetooth 5.3"},
        ]
    }


];

export default productsdata