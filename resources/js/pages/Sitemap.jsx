import React, { useEffect, useMemo, useState } from "react";
import Footer from "../components/site/Footer";
import FreeTexts from "../components/site/FreeTexts";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { FaHome, FaArrowRight } from "react-icons/fa";
import { getLocalizedUrl } from "../utils/localeManager";

const Hero = () => {
    const { t } = useTranslation();
    return (
        <div className="sitemap-hero">
            <div className="hero-content">
                <div className="container">
                    <div className="hero-text-content">
                        <div className="hero-nav-path">
                            <div className="nav-path-container">
                                <a href={getLocalizedUrl('/')} title={t('common.home', 'Home')} className="nav-home-link"><FaHome size={14} /></a>
                                <span className="nav-path-arrow">›</span>
                                <span className="nav-current-page">{t('sitemap.breadcrumb', 'Sitemap')}</span>
                            </div>
                        </div>
                        <h1 className="hero-title">{t('sitemap.title', 'Sitemap')}</h1>
                        <p className="hero-subtitle">{t('sitemap.subtitle', 'Navigate MarHire pages and resources in one place.')}</p>
                    </div>
                </div>
            </div>
            <style>{`
                .sitemap-hero { position: relative; padding: 48px 0; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); background: #f6faf8; }
                .hero-content { position: relative; z-index: 3; width: 100%; display: flex; justify-content: center; color: #203233; }
                .hero-text-content { display: flex; flex-direction: column; align-items: center; max-width: 900px; margin: 0 auto; padding: 0 20px; width: 100%; }
                .hero-nav-path { margin-bottom: 12px; }
                .nav-path-container { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #627577; }
                .nav-home-link { text-decoration: none; color: #627577; }
                .nav-path-arrow { color: #627577; font-size: 12px; }
                .nav-current-page { color: #203233; font-size: 13px; }
                .hero-title { font-size: 2.2rem; font-weight: 800; margin-bottom: 0.5rem; line-height: 1.2; text-align: center; }
                .hero-subtitle { font-size: 1.05rem; font-weight: 400; margin-bottom: 0; line-height: 1.6; max-width: 800px; text-align: center; color: #495b5d; }
                @media (min-width: 768px) { .hero-title { font-size: 2.6rem; } }
            `}</style>
        </div>
    );
};

const Section = ({ title, children }) => (
    <section className="sitemap-section">
        <h2 className="section-title">{title}</h2>
        {children}
        <style>{`
            .sitemap-section { padding-top: 24px; }
            .section-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 16px; }
        `}</style>
    </section>
);

const LinkGrid = ({ items }) => (
    <ul className="grid">
        {items.map((l) => (
            <li key={l.href} title={l.title}>
                <a href={l.href} className="link">
                    <FaArrowRight size={12} className="arrow" />
                    <span className="label">{l.title}</span>
                </a>
            </li>
        ))}
        <style>{`
            .grid { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 8px 16px; }
            @media (min-width: 640px){ .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }}
            @media (min-width: 768px){ .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }}
            @media (min-width: 1024px){ .grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }}
            .link { display:flex; align-items:center; gap:8px; color:#5f6b6d; text-decoration:none; padding:8px 6px; border-radius:10px; }
            .link:hover { color:#048667; background:#f2faf8; }
            .arrow { color:#048667; }
            .label { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        `}</style>
    </ul>
);

// Helper to safely read translated fields from API objects
const getTranslatedField = (item, field, locale) => {
    const block = item?.translated_fields?.[field];
    if (block) {
        if (typeof block === 'string') return block;
        if (block[locale]) return block[locale];
        if (block['en']) return block['en'];
    }
    return item?.[field] || '';
};

const Sitemap = () => {
    const { t, i18n } = useTranslation();
    const mainPages = useMemo(() => ([
        { href: getLocalizedUrl('/'), title: t('sitemap.main.home', 'Homepage') },
        { href: getLocalizedUrl('/about-us'), title: t('sitemap.main.about', 'About Us') },
        { href: getLocalizedUrl('/support'), title: t('sitemap.main.support', 'Support & Help Center') },
        { href: getLocalizedUrl('/list-your-property'), title: t('sitemap.main.partner', 'Become a Partner') },
        { href: getLocalizedUrl('/partners'), title: t('sitemap.main.ourPartners', 'Our Partners') },
        { href: getLocalizedUrl('/faq'), title: t('sitemap.main.faq', 'Frequently Asked Questions') },
        { href: getLocalizedUrl('/blog'), title: t('sitemap.main.blog', 'Travel Blog') },
        { href: getLocalizedUrl('/car-search'), title: t('sitemap.main.search', 'Search All Listings') },
    ]), [t, i18n.language]);

    const categoryPages = useMemo(() => ([
        { href: getLocalizedUrl('/car-search'), title: t('sitemap.categories.cars', 'Car Rentals') },
        { href: getLocalizedUrl('/private-search'), title: t('sitemap.categories.drivers', 'Private Drivers') },
        { href: getLocalizedUrl('/boat-search'), title: t('sitemap.categories.boats', 'Boat Rentals') },
        { href: getLocalizedUrl('/thingstodo-search'), title: t('sitemap.categories.activities', 'Activities & Tours') },
    ]), [t, i18n.language]);

    const cities = [
        { slug: 'agadir', name: t('cities.agadir', 'Agadir') },
        { slug: 'marrakech', name: t('cities.marrakech', 'Marrakech') },
        { slug: 'casablanca', name: t('cities.casablanca', 'Casablanca') },
        { slug: 'fes', name: t('cities.fes', 'Fes') },
        { slug: 'tangier', name: t('cities.tangier', 'Tangier') },
        { slug: 'essaouira', name: t('cities.essaouira', 'Essaouira') },
        { slug: 'rabat', name: t('cities.rabat', 'Rabat') },
    ];

    const cityPages = useMemo(() => cities.map(c => ({ href: getLocalizedUrl(`/city/${c.slug}`), title: c.name })), [i18n.language]);

    const categoryCityLinks = useMemo(() => {
        const categories = [
            { key: 'car-search', title: t('sitemap.categories.cars', 'Car Rentals') },
            { key: 'private-search', title: t('sitemap.categories.drivers', 'Private Drivers') },
            { key: 'boat-search', title: t('sitemap.categories.boats', 'Boat Rentals') },
            { key: 'thingstodo-search', title: t('sitemap.categories.activities', 'Activities & Tours') },
        ];
        const items = [];
        for (const cat of categories) {
            for (const city of cities) {
                items.push({ href: getLocalizedUrl(`/${cat.key}?location=${city.slug}`), title: `${cat.title} — ${city.name}` });
            }
        }
        return items;
    }, [i18n.language]);

    const [articles, setArticles] = useState([]);
    const [partners, setPartners] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    useEffect(() => {
        axios.get('/api/get_articles_api', { params: { locale: i18n.language } }).then(r => setArticles(r.data.articles || [])).catch(() => setArticles([]));
        axios.get('/api/get_active_agencies').then(r => setPartners(r.data.agencies || [])).catch(() => setPartners([]));
        axios.get('/api/get_subcategories_api').then(r => setSubcategories(r.data.subcategories || [])).catch(() => setSubcategories([]));
    }, [i18n.language]);

    const articleLinks = useMemo(() => (articles || []).map(a => ({ href: getLocalizedUrl(`/article/${a.slug}`), title: getTranslatedField(a, 'title', i18n.language) || 'Article' })), [articles, i18n.language]);
    const partnerLinks = useMemo(() => (partners || []).map(p => ({ href: getLocalizedUrl(`/agency/${p.slug}`), title: `${p.agency_name}${p.city?.city_name ? ' (' + p.city.city_name + ')' : ''}` })), [partners, i18n.language]);
    
    const subcategoryLinks = useMemo(() => (subcategories || []).map(s => {
        // Map category IDs to slugs (matching existing route logic)
        const categorySlugMap = {
            2: 'car-rental',
            3: 'private-driver', 
            4: 'boat-rental',
            5: 'things-to-do'
        };
        
        const categorySlug = categorySlugMap[s.category_id] || s.category?.toLowerCase().replace(/\s+/g, '-') || 'category';
        const optionSlug = s.option?.toLowerCase().replace(/\s+/g, '-') || 'option';
        return {
            href: getLocalizedUrl(`/category/${categorySlug}/subcategory/${optionSlug}`), 
            title: `${s.option} (${s.category || ''})`
        };
    }), [subcategories, i18n.language]);
    
    const subcategoryCityLinks = useMemo(() => {
        const links = [];
        // Map category IDs to slugs (matching existing route logic)
        const categorySlugMap = {
            2: 'car-rental',
            3: 'private-driver', 
            4: 'boat-rental',
            5: 'things-to-do'
        };
        
        for (const subcat of (subcategories || [])) {
            for (const city of cities) {
                const categorySlug = categorySlugMap[subcat.category_id] || subcat.category?.toLowerCase().replace(/\s+/g, '-') || 'category';
                const optionSlug = subcat.option?.toLowerCase().replace(/\s+/g, '-') || 'option';
                links.push({
                    href: getLocalizedUrl(`/category/${categorySlug}/subcategory/${optionSlug}/city/${city.slug}`),
                    title: `${subcat.option} — ${city.name} (${subcat.category || ''})`
                });
            }
        }
        return links;
    }, [subcategories, i18n.language]);

    const legalPages = useMemo(() => ([
        { href: getLocalizedUrl('/terms-conditions'), title: t('sitemap.legal.terms', 'Terms & Conditions') },
        { href: getLocalizedUrl('/privacy-policy'), title: t('sitemap.legal.privacy', 'Privacy Policy') },
        { href: getLocalizedUrl('/cookie-policy'), title: t('sitemap.legal.cookies', 'Cookie Policy') },
        { href: getLocalizedUrl('/cancellation-policy'), title: t('sitemap.legal.cancellation', 'Cancellation Policy') },
        { href: getLocalizedUrl('/insurance-conditions'), title: t('sitemap.legal.insurance', 'Insurance Conditions') },
    ]), [t, i18n.language]);

    return (
        <>
            <Hero />
            <div className="container mx-auto px-4 py-10">
                <Section title={t('sitemap.sections.main', 'Main Pages')}>
                    <LinkGrid items={mainPages} />
                </Section>
                <Section title={t('sitemap.sections.categories', 'Category Pages')}>
                    <LinkGrid items={categoryPages} />
                </Section>
                {subcategoryLinks.length > 0 && (
                    <Section title={t('sitemap.sections.subcategories', 'Browse by Subcategory')}>
                        <LinkGrid items={subcategoryLinks} />
                    </Section>
                )}
                <Section title={t('sitemap.sections.cities', 'City Guides')}>
                    <LinkGrid items={cityPages} />
                </Section>
                <Section title={t('sitemap.sections.catCity', 'Search by Category & City')}>
                    <LinkGrid items={categoryCityLinks} />
                </Section>
                {subcategoryCityLinks.length > 0 && (
                    <Section title={t('sitemap.sections.subcatCity', 'Search by Subcategory & City')}>
                        <LinkGrid items={subcategoryCityLinks} />
                    </Section>
                )}
                {articleLinks.length > 0 && (
                    <Section title={t('sitemap.sections.articles', 'Blog Articles')}>
                        <LinkGrid items={articleLinks} />
                    </Section>
                )}
                {partnerLinks.length > 0 && (
                    <Section title={t('sitemap.sections.partners', 'Our Partners')}>
                        <LinkGrid items={partnerLinks} />
                    </Section>
                )}
                <Section title={t('sitemap.sections.legal', 'Legal')}>
                    <LinkGrid items={legalPages} />
                </Section>
            </div>
            <FreeTexts slug="sitemap" />
            <Footer />
        </>
    );
};

export default Sitemap;


