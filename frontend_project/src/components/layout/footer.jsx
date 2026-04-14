import "./footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

function Footer() {

    return (
        <footer>
            <div className="footer-container">

                <div>
                    <h2 className="footer-logo">⚡ VOLTEX</h2>
                    <p className="footer-text">
                        Premium electronics & tech gear for the modern world.
                    </p>

                    <div className="footer-social">
                        <a href="https://facebook.com" target="_blank">
                            <FaFacebookF />
                        </a>
                        <a href="https://instagram.com" target="_blank">
                            <FaInstagram />
                        </a>
                        <a href="https://twitter.com" target="_blank">
                            <FaTwitter />
                        </a>
                        <a href="https://youtube.com" target="_blank">
                            <FaYoutube />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="footer-title">Shop</h3>
                    <ul className="footer-links">
                        <li>
                            <Link to = "/products">All Products</Link>
                        </li>
                        <li>
                            <Link to = "/cart">Cart</Link>
                        </li>
                        <li>
                            <Link>Checkout</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="footer-title">Company</h3>
                    <ul className="footer-links">
                        <li>
                            <Link to = "/contact">Contact Us</Link>
                        </li>
                        <li>
                            <Link>About Us</Link>
                        </li>
                        <li>
                            <Link>Careers</Link>
                        </li>
                        <li>
                            <Link>Blog</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="footer-title">Contact Info</h3>
                    <ul className="footer-contact">
                        <li>
                            <FiMail /> support@voltex.com
                        </li>
                        <li>
                            <FiPhone /> +91 7742913873
                        </li>
                        <li>
                            <FiMapPin /> 123 Tech Avenue, San Francusco, CA 94102
                        </li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 VOLTEX. All rights reserved.</p>

                <div className="footer-bottom-links">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                    <span>Refund Policy</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;