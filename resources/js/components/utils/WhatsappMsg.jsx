export default function getWtspUrl(listing) {
    const url = `https://marhire.bytech.ma/details/${listing.slug}`;
    const message = encodeURIComponent(
        `Hi MarHire team,\n\nI'm interested in the following listing:\n\nListing Title: ${listing.title}\n\nListing Link: ${url}\n\nCould you please confirm availability, price, and provide any additional details?\n\n(Please do NOT modify this message)`
    );
    // For WhatsApp link:
    const whatsappLink = `https://wa.me/+212660745055?text=${message}`;

    return whatsappLink;
}
