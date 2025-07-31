import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import getWtspUrl from "../utils/WhatsappMsg";

const SingleListingBottom = ({ listing }) => {
    return (
        listing && (
            <div className="singlelisting-footer">
                <div className="singlelisting-footer__h3">
                    <h3>{listing.title}</h3>
                </div>
                <div className="singlelisting-footer__cta">
                    <a
                        href={getWtspUrl(listing)}
                        target="_blank"
                        className="cta-wtsp"
                    >
                        <FaWhatsapp size={22} /> Whatsapp
                    </a>
                    <a href="#singlelistingBooking" className="cta-book-now">
                        <FaRegCalendarAlt size={22} /> Book Now
                    </a>
                </div>
            </div>
        )
    );
};

export default SingleListingBottom;
