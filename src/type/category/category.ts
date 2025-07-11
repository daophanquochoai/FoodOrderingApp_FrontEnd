import { Food } from "../index";


export type Category = {
  id: number;
  name: string;
  image: string;
  desc: string;
  create_date: string;
  late_update_time: string;
  status: boolean;
  parentId: number | null;
  create_by: number;
  total_food?: number;
  small?: boolean;
};

export type CategoryNode = Category & { children: CategoryNode[]};

export type FilterSidebarProps = {
  categories?: Category[];
  productsList?: Food[];
}