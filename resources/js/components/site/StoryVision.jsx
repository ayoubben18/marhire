import { useTranslation } from "react-i18next";

const StoryVision = ({ imageSrc = null, imageAlt = "" }) => {
  const { t } = useTranslation();

  return (
    <section className="story-vision two-column">
      <div className="content">
        <h2 className="sect-subtitle">{t('aboutPage.story.title', 'Our Story & Vision')}</h2>
        <p>
          {t('aboutPage.story.lead', 'MarHire was founded by two engineers with a passion for travel who saw how hard it was to plan Morocco the right way: scattered providers, hidden fees, and uneven quality. We built MarHire to fix that — one reliable place to book trusted local services at fair prices, with clear policies and real human support.')}
        </p>
        <p>{t('aboutPage.story.visionLead', 'Their vision was simple yet powerful:')}</p>
        <blockquote>
          {t('aboutPage.story.quote', "Morocco's best local experiences should be easily accessible to everyone without middlemen, confusion, or guesswork.")}
        </blockquote>
        <p>
          {t('aboutPage.story.details', 'That vision guides everything we do. We verify every partner, standardize policies, and surface real availability across cars, private drivers, boats, and activities so you can compare options, book in minutes, and focus on your trip. Many rentals require no deposit, pricing is transparent, and support is multilingual (English/French/Arabic) and truly 24/7 via WhatsApp, phone, or email.')}
        </p>
      </div>
      <div className={`image${imageSrc ? '' : ' empty'}`}>
        {imageSrc ? (
          <img src={imageSrc} alt={imageAlt} />
        ) : (
          <div className="placeholder" aria-hidden="true"></div>
        )}
      </div>
      <style>{`
        .story-vision.two-column { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: start; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); padding: 56px 20px; background: #ffffff; }
        .story-vision .content { max-width: 760px; margin: 0 auto; }
        .story-vision .sect-subtitle { font-size: 28px; font-weight: 800; color: #0f1f1b; margin: 0 0 12px 0; }
        .story-vision blockquote { border-left: 3px solid #048667; margin: 16px 0; padding: 10px 14px; color: #0f1f1b; font-weight: 600; background: #f6fbf9; border-radius: 6px; }
        .story-vision p { color: #4a5568; line-height: 1.8; margin: 10px 0; }
        .story-vision .image { display: flex; align-items: center; justify-content: center; }
        .story-vision .image img { width: 100%; height: auto; border-radius: 12px; object-fit: cover; }
        .story-vision .image.empty { }
        .story-vision .image .placeholder { width: 100%; aspect-ratio: 3 / 2; background: #eef2f1; border: 2px dashed #cbd5d0; border-radius: 12px; }
        @media (max-width: 900px) { .story-vision.two-column { grid-template-columns: 1fr; padding: 46px 16px; } }
      `}</style>
    </section>
  );
}

export default StoryVision;