const SafetyTrust = () => {
    const policies = [
        "Centralized Booking & Support",
        "Verified & Trusted Agencies",
        "Refund and Cancellation Policies",
        "No Deposit Options",
        "24/7 WhatsApp Support",
    ];

    return (
        <section className="safety-section">
            <div className="container">
                <h2>
                    Our Safety & Trust
                    Policies
                </h2>
                <ul className="policies-list">
                    {policies.map((policy, index) => (
                        <li key={index}>{policy}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default SafetyTrust;
