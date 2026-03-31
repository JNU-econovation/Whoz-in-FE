
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { customFetch } from '../api/customFetch';

const AuthContext = createContext();
const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;
const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const getStoredMemberId = () => {
    const memberId = localStorage.getItem('member_id');
    if (!memberId || memberId === 'undefined' || !UUID_REGEX.test(memberId)) {
        localStorage.removeItem('member_id');
        return null;
    }
    return memberId;
};

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({
        memberId: getStoredMemberId(),
        loginid: '',
        name: '',
        generation: '',
        position: '',
    });
    const [isAuthInitialized, setIsAuthInitialized] = useState(false);

    const syncMemberId = useCallback((memberId) => {
        if (!memberId || !UUID_REGEX.test(memberId)) {
            localStorage.removeItem('member_id');
            setUserInfo((prev) => ({ ...prev, memberId: null }));
            return null;
        }

        localStorage.setItem('member_id', memberId);
        setUserInfo((prev) => ({ ...prev, memberId }));
        return memberId;
    }, []);

    const ensureCurrentMember = useCallback(async () => {
        const storedMemberId = getStoredMemberId();
        if (storedMemberId) {
            syncMemberId(storedMemberId);
            setIsAuthInitialized(true);
            return storedMemberId;
        }

        try {
            const response = await customFetch(`${BASE_URL}/api/v1/member`);
            const json = await response.json();
            const memberId = json?.data?.member_id ?? null;
            return syncMemberId(memberId);
        } finally {
            setIsAuthInitialized(true);
        }
    }, [syncMemberId]);

    const clearCurrentMember = useCallback(() => {
        localStorage.removeItem('member_id');
        setUserInfo((prev) => ({ ...prev, memberId: null }));
        setIsAuthInitialized(false);
    }, []);

    const value = useMemo(
        () => ({
            userInfo,
            setUserInfo,
            isAuthInitialized,
            ensureCurrentMember,
            syncMemberId,
            clearCurrentMember,
        }),
        [userInfo, isAuthInitialized, ensureCurrentMember, syncMemberId, clearCurrentMember]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
