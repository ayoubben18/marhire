import { HiOutlineMail } from "react-icons/hi";
import { CiGlobe } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";

const ContactUsBox = () => {
    return (
        <section className="contact-section">
            <div className="container">
                <h2>Contact Us</h2>
                <div className="contact-methods">
                    <div className="contact-method">
                        <span className="contact-icon">
                            <HiOutlineMail />
                        </span>
                        <a href="mailto:info@marhire.com">info@marhire.com</a>
                    </div>
                    <div className="contact-method">
                        <span className="contact-icon">
                            <FaPhone />
                        </span>
                        <a href="https://wa.me/212660745055">+212 660-745055</a>
                    </div>
                    <div className="contact-method">
                        <span className="contact-icon">
                            <CiGlobe />
                        </span>
                        <a href="https://www.marhire.com">www.marhire.com</a>
                    </div>
                </div>
                <p className="support-note">Chat support available 24/7.</p>
            </div>
        </section>
    );
};

export default ContactUsBox;
