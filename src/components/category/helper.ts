import { Category, CategoryNode } from "./type";

export const buildCategoryTree = (categories: Category[], parentId: number | null = null) : CategoryNode[] => {
  return (
    categories
      .filter(category => category.parentId == parentId)
      .map((category) => ({
        ...category,
        children: buildCategoryTree(categories, category.id)
      }))
  )
}


export const getAllSubCategoryIds = (categories: Category[], parentId: number): number[] => {
  const directChildren = categories.filter(category => category.parentId == parentId);
  const childs = directChildren.flatMap(child => getAllSubCategoryIds(categories, child.id));
  return [parentId, ...childs];
}

