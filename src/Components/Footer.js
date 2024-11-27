import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.contact}>
                    <h3>Contact Info</h3>
                    <p>Email: abdooreda70@gmail.com</p>
                    <p>Phone: 01153171996</p>
                </div>

                <div style={styles.fakeInfo}>
                    <h3>Fake Info</h3>
                    <p>Address: 1234 Street Name, City, Country</p>
                    <p>Company: Fake Co.</p>
                </div>

                <div style={styles.social}>
                    <h3>Follow Us</h3>
                    <div style={styles.icons}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook style={styles.icon} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter style={styles.icon} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin style={styles.icon} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram style={styles.icon} />
                        </a>
                    </div>
                </div>
            </div>
            <p style={styles.copy}>© 2024 Fake Co. All Rights Reserved.</p>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: "#000", // Black footer
        color: "#fff",
        padding: "20px 0",
        textAlign: "center",
        position: "relative",
        bottom: 0,
        width: "100%",
    },
    container: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        flexWrap: "wrap",
        padding: "10px",
    },
    contact: {
        textAlign: "left",
        flex: "1",
        minWidth: "200px",
    },
    fakeInfo: {
        textAlign: "left",
        flex: "1",
        minWidth: "200px",
    },
    social: {
        textAlign: "left",
        flex: "1",
        minWidth: "200px",
    },
    icons: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "10px",
    },
    icon: {
        fontSize: "24px",
        color: "#fff",
        transition: "color 0.3s",
    },
    copy: {
        marginTop: "20px",
        fontSize: "14px",
    },
};

export default Footer;
