const CATEGORY_LABELS = {
  "без категории": "Без категории",
  "men's clothing": "Одежда для мужчин",
  "mens-shirts": "Мужские рубашки",
  "mens-shoes": "Мужская обувь",
  "mens-watches": "Мужские часы",
  "women's clothing": "Одежда для женщин",
  "womens-dresses": "Женские платья",
  "womens-shoes": "Женская обувь",
  "womens-bags": "Женские сумки",
  "womens-jewellery": "Женские украшения",
  "womens-watches": "Женские часы",
  tops: "Топы",
  "boys clothing": "Одежда для мальчиков",
  "girls clothing": "Одежда для девочек",
  "toddler clothing": "Одежда для малышей",
  "baby clothing": "Одежда для грудничков",
  "unisex kids clothing": "Детская одежда (унисекс)",
};

export function formatCategory(value) {
  const key = String(value || "");
  return CATEGORY_LABELS[key] || key || "Без категории";
}

export const CATEGORY_LABELS_MAP = {
  all: "Все",
  ...CATEGORY_LABELS,
};
