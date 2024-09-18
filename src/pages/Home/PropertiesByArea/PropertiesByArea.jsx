import { FaArrowTrendUp } from "react-icons/fa6";
import { motion } from "framer-motion"

const PropertiesByArea = () => {
    return (
        <div className="max-w-screen-xl w-full mx-auto py-16 px-4">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0] py-8">Properties by Area</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0">
                <motion.div
                    whileHover={{ opacity: 0.98, scale:0.98 }}
                >
                    <div className="relative">
                        <div className="hero-overlay absolute rounded-lg md:rounded-none md:rounded-l-lg">
                            <div className="px-8 py-16 flex flex-col gap-4 items-center h-full justify-end">
                                <h3 className="text-3xl font-bold text-white">London</h3>
                                <button className="btn btn-xs border-none bg-gradient-to-br from-teal-500 to-[#0060f0] text-white ">Properties< FaArrowTrendUp /></button>
                            </div>
                        </div>
                        <div>
                            <img className="rounded-lg md:rounded-none md:rounded-l-lg" src="https://i.ibb.co.com/D4DhyJs/london.jpg" alt="" />
                        </div>
                    </div>
                </motion.div>
                <motion.div
                  whileHover={{ opacity: 0.98, scale:0.98 }}
                >
                    <div className="relative">
                        <div className="hero-overlay absolute rounded-lg md:rounded-none">
                            <div className="px-8 py-16 flex flex-col gap-4 items-center h-full justify-end">
                                <h3 className="text-3xl font-bold text-white">Las Vegas</h3>
                                <button className="btn btn-xs border-none bg-gradient-to-br from-teal-500 to-[#0060f0] text-white ">Properties< FaArrowTrendUp /></button>
                            </div>
                        </div>
                        <div>
                            <img className="rounded-lg md:rounded-none" src="https://i.ibb.co.com/dpSGnHz/las-vagas.jpg" alt="" />
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    whileHover={{ opacity: 0.98, scale:0.98 }}
                >
                    <div className="relative">
                        <div className="hero-overlay absolute rounded-lg md:rounded-none">
                            <div className="px-8 py-16 flex flex-col gap-4 items-center h-full justify-end">
                                <h3 className="text-3xl font-bold text-white">Paris</h3>
                                <button className="btn btn-xs border-none bg-gradient-to-br from-teal-500 to-[#0060f0] text-white ">Properties< FaArrowTrendUp /></button>
                            </div>
                        </div>
                        <div>
                            <img className="rounded-lg md:rounded-none" src="https://i.ibb.co.com/MfF4f4f/paris.jpg" alt="" />
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    whileHover={{ opacity: 0.98, scale:0.98 }}
                >
                    <div className="relative">
                        <div className="hero-overlay absolute rounded-lg md:rounded-none md:rounded-r-lg">
                            <div className="px-8 py-16 flex flex-col gap-4 items-center h-full justify-end">
                                <h3 className="text-3xl font-bold text-white">London</h3>
                                <button className="btn btn-xs border-none bg-gradient-to-br from-teal-500 to-[#0060f0] text-white ">Dubai< FaArrowTrendUp /></button>
                            </div>
                        </div>
                        <div>
                            <img className="rounded-lg md:rounded-none md:rounded-r-lg" src="https://i.ibb.co.com/yVntXPY/dubai.jpg" alt="" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PropertiesByArea;