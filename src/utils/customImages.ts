import { Product } from '../types';
import { CATEGORIES_DATA } from '../data/products';

const PRODUCT_IMAGES_KEY = 'four5_custom_product_images';
const CATEGORY_IMAGES_KEY = 'four5_custom_category_images';

export const getCustomProductImages = (): Record<string, string> => {
  try {
    const raw = localStorage.getItem(PRODUCT_IMAGES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const setCustomProductImage = (productId: string, dataUrl: string): void => {
  try {
    const current = getCustomProductImages();
    current[productId] = dataUrl;
    localStorage.setItem(PRODUCT_IMAGES_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('four5:images-updated'));
  } catch (err) {
    console.error('Failed to save custom product image:', err);
  }
};

export const resetCustomProductImage = (productId: string): void => {
  try {
    const current = getCustomProductImages();
    delete current[productId];
    localStorage.setItem(PRODUCT_IMAGES_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('four5:images-updated'));
  } catch (err) {
    console.error('Failed to reset product image:', err);
  }
};

export const getCustomCategoryImages = (): Record<string, string> => {
  try {
    const raw = localStorage.getItem(CATEGORY_IMAGES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const setCustomCategoryImage = (slug: string, dataUrl: string): void => {
  try {
    const current = getCustomCategoryImages();
    current[slug] = dataUrl;
    localStorage.setItem(CATEGORY_IMAGES_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('four5:images-updated'));
  } catch (err) {
    console.error('Failed to save custom category image:', err);
  }
};

export const resetCustomCategoryImage = (slug: string): void => {
  try {
    const current = getCustomCategoryImages();
    delete current[slug];
    localStorage.setItem(CATEGORY_IMAGES_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('four5:images-updated'));
  } catch (err) {
    console.error('Failed to reset category image:', err);
  }
};

export const resetAllCustomImages = (): void => {
  try {
    localStorage.removeItem(PRODUCT_IMAGES_KEY);
    localStorage.removeItem(CATEGORY_IMAGES_KEY);
    localStorage.removeItem('four5_custom_hero_image');
    window.dispatchEvent(new CustomEvent('four5:images-updated'));
  } catch (err) {
    console.error('Failed to reset all custom images:', err);
  }
};

export const applyCustomImagesToProducts = (baseProducts: Product[]): Product[] => {
  const customMap = getCustomProductImages();
  if (Object.keys(customMap).length === 0) return baseProducts;

  return baseProducts.map((p) => {
    const customImg = customMap[p.id];
    if (!customImg) return p;

    return {
      ...p,
      colors: p.colors.map((c, i) => {
        if (i === 0) {
          return {
            ...c,
            image: customImg,
            gallery: [customImg, ...(c.gallery.slice(1))],
          };
        }
        return c;
      }),
    };
  });
};

export const applyCustomImagesToCategories = (
  baseCategories: typeof CATEGORIES_DATA
): typeof CATEGORIES_DATA => {
  const customMap = getCustomCategoryImages();
  if (Object.keys(customMap).length === 0) return baseCategories;

  return baseCategories.map((cat) => {
    const customImg = customMap[cat.slug];
    if (!customImg) return cat;
    return {
      ...cat,
      image: customImg,
    };
  });
};
