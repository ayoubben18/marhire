import HeroSection2 from "../components/site/HeroSection2";
import Footer from "../components/site/Footer";

const partners = [
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
    {
        name: "Expedia",
        logo: "https://www.expedia.fr/_dms/header/logo.svg", // Placeholder, replace with your partner's real logo if available
        link: "#",
        description:
            "Reliable local delivery and logistics partner in Morocco.",
    },
   
];

const Partners = () => (
    <>
        <HeroSection2 bgImg="https://marhire.bytech.ma/images/banner2.png" />
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-4 text-center">
                Our Trusted Partners
            </h1>
            <p className="text-center mb-8 text-lg">
                MarHire partners with top local agencies and world brands to
                provide you with the best, most reliable travel experience in
                Morocco.
            </p>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-12">
                {partners.map((partner, i) => (
                    <a
                        key={i}
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-6 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition"
                    >
                        <img
                            src={partner.logo}
                            alt={partner.name}
                            className="mb-4 h-16 object-contain"
                            style={{ maxWidth: 120 }}
                            onError={(e) => {
                                e.target.src =
                                    "https://marhire.bytech.ma/images/partners/placeholder.png";
                            }}
                        />
                        <h2 className="text-xl font-semibold mb-2">
                            {partner.name}
                        </h2>
                        <p className="text-sm text-gray-600 text-center">
                            {partner.description}
                        </p>
                    </a>
                ))}
            </div>
            <div className="text-center my-10">
                <h2 className="text-lg font-semibold mb-2">
                    Become a MarHire Partner
                </h2>
                <p className="mb-4">
                    Are you a local agency, tour operator, or travel business in
                    Morocco? <br />
                    Join MarHire and reach thousands of international travelers.
                </p>
                <a
                    href="/list-your-property"
                    className="inline-block px-6 py-2 text-white rounded-full font-medium hover:bg-teal-700 transition btn-style1"
                >
                    Apply to Partner with Us
                </a>
            </div>
        </div>
        <Footer />
    </>
);

export default Partners;
