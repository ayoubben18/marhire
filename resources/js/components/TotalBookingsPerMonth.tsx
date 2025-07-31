"use client";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import axios from "axios";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "./ui/chart";
import { Category } from "@mui/icons-material";

const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");
axios.defaults.withCredentials = true;
axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

const chartConfig = {
    total: {
        label: "Total",
        color: "#28a745",
    },
} satisfies ChartConfig;

type Category = {
    id: number;
    category: string;
};

type City = {
    id: number;
    city_name: string;
};

type Agency = {
    id: number;
    agency_name: string;
};

export default function TotalBookingsPerMonth() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        filter_type: "per_month",
        filter_category: "all",
        filter_city: "all",
        filter_status: "all",
        filter_agency: "all",
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [agencies, setAgencies] = useState<Agency[]>([]);

    const fetchFilters = async () => {
        try {
            const response = await axios.post("/api/get-filters");
            setCategories(response.data.categories);
            setCities(response.data.cities);
            setAgencies(response.data.agencies);
        } catch (err) {}
    };

    const fetchData = async () => {
        try {
            const response = await axios.post("/api/bookings-per-month", filters);
            console.log(response);
            setData(response.data);
        } catch (err) {}
    };

    useEffect(() => {
        fetchFilters();
        fetchData();
    }, []);

    useEffect(() => {
        console.log(filters);
        fetchData();
    }, [filters]);

    return (
        <>
            <div className="card-filter">
                <select
                    className="form-control"
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            filter_type: e.target.value,
                        }))
                    }
                >
                    <option value="per_month">Per Month</option>
                    <option value="per_category">Per Category</option>
                    <option value="per_city">Per City</option>
                </select>
                <select
                    className="form-control"
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            filter_category: e.target.value,
                        }))
                    }
                >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.category}
                        </option>
                    ))}
                </select>

                <select
                    className="form-control"
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            filter_city: e.target.value,
                        }))
                    }
                >
                    <option value="all">All Cities</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.city_name}
                        </option>
                    ))}
                </select>

                <select
                    className="form-control"
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            filter_agency: e.target.value,
                        }))
                    }
                >
                    <option value="all">All Agencies</option>
                    {agencies.map((agency) => (
                        <option key={agency.id} value={agency.id}>
                            {agency.agency_name}
                        </option>
                    ))}
                </select>

                <select
                    className="form-control"
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            filter_status: e.target.value,
                        }))
                    }
                >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <ChartContainer
                config={chartConfig}
                style={{ height: "90%", width: "100%" }}
            >
                <BarChart accessibilityLayer data={data}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="label"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 12)}
                    />
                    <ChartTooltip
                    content={
                        <ChartTooltipContent
                            className="w-[150px]"
                            nameKey="total"
                        />
                    }
                />
                    {/* <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dashed" />}
                    /> */}

                    <Bar dataKey="total" fill="#28a745" radius={4} />
                </BarChart>
            </ChartContainer>
        </>
    );
}
