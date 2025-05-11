import { PlanTypes } from "@/constants/plans";
import { User } from "@/interfaces/user";
import { ProfessionsOptions } from "@/constants/dropdowns/professions";

export const getAdminStatistics = (users: User[]) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const usersThisMonth = users.filter((user) => {
        const userDate = new Date(user.created_at);
        return userDate.getMonth() === currentMonth &&
            userDate.getFullYear() === currentYear;
    }).length;

    const usersLastMonth = users.filter((user) => {
        const userDate = new Date(user.created_at);
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const year = currentMonth === 0 ? currentYear - 1 : currentYear;
        return userDate.getMonth() === lastMonth &&
            userDate.getFullYear() === year;
    }).length;

    const activeUsers = users.filter((user) => user.subscriptions).length;

    const calculatePercentageChange = (current: number, previous: number) => {
        if (previous === 0) return 100;
        return ((current - previous) / previous) * 100;
    };

    const newUsersChange = calculatePercentageChange(
        usersThisMonth,
        usersLastMonth,
    );
    const newUsersChangeFormatted = `${newUsersChange >= 0 ? "+" : ""}${
        newUsersChange.toFixed(1)
    }%`;

    return {
        usersThisMonth,
        activeUsers,
        newUsersChange,
        newUsersChangeFormatted,
    };
};

const calculateAgeDistribution = (users: User[]) => {
    const ageData = users.reduce((acc, user) => {
        try {
            const birthDate = new Date(user.date_of_birth);
            if (isNaN(birthDate.getTime())) {
                console.warn(
                    `Invalid date_of_birth for user ${user.id}: ${user.date_of_birth}`,
                );
                return acc;
            }

            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            const adjustedAge =
                monthDiff < 0 ||
                    (monthDiff === 0 && today.getDate() < birthDate.getDate())
                    ? age - 1
                    : age;

            let ageGroup = "";

            if (adjustedAge >= 18 && adjustedAge <= 24) ageGroup = "18-24";
            else if (adjustedAge >= 25 && adjustedAge <= 34) ageGroup = "25-34";
            else if (adjustedAge >= 35 && adjustedAge <= 44) ageGroup = "35-44";
            else if (adjustedAge >= 45 && adjustedAge <= 54) ageGroup = "45-54";
            else if (adjustedAge >= 55) ageGroup = "55+";

            if (ageGroup) {
                const existingGroup = acc.find((item) => item.age === ageGroup);
                if (existingGroup) {
                    existingGroup.users++;
                } else {
                    acc.push({ age: ageGroup, users: 1 });
                }
            }
        } catch (error) {
            console.error(`Error processing user ${user.id}:`, error);
        }
        return acc;
    }, [] as { age: string; users: number }[]);

    ageData.sort((a, b) => {
        const ageA = parseInt(a.age.split("-")[0]);
        const ageB = parseInt(b.age.split("-")[0]);
        return ageA - ageB;
    });

    const allAgeGroups = ["18-24", "25-34", "35-44", "45-54", "55+"];
    allAgeGroups.forEach((group) => {
        if (!ageData.find((item) => item.age === group)) {
            ageData.push({ age: group, users: 0 });
        }
    });

    return ageData;
};

const calculateUserCreationTrend = (users: User[]) => {
    return users
        .reduce((acc, user) => {
            const date = new Date(user.created_at);
            const monthYear = `${date.getFullYear()}-${
                String(date.getMonth() + 1).padStart(2, "0")
            }`;

            const existingMonth = acc.find((item) => item.date === monthYear);
            if (existingMonth) {
                existingMonth.users++;
            } else {
                acc.push({ date: monthYear, users: 1 });
            }
            return acc;
        }, [] as { date: string; users: number }[])
        .sort((a, b) => a.date.localeCompare(b.date));
};

const calculateCountryDistribution = (users: User[]) => {
    return users
        .reduce((acc, user) => {
            const existingCountry = acc.find((item) =>
                item.country === user.country
            );
            if (existingCountry) {
                existingCountry.users++;
            } else {
                acc.push({ country: user.country, users: 1 });
            }
            return acc;
        }, [] as { country: string; users: number }[])
        .sort((a, b) => b.users - a.users)
        .slice(0, 5);
};

const calculateProfessionDistribution = (users: User[]) => {
    // Initialize a map to count each profession
    const professionCounts = new Map<string, number>();

    // Initialize all professions with 0 count
    ProfessionsOptions.forEach((profession) => {
        professionCounts.set(profession.value, 0);
    });

    // Count actual professions from users
    users.forEach((user) => {
        const currentCount = professionCounts.get(user.profession) || 0;
        professionCounts.set(user.profession, currentCount + 1);
    });

    // Convert to array format for the chart
    return Array.from(professionCounts.entries()).map(([value, count]) => {
        const profession = ProfessionsOptions.find((p) => p.value === value);
        return {
            name: profession?.label || "Other",
            value: count,
        };
    });
};

const calculateSubscriptionDistribution = (users: User[]) => {
    const subscriptionData = users.reduce((acc, user) => {
        const planType =
            user.subscriptions?.prices?.products?.name?.toLowerCase() || "free";

        const existingPlan = acc.find((item) => item.name === planType);
        if (existingPlan) {
            existingPlan.value++;
        } else {
            acc.push({ name: planType, value: 1 });
        }
        return acc;
    }, [] as { name: string; value: number }[]);

    const allPlanTypes = ["free", "basic", "professional"];
    allPlanTypes.forEach((planType) => {
        if (!subscriptionData.find((item) => item.name === planType)) {
            subscriptionData.push({ name: planType, value: 0 });
        }
    });

    return subscriptionData;
};

export const getUserDemographics = (users: User[]) => {
    return {
        ageData: calculateAgeDistribution(users),
        userCreationData: calculateUserCreationTrend(users),
        countryData: calculateCountryDistribution(users),
        professionData: calculateProfessionDistribution(users),
        subscriptionData: calculateSubscriptionDistribution(users),
    };
};
