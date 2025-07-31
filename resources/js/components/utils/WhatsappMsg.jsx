export default function getWtspUrl(listing) {
    const url = `https://marhire.bytech.ma/details/${listing.slug}`;
    const message = encodeURIComponent(
        `Hello,\nI am interested in booking this rental:\n\nTitle:${listing.title} \n\nURL: ${url}\n\nCould you please provide more details about availability, pricing, and the booking process?\n\nThank you!`
    );
    // For WhatsApp link:
    const whatsappLink = `https://wa.me/+212660745055?text=${message}`;

    return whatsappLink;
}
