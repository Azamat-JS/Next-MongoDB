
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/auth-store";

export default function AuthInitializer() {
    const fetchUser = useAuthStore((state) => state.fetchUser);

    useEffect(() => {
        void fetchUser();
    }, [fetchUser]);

    return null;
}
