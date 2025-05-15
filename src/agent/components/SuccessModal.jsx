import React from 'react';
import { motion } from 'framer-motion';

import "../pages/connection.css";

const SuccessModal = ({ onClose, type, platform }) => {
    const platformName = platform || "Facebook";

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="success-modal"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                <div className="success-icon">
                    <motion.div
                        className="check-container"
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: 1, pathLength: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <svg viewBox="0 0 52 52" className="checkmark">
                            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                            <motion.path
                                className="checkmark-check"
                                fill="none"
                                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
                            />
                        </svg>
                    </motion.div>
                </div>
                {type === "login" ?
                    (
                        <>
                            <motion.h2
                                className="success-title"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                Congratulations!
                            </motion.h2>

                            <motion.p
                                className="success-message"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                Your {platformName} account has been successfully connected!
                            </motion.p>
                        </>
                    ) : (
                        <>
                            <motion.h2
                                className="success-title"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                Done
                            </motion.h2>
                            <motion.p
                                className="success-message"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                Your {platformName} account has been successfully Deactivated!
                            </motion.p>
                        </>
                    )}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <button className="close-btn" onClick={onClose}>Continue</button>
                </motion.div>
            </motion.div>
        </motion.div>
    );

};

export default SuccessModal;