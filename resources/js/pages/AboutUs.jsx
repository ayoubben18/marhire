import StoryVision from "../components/site/StoryVision";
import React from "react";
import WhyChooseUs from "../components/site/WhyChooseUs";
import OurServices from "../components/site/OurServices";
import SafetyTrust from "../components/site/SafetyTrust";
import ExploreCategory from "../components/site/ExploreCategory";
import ContactUsBox from "../components/site/ContactUsBox";
import Footer from "../components/site/Footer";
import FreeTexts from "../components/site/FreeTexts";
import HeroSectionAbout from "../components/site/HeroSectionAbout";
import { useTranslation } from "react-i18next";
import JourneyTimeline from "../components/site/JourneyTimeline";
import ResourcesSection from "../components/site/ResourcesSection";

const AboutUs = () => {
    const { t } = useTranslation();

    const features = [
        {
            icon: "https://marhire.bytech.ma/images/icons/icon2.webp",
            title: t('features.verifiedPartners', 'Verified Local Partners'),
            desc: t('aboutPage.features.verifiedDesc', 'All agencies are screened and approved.'),
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon10.webp",
            title: t('features.transparentPricing', 'Transparent Pricing'),
            desc: t('aboutPage.features.transparentDesc', 'No hidden fees, clear policies.'),
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon5.webp",
            title: t('features.multilingualSupport', 'Multilingual Support'),
            desc: t('aboutPage.features.multilingualDesc', 'English, French, Arabic service.'),
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon3.webp",
            title: t('features.digitalExperience', 'Full Digital Experience'),
            desc: t('aboutPage.features.digitalDesc', 'Book online in minutes.'),
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon1.svg",
            title: t('aboutPage.features.noDeposit', 'No Deposit on Most Rentals'),
            desc: t('aboutPage.features.noDepositDesc', 'Especially for economy vehicles.'),
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon9.webp",
            title: t('aboutPage.features.allInOne', 'All-in-One Platform'),
            desc: t('aboutPage.features.allInOneDesc', 'Cars, drivers, boats, tours & more.'),
        },
    ];

    return (
        <div className="page-aboutus">
            <HeroSectionAbout />
            <StoryVision imageSrc="/images/about-us/our-story.jpg" imageAlt={t('aboutPage.story.title', 'Our Story & Vision')} />
            <JourneyTimeline />
            <WhyChooseUs
                title={t('aboutPage.why.title', 'Why Choose MarHire?')}
                subtitle=""
                features={features}
            />
            <OurServices />
            <SafetyTrust />
            <ExploreCategory
                title={t('aboutPage.where.title', 'Where We Operate')}
                subtitle={""}
                centered={true}
                items={[
                    { name: t('cities.agadir'), slug: 'agadir', image: '/images/cities/agadir.jpg', listings: 40 },
                    { name: t('cities.marrakech'), slug: 'marrakech', image: '/images/cities/marrakech.jpg', listings: 40 },
                    { name: t('cities.casablanca'), slug: 'casablanca', image: '/images/cities/casablanca.jpg', listings: 40 },
                    { name: t('cities.fes'), slug: 'fes', image: '/images/cities/fez.jpg', listings: 40 },
                    { name: t('cities.tangier'), slug: 'tangier', image: '/images/cities/tangier.jpg', listings: 40 },
                ]}
            />
            <ContactUsBox />
            <ResourcesSection />
            <FreeTexts slug="about-us" />
            <Footer />
        </div>
    );
};

export default AboutUs;
