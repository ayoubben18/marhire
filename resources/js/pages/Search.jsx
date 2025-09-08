import CarRentalForm from "../components/site/CarRentalForm";
import Footer from "../components/site/Footer";
import FreeTexts from "../components/site/FreeTexts";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PrivateDriverForm from "../components/site/PrivateDriverForm";
import ThingsToDoForm from "../components/site/ThingsToDoForm";
import SearchBoatForm from "../components/site/SearchBoatFrm";
import SearchFilter from "../components/site/SearchFilter";
import SearchItem from "../components/site/SearchItem";
import ProgressBar from "../components/site/ProgressBar";
import axios from "axios";
import BoatForm from "../components/site/BoatForm";
import { useMediaQuery } from "react-responsive";
import { IoFilter } from "react-icons/io5";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const FILTER_FIELDS = {
    car: [
        "pickup",
        "dropoff",
        "pickup_date",
        "dropoff_date",
        "pickup_time",
        "dropoff_time",
    ],
    private: [
        "pickup",
        "dropoff",
        "pickup_date",
        "dropoff_date",
        "pickup_time",
        "dropoff_time",
        "persons",
    ],
    boat: ["destination", "boat_type", "start_date", "end_date"],
    activity: ["destination", "start_date", "end_date"],
};

const renderSkeletonItems = (count = 4) => (
    <div className="search__loading__items">
        {Array(count)
            .fill(0)
            .map((_, index) => (
                <div className="search__loading__item" key={index}>
                    <div>
                        <Skeleton height={110} width={130} />
                    </div>
                    <div>
                        <Skeleton height={16} width={200} />
                        <Skeleton height={16} width={80} />
                    </div>
                </div>
            ))}
    </div>
);

const Search = ({ type }) => {
    // Get current locale from URL path or localStorage as fallback
    const pathMatch = window.location.pathname.match(/^\/([a-z]{2})(?:\/|$)/);
    const currentLocale = pathMatch ? pathMatch[1] : (localStorage.getItem('i18nextLng') || 'en');
    
    const searchComps = {
        car: { searchComp: <CarRentalForm /> },
        private: { searchComp: <PrivateDriverForm /> },
        boat: { searchComp: <BoatForm /> },
        activity: { searchComp: <ThingsToDoForm /> },
    };
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [filterLoading, setFilterLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [sortBy, setSortBy] = useState("Default");
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 900 });

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    // Handle sort change
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setCurrentPage(1);
    };

    const getFiltersForType = (type) => {
        const keys = FILTER_FIELDS[type] || [];
        const params = new URLSearchParams(window.location.search);
        const obj = {};
        keys.forEach((key) => {
            const value = params.get(key);
            if (value) obj[key] = value;
        });
        
        // For boat category, if no URL parameters exist, ensure the search still works
        // by not requiring specific destination or boat_type filters
        if (type === 'boat' && Object.keys(obj).length === 0) {
            // Don't add any filters, let the API return all boat listings
            return obj;
        }
        
        return obj;
    };

    const fetchResults = async () => {
        try {
            const params = getFiltersForType(type);
            const response = await axios.get("/api/get_search_results", {
                params: {
                    type,
                    page: currentPage,
                    sortBy,
                    locale: currentLocale,
                    ...params,
                    ...filters,
                },
            });

            setResults(response.data.results);
            setHasMore(response.data.hasMore);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setFilterLoading(false);
        }
    };

    const loadMore = async () => {
        setLoadingMore(true);

        try {
            const params = getFiltersForType(type);
            const response = await axios.get("/api/get_search_results", {
                params: {
                    type,
                    page: currentPage + 1,
                    sortBy,
                    locale: currentLocale,
                    ...params,
                    ...filters,
                },
            });

            setResults((prev) => [...prev, ...response.data.results]);
            setHasMore(response.data.hasMore);
            setCurrentPage((prev) => prev + 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchResults();
        }, 1500);
    }, []);

    useEffect(() => {
        setFilterLoading(true);

        setTimeout(() => {
            fetchResults();
        }, 1000);
    }, [filters, sortBy]);

    return (
        <>
            <div className="search__container">
                {searchComps[type]?.searchComp}
            </div>
            {loading ? (
                <>
                    <div className="loading mx-0">
                        <ProgressBar />
                    </div>
                    <div className="search__content loading">
                        <div className="search__content__loading__left">
                            <Skeleton height={16} width={200} />
                            <Skeleton height={16} width={80} />
                        </div>
                        <div className="search__content__loading__right">
                            <h1>
                                We compare prices from top rental companies to
                                bring you the best deals
                            </h1>
                            {renderSkeletonItems(4)}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="search__content">
                        {!isMobile && (
                            <SearchFilter
                                category={type}
                                filters={filters}
                                onChange={handleFilterChange}
                            />
                        )}
                        <div className="search__results">
                            {isMobile && (
                                <div className="mb-4">
                                    <button
                                        onClick={() =>
                                            setShowMobileFilters(true)
                                        }
                                        className="search-filter-btn py-2 w-full font-medium"
                                    >
                                        <IoFilter /> Filter
                                    </button>
                                </div>
                            )}
                            {!isMobile && (
                                <div className="search__sortby">
                                    <FormControl
                                        sx={{ minWidth: 180 }}
                                        size="small"
                                    >
                                        <InputLabel id="sort-by-label">
                                            Sort By
                                        </InputLabel>
                                        <Select
                                            labelId="sort-by-label"
                                            id="sort-by"
                                            value={sortBy}
                                            label="Sort By"
                                            onChange={handleSortChange}
                                        >
                                            <MenuItem value="Default">
                                                Default
                                            </MenuItem>
                                            <MenuItem value="Price: low to high">
                                                Price: low to high
                                            </MenuItem>
                                            <MenuItem value="Price: high to low">
                                                Price: high to low
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            )}
                            {filterLoading ? (
                                renderSkeletonItems(4)
                            ) : (
                                <>
                                    {results.map((listing) => (
                                        <SearchItem
                                            item={listing}
                                            type={type}
                                            key={listing.id}
                                        />
                                    ))}
                                    {loadingMore && renderSkeletonItems(2)}
                                    {hasMore && !loadingMore && (
                                        <div className="load-more__sect">
                                            <button
                                                className="load-more"
                                                onClick={loadMore}
                                            >
                                                Load More
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    {isMobile && showMobileFilters && (
                        <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto flex flex-col">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h2 className="text-lg font-semibold">
                                    Filters
                                </h2>
                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="text-sm text-gray-600"
                                >
                                    ✖ Close
                                </button>
                            </div>

                            <div className="p-4 flex-1 overflow-y-auto">
                                <SearchFilter
                                    category={type}
                                    filters={filters}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div className="p-4 border-t">
                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}
                    <FreeTexts slug="search" />
                    <Footer />
                </>
            )}
        </>
    );
};

export default Search;
