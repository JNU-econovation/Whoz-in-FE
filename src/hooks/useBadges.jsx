import { useEffect, useState } from "react";
import { customFetch } from "../api/customFetch";

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL

export const useBadges = (memberId) => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        // 사용자 뱃지 목록 가져오기
        const memberResponse = await customFetch(`${BASE_URL}/api/v1/badges/members`);
        const memberData = await memberResponse.json();
        
        if (!memberData.data || !memberData.data.badgeMembers) return;

        const badgeDetails = await Promise.all(
          memberData.data.badgeMembers
            .filter((b) => b.isBadgeShown) // 표시 가능한 뱃지만 가져옴
            .map(async (b) => {
              const badgeResponse = await fetch(`${BASE_URL}/api/v1/badges/${b.badgeId}`);
              const badgeData = await badgeResponse.json();
              return {
                id: b.badgeId,
                name: badgeData.data.name,
                color: badgeData.data.colorCode,
              };
            })
        );

        setBadges(badgeDetails);
      } catch (error) {
        console.error("Failed to fetch badges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [memberId]);
  return { badges, loading };
};
