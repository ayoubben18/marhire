import React, { useEffect, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { GiCarDoor } from "react-icons/gi";
import {
    Users,
    Car,
    Tag,
    Snowflake,
    Calendar,
    Settings2,
    Gauge,
    Fuel,
    Info,
    UserRound,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import getWtspUrl from "../utils/WhatsappMsg";
import ListingIcons from "./ListingIcons";

const SearchItem = ({ item, type }) => {
    const [price, setPrice] = useState("");
    const [unit, setUnit] = useState("");

    const generatePrice = () => {
        let listingPrice = "";
        let listingLbl = "";
        console.log(item);
        if (type === "car") {
            listingPrice = item.price_per_day;
            listingLbl = "Per day";
        } else if (type === "private") {
            const driverPrice = item.pricings[0].airport_one || 0;
            listingPrice = item.price_per_hour;
            listingLbl = "Per day";
        } else if (type === "boat") {
            listingPrice = item.price_per_hour;
            listingLbl = "Per hour";
        } else {
            listingPrice = item.act_pricings[0]?.price || 0;
            listingLbl = "Per person";
        }

        setPrice(listingPrice);
        setUnit(listingLbl);
    };

    useEffect(() => {
        generatePrice();
    }, []);

    return (
        <div className="search-item">
            <div className="search-item__img">
                <a href={`/details/${item.slug}`}>
                    <img
                        src={
                            item.galleries && item.galleries.length
                                ? "/" + item.galleries[0].file_path
                                : ""
                        }
                        alt={item.title}
                        onError={(e) => {
                            e.currentTarget.src = "/images/default-marhire.png";
                        }}
                    />
                </a>
            </div>
            <div className="search-item__content">
                <h2 className="search-item__title">{item.title}</h2>
                <p className="search-item__subtitle">
                    {item.city ? item.city.city_name : 'Morocco'} • Find all similar
                </p>
                <div className="search-item__price">
                    <div className="price">{price} €</div>
                    <div className="lbl">{unit}</div>
                </div>
                <div className="singlelisting__features singlelisting__features__srch">
                    {<ListingIcons type={type} l={item} />}
                </div>
                <div className="search__agency">
                    <img
                        src="https://mediaim.expedia.com/cars/logos/RC.png"
                        className="singlelisting__agency__logo"
                    />
                    <div className="search__item__cta">
                        <a
                            href={`/details/${item.slug}`}
                            className="cta-book-now"
                        >
                            <FaRegCalendarAlt size={22} /> Book Now
                        </a>
                        <a
                            href={getWtspUrl(item)}
                            data-target="_blank"
                            className="cta-wtsp"
                        >
                            <FaWhatsapp />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;
