import axios from "axios";
import { FeaturePage } from "..";

export const fetchFeaturePage = async (currentPage: number, magType: string) => {
    let url;

    if(magType !== "") {
        url = `http://localhost:8080/api/v1/features/all?page=${currentPage}&mag_type=${magType}`;
    } else {
        url = `http://localhost:8080/api/v1/features/all?page=${currentPage}`;
    }

    const { data } = await axios.get<FeaturePage>(url);
    return data;
}