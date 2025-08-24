import { HiOutlineMail } from "react-icons/hi";
import { FaPhone } from "react-icons/fa6";

const ContactUsBox = () => {
    return (
        <section className="contact-section">
            <div className="container">
                <div className="card">
                    <h2 className="title">Contact Us</h2>
                    <p className="desc">Have questions or need help with a booking? Our team is here for you.</p>
                    <div className="methods">
                        <a className="pill" href="mailto:info@marhire.com">
                            <span className="ico"><HiOutlineMail size={16} /></span>
                            <span className="text">info@marhire.com</span>
                        </a>
                        <a className="pill" href="https://wa.me/212660745055">
                            <span className="ico"><FaPhone size={16} /></span>
                            <span className="text">+212 660-745055</span>
                        </a>
                    </div>
                    <div className="sep"></div>
                    <p className="foot">Chat support available 24/7 on WhatsApp.</p>
                </div>
            </div>

            <style>{`
                .contact-section { margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); background: #ffffff; padding: 26px 0 32px; }
                .container { max-width: 860px; margin: 0 auto; padding: 0 16px; }
                .card { border: 1px solid #e6efe9; border-radius: 14px; padding: 18px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
                .title { margin: 0; font-size: 22px; font-weight: 800; color: #0f1f1b; }
                .desc { margin: 8px 0 16px 0; color: #4a5568; font-size: 14px; }
                .methods { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
                .pill { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px; color: #048667; border: 1px solid #a7d7cd; background: #f2faf8; text-decoration: none; font-weight: 600; font-size: 13px; }
                .pill .ico { display: inline-flex; }
                .pill .text { line-height: 1; }
                .sep { height: 1px; background: #e6efe9; margin: 14px 0 6px 0; }
                .foot { margin: 0; color: #4a5568; font-size: 12px; font-weight: 600; }
            `}</style>
        </section>
    );
};

export default ContactUsBox;
