import {
    FaMapMarkerAlt,
    FaUsers,
    FaInfinity,
    FaMoneyBillWave,
    FaCogs,
    FaSnowflake,
    FaShip,
    FaUserTie,
    FaClock,
    FaUser,
    FaTags,
    FaGasPump,
    FaLanguage,
    FaExchangeAlt,
    FaComment,
    FaPeopleCarry,
    FaCompass,
    FaStar,
    FaCarSide,
} from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import { MdPerson, MdPersonAdd } from "react-icons/md";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { GiCarDoor } from "react-icons/gi";
import { PiSnowflakeFill } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";
import { useEffect } from "react";
import { FaCalendarAlt, FaCar } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { RiChat1Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const getStandarType = (type) => {
    const map = {
        cars: "cars",
        car: "cars",
        drivers: "drivers",
        private: "drivers",
        boats: "boats",
        boat: "boats",
        activities: "activities",
        activity: "activities",
    };
    return map[type] || "cars";
};

const ListingIcons = ({ type, l, classes = "", withoutLocation = false }) => {
    const { t } = useTranslation();
    const config = {
        cars: [
            {
                icon: <FaMapMarkerAlt color="f21500" />,
                label: "Location",
                value: l.city.city_name ?? "",
            },
            {
                icon: <GiCarDoor />,
                label: "Seats",
                value: l.seats + " " + t('listing.specs.seats'),
            },
            {
                icon: <FaInfinity />,
                label: "Km",
                value: l.mileage_policy,
            },
            {
                icon: <FaMoneyBillWave />,
                label: "Deposit",
                value:
                    l.deposit_required === "Yes"
                        ? t('listing.specs.depositRequired')
                        : t('listing.specs.noDeposit'),
            },
            {
                icon: <BsFillFuelPumpDieselFill />,
                label: "Transmission",
                value: l.transmission,
            },
            {
                icon: <PiSnowflakeFill />,
                label: "A/C",
                value: l.ac === "Yes" ? t('listing.specs.ac') : t('listing.specs.noAc'),
            },
        ],
        drivers: [
            {
                icon: <FaMapMarkerAlt color="f21500" />,
                label: "Location",
                value: l.pickup_location,
            },
            {
                icon: <FaCalendarAlt />,
                label: "Duration",
                value: t('listing.specs.fullDay'),
            },
            {
                icon: <FaCar />,
                label: "Service Type",
                value: l.service_type_obj ? l.service_type_obj.option : "",
            },
            {
                icon: <RiChat1Line />,
                label: "Languages",
                value: t('listing.specs.multilingual'),
            },
            {
                icon: <GoPeople />,
                label: "Capacity",
                value: l.max_passengers + " Max",
            },
            {
                icon: <FaMoneyBillWave />,
                label: "Deposit",
                value:
                    l.deposit_required === "Yes"
                        ? t('listing.specs.depositRequired')
                        : t('listing.specs.noDeposit'),
            },
        ],
        boats: [
            {
                icon: <FaMapMarkerAlt color="f21500" />,
                label: "Departure",
                value: l.departure_location,
            },
            { icon: <FaClock />, label: "Duration", value: l.duration_options },
            {
                icon: <FaUserTie />,
                label: "Captain",
                value: l.with_captain === "Yes" ? t('listing.specs.included') : t('listing.specs.notIncluded'),
            },
            {
                icon: <FaUsers />,
                label: "Max Guests",
                value: l.capacity + " Max",
            },
            { icon: <FaTags />, label: "Purpose", value: l.purpose_tags },
            {
                icon: <FaGasPump />,
                label: "Fuel",
                value: t('listing.specs.fuelIncluded'),
            },
        ],
        activities: [
            {
                icon: <FaMapMarkerAlt color="f21500" />,
                label: "Location",
                value: l.city.city_name ?? "",
            },
            { icon: <FaClock />, label: "Duration", value: l.duration_options },
            {
                icon: <FaUsers />,
                label: "Group Size",
                value: l.group_size_max
                    ? l.group_size_max + " Max"
                    : "Unlimeted",
            },
            { icon: <FaCarSide />, label: "Pickup", value: l.meeting_point },
            {
                icon: <FaCompass />,
                label: "Type",
                value: l.activity_type_obj ? l.activity_type_obj.option : "",
            },
            {
                icon: <FaStar />,
                label: "Difficulty",
                value: l.difficulty,
            },
        ],
    };

    const features = config[getStandarType(type)] || config.cars;

    return (
        <div className={`recommendation-features ${classes}`}>
            {features.map((feature, index) => (
                <>
                    {withoutLocation && feature.label === "Location" ? (
                        <></>
                    ) : (
                        <div className="recommendation-features__item">
                            <span>{feature.icon}</span>
                            <span>{feature.value}</span>
                        </div>
                    )}
                </>
            ))}
        </div>
    );
};

export default ListingIcons;
