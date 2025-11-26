import {
    GiDress,
    GiSkirt,
    GiPoloShirt,
    GiShorts,
    GiTrousers,
    GiHighHeel,
    GiRunningShoe,
    GiDiamondRing,
    GiHandBag,
    GiKimono,
    GiHanger
} from "react-icons/gi";


export const getCategoryIcon = (category) => {
    if (!category) return GiHanger;

    const normalized = category.toLowerCase().trim();

    if (normalized.includes("vestido")) return GiDress;
    if (normalized.includes("festa")) return GiDress;
    if (normalized.includes("saia")) return GiSkirt;
    if (normalized.includes("short")) return GiShorts;
    if (normalized.includes("calça")) return GiTrousers;
    if (normalized.includes("jeans")) return GiTrousers;
    if (normalized.includes("blusa")) return GiPoloShirt;
    if (normalized.includes("camiseta")) return GiPoloShirt;
    if (normalized.includes("conjunto")) return GiKimono;
    if (normalized.includes("salto")) return GiHighHeel;
    if (normalized.includes("sandália")) return GiHighHeel;
    if (normalized.includes("tênis")) return GiRunningShoe;
    if (normalized.includes("bolsa")) return GiHandBag;
    if (normalized.includes("colar")
        || normalized.includes("brinco")
        || normalized.includes("anel")
        || normalized.includes("acessó")) return GiDiamondRing;

    return GiHanger;
};