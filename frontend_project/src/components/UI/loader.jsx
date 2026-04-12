import { motion } from "framer-motion";

const Loader = () =>{
    return(
        <motion.div
            className="loader"
            initial={{opacity:1}}
            exit={{opacity:0}}
        >
            <motion.div
                className="spinner"
                animate={{rotate:360}}
                transition={{repeat:Infinity, duration:1, ease:"linear"}}
            />
        </motion.div>
    );
};

export default Loader