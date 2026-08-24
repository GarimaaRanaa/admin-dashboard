// DataTable.tsx
// TODO: implement this component. Purpose: A reusable table with sorting, pagination, and search — used on every admin list page.
// Full working example is in the guideline docx, Part D, section "DataTable".
// Used in: Users list, Orders list, Articles list — any screen that shows tabular data.

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>(props: DataTableProps<T>) {
  return (
    <div>
      {/* TODO: build the real markup here — see the guideline docx for the full working example */}
    </div>
  );
}
