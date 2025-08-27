import React, { useState } from "react";
import UnifiedListings from "./UnifiedListings";
import { useTranslation } from "react-i18next";

/**
 * TestUnifiedListings Component
 * 
 * Test component to demonstrate and test the UnifiedListings component
 * with various filter combinations.
 */
const TestUnifiedListings = () => {
    const { t } = useTranslation();
    const [testScenario, setTestScenario] = useState('cars');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    // Test scenarios with different filter combinations
    const testScenarios = {
        cars: {
            name: "Car Rentals in Agadir",
            props: {
                categories: 2, // Car rental category
                cities: "Agadir",
                perPage: 5,
                autoLoad: false
            }
        },
        drivers: {
            name: "Private Drivers (Multiple Cities)",
            props: {
                categories: 3, // Private driver category
                cities: ["Marrakech", "Casablanca"],
                perPage: 4,
                autoLoad: false
            }
        },
        boats: {
            name: "Boat Rentals (All Cities)",
            props: {
                categories: 4, // Boat rental category
                perPage: 6,
                autoLoad: false
            }
        },
        activities: {
            name: "Activities in Tangier",
            props: {
                categories: 5, // Activities category
                cities: "Tangier",
                perPage: 3,
                autoLoad: false
            }
        },
        multiCategory: {
            name: "Cars & Drivers (Mixed)",
            props: {
                categories: [2, 3], // Multiple categories
                cities: "Agadir",
                perPage: 8,
                autoLoad: false
            }
        },
        withAgencies: {
            name: "Specific Agency Listings",
            props: {
                agencies: [1, 2], // Replace with actual agency IDs
                perPage: 10,
                autoLoad: false
            }
        },
        withSubcategories: {
            name: "SUV Cars Only",
            props: {
                categories: 2,
                subcategories: [1], // Replace with actual SUV subcategory ID
                cities: "Marrakech",
                perPage: 4,
                autoLoad: false
            }
        },
        allCategories: {
            name: "All Listings in Casablanca",
            props: {
                cities: "Casablanca",
                perPage: 12,
                autoLoad: false
            }
        }
    };

    // Handle test execution
    const runTest = async (scenarioKey) => {
        setTestScenario(scenarioKey);
        setLoading(true);
        setResults(null);

        const scenario = testScenarios[scenarioKey];
        
        // Create a temporary instance to fetch data
        const testProps = {
            ...scenario.props,
            onDataLoaded: (data) => {
                setResults(data);
                setLoading(false);
                console.log(`Test "${scenario.name}" Results:`, data);
            },
            onError: (error) => {
                console.error(`Test "${scenario.name}" Error:`, error);
                setResults({ error: error.message });
                setLoading(false);
            }
        };

        // We'll render the component temporarily to trigger the fetch
        const listingsData = UnifiedListings(testProps);
        await listingsData.reload();
    };

    // Format listing data for display
    const formatListing = (listing, listingsHelper) => {
        const type = listingsHelper.getListingType(listing.category_id);
        const title = listingsHelper.getTranslatedField(listing, 'title');
        
        let priceInfo = '';
        switch(type) {
            case 'car':
                priceInfo = listing.price_per_day ? `${listing.price_per_day}€/day` : 'No price';
                break;
            case 'driver':
                if (listing.pricings && listing.pricings.length > 0) {
                    priceInfo = listing.pricings[0].airport_one ? 
                        `${listing.pricings[0].airport_one}€ (Airport)` : 
                        `${listing.price_per_hour || 0}€/hour`;
                }
                break;
            case 'boat':
                priceInfo = listing.price_per_hour ? `${listing.price_per_hour}€/hour` : 'No price';
                break;
            case 'activity':
                if (listing.act_pricings && listing.act_pricings.length > 0) {
                    priceInfo = `${listing.act_pricings[0].price || 0}€/person`;
                } else {
                    priceInfo = listing.price_per_person ? `${listing.price_per_person}€/person` : 'No price';
                }
                break;
        }

        return {
            id: listing.id,
            type,
            title: title || listing.title,
            city: listing.city?.city_name || 'Unknown',
            agency: listing.provider?.agency_name || 'No agency',
            price: priceInfo,
            galleries: listing.galleries?.length || 0
        };
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>UnifiedListings Component Test</h1>
            
            {/* Test Scenario Buttons */}
            <div style={{ marginBottom: '20px' }}>
                <h3>Select Test Scenario:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {Object.entries(testScenarios).map(([key, scenario]) => (
                        <button
                            key={key}
                            onClick={() => runTest(key)}
                            disabled={loading}
                            style={{
                                padding: '10px 15px',
                                backgroundColor: testScenario === key ? '#048667' : '#f0f0f0',
                                color: testScenario === key ? 'white' : 'black',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.6 : 1
                            }}
                        >
                            {scenario.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div style={{ padding: '20px', backgroundColor: '#fffbeb', border: '1px solid #fbbf24', borderRadius: '5px' }}>
                    <p>Loading listings...</p>
                </div>
            )}

            {/* Results Display */}
            {results && !loading && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Results for: {testScenarios[testScenario].name}</h3>
                    
                    {/* Error Display */}
                    {results.error ? (
                        <div style={{ padding: '20px', backgroundColor: '#fee2e2', border: '1px solid #ef4444', borderRadius: '5px' }}>
                            <p style={{ color: '#dc2626' }}>Error: {results.error}</p>
                        </div>
                    ) : (
                        <>
                            {/* Pagination Info */}
                            <div style={{ padding: '10px', backgroundColor: '#f0f9ff', border: '1px solid #0284c7', borderRadius: '5px', marginBottom: '10px' }}>
                                <p>
                                    <strong>Pagination:</strong> Page {results.pagination.currentPage} of {results.pagination.lastPage} | 
                                    Total: {results.pagination.total} listings | 
                                    Per Page: {results.pagination.perPage} | 
                                    Has More: {results.pagination.hasMore ? 'Yes' : 'No'}
                                </p>
                            </div>

                            {/* Listings Table */}
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f5f5f5' }}>
                                            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                                            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Type</th>
                                            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Title</th>
                                            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>City</th>
                                            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Agency</th>
                                            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Price</th>
                                            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Images</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.listings.length > 0 ? (
                                            results.listings.map((listing) => {
                                                const formatted = formatListing(listing, {
                                                    getListingType: (catId) => {
                                                        const id = parseInt(catId);
                                                        switch(id) {
                                                            case 2: return 'car';
                                                            case 3: return 'driver';
                                                            case 4: return 'boat';
                                                            case 5: return 'activity';
                                                            default: return 'unknown';
                                                        }
                                                    },
                                                    getTranslatedField: (lst, field) => {
                                                        if (lst.translated_fields && lst.translated_fields[field]) {
                                                            return lst.translated_fields[field]['en'] || lst[field];
                                                        }
                                                        return lst[field];
                                                    }
                                                });
                                                
                                                return (
                                                    <tr key={listing.id}>
                                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{formatted.id}</td>
                                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                                            <span style={{
                                                                padding: '2px 8px',
                                                                backgroundColor: formatted.type === 'car' ? '#dbeafe' :
                                                                               formatted.type === 'driver' ? '#dcfce7' :
                                                                               formatted.type === 'boat' ? '#fef3c7' :
                                                                               formatted.type === 'activity' ? '#fce7f3' : '#f3f4f6',
                                                                borderRadius: '4px',
                                                                fontSize: '12px'
                                                            }}>
                                                                {formatted.type}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{formatted.title}</td>
                                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{formatted.city}</td>
                                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{formatted.agency}</td>
                                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{formatted.price}</td>
                                                        <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{formatted.galleries}</td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="7" style={{ padding: '20px', textAlign: 'center', border: '1px solid #ddd' }}>
                                                    No listings found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Raw Data Preview */}
                            <details style={{ marginTop: '20px' }}>
                                <summary style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                                    View Raw Data (First Listing)
                                </summary>
                                {results.listings.length > 0 && (
                                    <pre style={{ 
                                        padding: '10px', 
                                        backgroundColor: '#f9f9f9', 
                                        border: '1px solid #ddd', 
                                        borderRadius: '5px',
                                        overflow: 'auto',
                                        marginTop: '10px'
                                    }}>
                                        {JSON.stringify(results.listings[0], null, 2)}
                                    </pre>
                                )}
                            </details>
                        </>
                    )}
                </div>
            )}

            {/* Usage Instructions */}
            <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '5px' }}>
                <h3>How to Use UnifiedListings Component:</h3>
                <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`import UnifiedListings from "./UnifiedListings";

// Example 1: Use as a hook
const MyComponent = () => {
    const listings = UnifiedListings({
        categories: 2,        // Single category or array [2, 3]
        cities: "Agadir",    // Single city or array ["Agadir", "Marrakech"]
        agencies: [1, 2],    // Array of agency IDs
        subcategories: [1],  // Array of subcategory IDs
        perPage: 10,
        page: 1,
        onDataLoaded: (data) => {
            console.log('Listings loaded:', data.listings);
            console.log('Pagination:', data.pagination);
        },
        onError: (error) => {
            console.error('Error:', error);
        }
    });

    // Access the data and methods
    const { listings, loading, error, pagination, reload } = listings;
    
    // Manually reload data
    const handleRefresh = () => {
        listings.reload();
    };
};`}
                </pre>
            </div>
        </div>
    );
};

export default TestUnifiedListings;