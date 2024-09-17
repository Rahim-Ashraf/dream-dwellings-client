import {motion} from "framer-motion";

const PrimaryButton = ({ btnText, btnIcon }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <button className="btn bg-gradient-to-br from-teal-500 to-[#0060f0] text-white w-full">{btnText}{btnIcon}</button>
        </motion.div>
    );
};

export default PrimaryButton;