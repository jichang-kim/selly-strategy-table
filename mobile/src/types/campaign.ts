export type TimelineEntry = {
  id: string;
  orderDate: string | null;
  orderWeekday: string | null;
  arrivalDate: string | null;
  arrivalWeekday: string | null;
  type: string | null;
  item: string | null;
  eventPrice: number | null;
  discount: number | null;
  quantity: number | null;
  plannedLoss: number | null;
  status: string | null;
};
