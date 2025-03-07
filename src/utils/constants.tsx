export const DAYS_PER_SEASON = 28;
export const DAYS_PER_YEAR = 28 * 4;

export const daysOfTheWeek = ["M", "T", "W", "Th", "F", "Sa", "Su"];

export const seasons = ["spring", "summer", "fall", "winter"];

export const seasonWithIcons = [
    {
        name: "spring",
        icon: "https://stardewvalleywiki.com/mediawiki/images/9/9c/Spring.png"
    },
    {
        name: "summer",
        icon: "https://stardewvalleywiki.com/mediawiki/images/8/85/Summer.png",
    },
    {
        name: "fall",
        icon: "https://stardewvalleywiki.com/mediawiki/images/5/5d/Fall.png",
    },
    {
        name: "winter",
        icon: "https://stardewvalleywiki.com/mediawiki/images/a/a7/Winter.png"
    }
]

export const events = {
    spring: {
        birthdays: [
            {day: 4, name: "Kent"},
            {day: 7, name: "Lewis"},
            {day: 10, name: "Vincent"},
            {day: 14, name: "Haley"},
            {day: 18, name: "Pam"},
            {day: 20, name: "Shane"},
            {day: 26, name: "Pierre"},
            {day: 27, name: "Emily"}
        ],
        festivals: [
            {day: 13, name: "Egg Festival", type: "town"},
            {day: 15, name: "Desert Festival", type: "nontown"},
            {day: 16, name: "Desert Festival", type: "nontown"},
            {day: 17, name: "Desert Festival", type: "nontown"},
            {day: 24, name: "Flower Dance", type: "town"},
        ]
    },
    summer: {
        birthdays: [
            {day: 4, name: "Jas"},
            {day: 8, name: "Gus"},
            {day: 10, name: "Maru"},
            {day: 13, name: "Alex"},
            {day: 17, name: "Sam"},
            {day: 19, name: "Demetrius"},
            {day: 22, name: "Dwarf"},
            {day: 24, name: "Willy"},
            {day: 26, name: "Leo"},
        ],
        festivals: [
            {day: 11, name: "Luau", type: "town"},
            {day: 20, name: "Trout Derby", type: "fishing"},
            {day: 21, name: "Trout Derby", type: "fishing"},
            {day: 28, name: "Dance of the Moonlight Jellies", type: "town"}
        ]
    },
    fall: {
        birthdays: [
            {day: 2, name: "Penny"},
            {day: 5, name: "Elliott"},
            {day: 11, name: "Jodi"},
            {day: 13, name: "Abigail"},
            {day: 15, name: "Sandy"},
            {day: 18, name: "Marnie"},
            {day: 21, name: "Robin"},
            {day: 24, name: "George"},
        ],
        festivals: [
            {day: 16, name: "Stardew Valley Fair", type: "town"},
            {day: 27, name: "Spirit's Eve", type: "town"}
        ]
    },
    winter: {
        birthdays: [
            {day: 1, name: "Krobus"},
            {day: 3, name: "Linus"},
            {day: 7, name: "Caroline"},
            {day: 10, name: "Sebastian"},
            {day: 14, name: "Harvey"},
            {day: 17, name: "Wizard"},
            {day: 20, name: "Evelyn"},
            {day: 23, name: "Leah"},
            {day: 26, name: "Clint"},
        ],
        festivals: [
            {day: 8, name: "Festival of Ice", type: "town"},
            {day: 12, name: "SquidFest", type: "fishing"},
            {day: 13, name: "SquidFest", type: "fishing"},
            {day: 17, name: "Night Market", type: "nontown"},
            {day: 18, name: "Night Market", type: "nontown"},
            {day: 19, name: "Night Market", type: "nontown"},
            {day: 25, name: "Feast of the Winter Star", type: "town"},
        ]
    }
}

export const villagerWithIcons = [
    { name: "Kent", icon: "https://stardewvalleywiki.com/mediawiki/images/8/86/Kent_Icon.png" },
    { name: "Lewis", icon: "https://stardewvalleywiki.com/mediawiki/images/b/b6/Lewis_Icon.png" },
    { name: "Vincent", icon: "https://stardewvalleywiki.com/mediawiki/images/0/0b/Vincent_Icon.png" },
    { name: "Haley", icon: "https://stardewvalleywiki.com/mediawiki/images/f/f7/Haley_Icon.png" },
    { name: "Pam", icon: "https://stardewvalleywiki.com/mediawiki/images/b/b6/Pam_Icon.png" },
    { name: "Shane", icon: "https://stardewvalleywiki.com/mediawiki/images/b/b4/Shane_Icon.png" },
    { name: "Pierre", icon: "https://stardewvalleywiki.com/mediawiki/images/c/cf/Pierre_Icon.png" },
    { name: "Emily", icon: "https://stardewvalleywiki.com/mediawiki/images/c/c3/Emily_Icon.png" },
    { name: "Jas", icon: "https://stardewvalleywiki.com/mediawiki/images/6/68/Jas_Icon.png" },
    { name: "Gus", icon: "https://stardewvalleywiki.com/mediawiki/images/d/db/Gus_Icon.png" },
    { name: "Maru", icon: "https://stardewvalleywiki.com/mediawiki/images/2/23/Maru_Icon.png" },
    { name: "Alex", icon: "https://stardewvalleywiki.com/mediawiki/images/7/73/Alex_Icon.png" },
    { name: "Sam", icon: "https://stardewvalleywiki.com/mediawiki/images/5/52/Sam_Icon.png" },
    { name: "Demetrius", icon: "https://stardewvalleywiki.com/mediawiki/images/0/0b/Demetrius_Icon.png" },
    { name: "Dwarf", icon: "https://stardewvalleywiki.com/mediawiki/images/0/08/Dwarf_Icon.png" },
    { name: "Willy", icon: "https://stardewvalleywiki.com/mediawiki/images/7/73/Willy_Icon.png" },
    { name: "Leo", icon: "https://stardewvalleywiki.com/mediawiki/images/3/3d/Leo_Icon.png" },
    { name: "Penny", icon: "https://stardewvalleywiki.com/mediawiki/images/b/bc/Penny_Icon.png" },
    { name: "Elliott", icon: "https://stardewvalleywiki.com/mediawiki/images/6/6f/Elliott_Icon.png" },
    { name: "Jodi", icon: "https://stardewvalleywiki.com/mediawiki/images/f/f7/Jodi_Icon.png" },
    { name: "Abigail", icon: "https://stardewvalleywiki.com/mediawiki/images/6/63/Abigail_Icon.png" },
    { name: "Sandy", icon: "https://stardewvalleywiki.com/mediawiki/images/7/7d/Sandy_Icon.png" },
    { name: "Marnie", icon: "https://stardewvalleywiki.com/mediawiki/images/d/d4/Marnie_Icon.png" },
    { name: "Robin", icon: "https://stardewvalleywiki.com/mediawiki/images/d/d1/Robin_Icon.png" },
    { name: "George", icon: "https://stardewvalleywiki.com/mediawiki/images/a/ad/George_Icon.png" },
    { name: "Krobus", icon: "https://stardewvalleywiki.com/mediawiki/images/1/10/Krobus_Icon.png" },
    { name: "Linus", icon: "https://stardewvalleywiki.com/mediawiki/images/d/db/Linus_Icon.png" },
    { name: "Caroline", icon: "https://stardewvalleywiki.com/mediawiki/images/d/d4/Caroline_Icon.png" },
    { name: "Sebastian", icon: "https://stardewvalleywiki.com/mediawiki/images/6/6a/Sebastian_Icon.png" },
    { name: "Harvey", icon: "https://stardewvalleywiki.com/mediawiki/images/7/7a/Harvey_Icon.png" },
    { name: "Wizard", icon: "https://stardewvalleywiki.com/mediawiki/images/e/e9/Wizard_Icon.png" },
    { name: "Evelyn", icon: "https://stardewvalleywiki.com/mediawiki/images/5/54/Evelyn_Icon.png" },
    { name: "Leah", icon: "https://stardewvalleywiki.com/mediawiki/images/6/6e/Leah_Icon.png" },
    { name: "Clint", icon: "https://stardewvalleywiki.com/mediawiki/images/7/74/Clint_Icon.png" }
]

export const festivalIcons = (type: string) => {
    if (type === "town-festival") {
        return "https://stardewvalleywiki.com/mediawiki/images/4/47/Calendar_Flag_Anim.gif"
    }
    if (type === "fishing-festival") {
        return "https://stardewvalleywiki.com/mediawiki/images/2/23/Hook_Icon.png"
    }
    if (type === "nontown-festival") {
        return "https://stardewvalleywiki.com/mediawiki/images/b/bc/Iridium_Quality.png";
    }
}

export const villagerIcons = (name: string) => {
    return villagerWithIcons.find((villager) => villager.name === name);
}
