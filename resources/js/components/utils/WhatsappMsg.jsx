export default function getWtspUrl(listing) {
    const url = `https://marhire.com/details/${listing.slug}`;
    const message = encodeURIComponent(
        `Hi MarHire team,\nI'm interested in the following listing:\nListing Title: ${listing.title}\nListing Link: ${url}\nCould you please confirm availability, price, and provide any additional details?`
    );
    // For WhatsApp link:
    const whatsappLink = `https://wa.me/+212660745055?text=${message}`;

    return whatsappLink;
}
