import { useEffect, useState } from "react";

const API_BASE_URL = "/api/v1/badges";

export const useBadges = (memberId) => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        // 사용자 뱃지 목록 가져오기
        const memberResponse = await fetch(`${API_BASE_URL}/members`);
        const memberData = await memberResponse.json();
        
        if (!memberData.data || !memberData.data.badgeMembers) return;

        const badgeDetails = await Promise.all(
          memberData.data.badgeMembers
            .filter((b) => b.isBadgeShown) // 표시 가능한 뱃지만 가져옴
            .map(async (b) => {
              const badgeResponse = await fetch(`${API_BASE_URL}/${b.badgeId}`);
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
