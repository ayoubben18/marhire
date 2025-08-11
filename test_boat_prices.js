// Test boat pricing calculations
const testListing = {
    price_per_hour: 12,
    price_per_half_day: 34,
    price_per_day: 56
};

function calculateBoatPrice(hours, listing) {
    let price = 0;
    if (hours >= 0.5 && hours <= 1.5) {
        // 30min to 1.5 hours: price_per_hour * hours
        price = listing.price_per_hour * hours;
    } else if (hours >= 2 && hours <= 4) {
        // 2 to 4 hours: use flat half-day rate
        price = listing.price_per_half_day;
    } else if (hours >= 4.5 && hours <= 8) {
        // 4.5 to 8 hours: use flat full-day rate
        price = listing.price_per_day;
    } else {
        // Invalid duration - use hourly rate as fallback
        price = listing.price_per_hour * hours;
    }
    return Math.round(price * 100) / 100;
}

const testCases = [
    { duration: 0.5, expected: 6, description: "30 minutes (hourly rate)" },
    { duration: 1, expected: 12, description: "1 hour (hourly rate)" },
    { duration: 1.5, expected: 18, description: "1.5 hours (hourly rate)" },
    { duration: 2, expected: 34, description: "2 hours (half-day flat rate)" },
    { duration: 3, expected: 34, description: "3 hours (half-day flat rate)" },
    { duration: 4, expected: 34, description: "4 hours (half-day flat rate)" },
    { duration: 4.5, expected: 56, description: "4.5 hours (full-day flat rate)" },
    { duration: 5.5, expected: 56, description: "5.5 hours (full-day flat rate)" },
    { duration: 8, expected: 56, description: "8 hours (full-day flat rate)" }
];

console.log("Boat Pricing Test Results:");
console.log("==========================");

testCases.forEach(test => {
    const calculated = calculateBoatPrice(test.duration, testListing);
    const status = calculated === test.expected ? '✅' : '❌';
    console.log(`${status} ${test.duration}h: €${calculated} (expected €${test.expected}) - ${test.description}`);
});