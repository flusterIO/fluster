import { useLocation } from "react-router";

export const useNavigateToId = (id: string) => {
    const location = useLocation();

    return {
        navigate: () => `${location}#${id}`,
    };
};
