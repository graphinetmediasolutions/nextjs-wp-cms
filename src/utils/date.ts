import { error } from "console";

export function formatDate(dateStr: string | null | undefined) {



    // validation 



    // error handled
    if (!dateStr || typeof dateStr !== 'string') {
        console.error("formatDate Error: Invalid date string →", dateStr);
        return {
            year: "",
            month: "",
            day: "",
            monthName: "",
            monthShort: "",
            monthPadded: "",
            dayPadded: "",
            formatted: "",
            iso: "",
            error: true
        };
    }

    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
        console.error("formatDate Error: Invalid date format →", dateStr);
        return {
            year: "",
            month: "",
            day: "",
            monthName: "",
            monthShort: "",
            monthPadded: "",
            dayPadded: "",
            formatted: "",
            iso: "",
            error: true
        };
    }
    // error handled end

    // --- Parsing ---
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // FIX: must add +1
    const day = date.getDate();

    const monthPadded = String(month).padStart(2, "0");
    const dayPadded = String(day).padStart(2, "0");

    const monthName = date.toLocaleString("en-US", { month: "long" });
    const monthShort = date.toLocaleString("en-US", { month: "short" });


    // --- Success return ---
    return {
        error: false,
        year,
        month,
        day,
        monthPadded,
        dayPadded,
        monthName,
        monthShort,
        formatted: `${dayPadded}-${monthPadded}-${year}`,
        iso: date.toISOString()
    };




}