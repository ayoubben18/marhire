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
    FaSuitcase,
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

const isTruthy = (value) => {
    if (value === undefined || value === null) return false;
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value === 1;
    if (typeof value === "string") {
        const v = value.trim().toLowerCase();
        return v === "yes" || v === "true" || v === "1";
    }
    return false;
};

const ListingIcons = ({ type, l, classes = "", withoutLocation = false }) => {
    const { t } = useTranslation();
    const isCompact = (classes || "").includes("compact");
    const normalizedType = getStandarType(type);
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

    // Build compact layout for agency cards
    let features;
    if (isCompact && normalizedType === "cars") {
        const seatsValue = (l.seats ? `${l.seats} ${t('listing.specs.seats')}` : "");
        const transmissionValue = (l.transmission || "");
        const fuelTypeValue = (l.fuel_type || t('listing.specs.fuel'));
        const acValue = l.ac === "Yes" ? t('listing.specs.ac') : t('listing.specs.noAc');
        const fuelPolicyValue = l.fuel_policy || "";
        const mileageValue = (l.mileage_policy || "");

        features = [
            { icon: <FaUsers />, label: 'Seats', value: seatsValue },
            { icon: <FaCogs />, label: 'Transmission', value: transmissionValue },
            { icon: <FaGasPump />, label: 'Fuel', value: fuelTypeValue },
            { icon: <PiSnowflakeFill />, label: 'A/C', value: acValue },
            { icon: <FaExchangeAlt />, label: 'Fuel Policy', value: fuelPolicyValue },
            { icon: <FaInfinity />, label: 'Km', value: mileageValue },
        ];
    } else if (isCompact && normalizedType === "boats") {
        const captainText = isTruthy(l.with_captain)
            ? t('listing.specs.withCaptain', 'With Captain')
            : t('listing.specs.noCaptain', 'No Captain');
        const capacityText = l.capacity ? `${l.capacity} ${t('listing.specs.capacity', 'capacity')}` : '';
        features = [
            { icon: <FaUserTie />, label: 'Captain', value: captainText },
            { icon: <FaUsers />, label: 'Capacity', value: capacityText },
        ];
    } else if (isCompact && normalizedType === "drivers") {
        const passengersText = (l.max_passengers ? `${l.max_passengers} ${t('listing.specs.passengers', 'passengers')}` : '');
        const languagesText = Array.isArray(l.languages_spoken)
            ? l.languages_spoken.join(', ')
            : (l.languages_spoken || t('listing.specs.multilingual', 'Multilingual'));
        const luggageText = (l.max_luggage ? `${l.max_luggage} ${t('listing.specs.luggage', 'luggage')}` : '');
        features = [
            { icon: <FaUsers />, label: 'Passengers', value: passengersText },
            { icon: <FaLanguage />, label: 'Languages', value: languagesText },
            { icon: <FaSuitcase />, label: 'Luggage', value: luggageText },
        ];
    } else if (isCompact && normalizedType === "activities") {
        const isGroup = (typeof l.private_or_group === 'string')
            ? l.private_or_group.toLowerCase().includes('group')
            : false;
        const groupText = isGroup
            ? t('listing.specs.group', 'Group')
            : t('listing.specs.private', 'Private');
        const difficultyText = l.difficulty
            ? `${l.difficulty} ${t('listing.specs.difficulty', 'difficulty')}`
            : '';
        features = [
            { icon: isGroup ? <FaUsers /> : <FaUser />, label: 'Type', value: groupText },
            { icon: <FaStar />, label: 'Difficulty', value: difficultyText },
        ];
    } else {
        features = config[normalizedType] || config.cars;
    }

    return (
        <div className={`recommendation-features ${classes}`}>
            {features.map((feature, index) => (
                <div key={index}>
                    {withoutLocation && feature.label === "Location" ? (
                        <></>
                    ) : (
                        <div className="recommendation-features__item">
                            <span>{feature.icon}</span>
                            <span>{typeof feature.value === 'object' ? feature.value?.label || feature.value?.option || '' : feature.value}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ListingIcons;
