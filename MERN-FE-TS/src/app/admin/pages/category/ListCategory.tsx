import Heading from "@/components/typography/Heading";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IconDelete, IconEdit, IconPlus } from "@/components/icons";
import {
  CategoryContext,
  CategoryContextType,
} from "@/contexts/CategoryContext";
import { ICategories } from "@/types";

const ListCategory = () => {
  const { state, handleRemove, handleChangeStatus } = useContext(
    CategoryContext
  ) as CategoryContextType;
  const [data, setData] = useState<ICategories[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    setData(state.categories);
  }, [state.categories]);

  const columns: ColumnDef<ICategories>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: "Tên danh mục",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("slug")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => (
        <div>
          <div>
            {row.getValue("status") ? (
              <button
                type="button"
                onClick={() =>
                  handleChangeStatus(
                    row.getValue("slug"),
                    row.getValue("status")
                  )
                }
                className="bg-green-500 text-green-500 p-2 bg-opacity-10 border whitespace-nowrap border-current rounded-md font-semibold px-3 py-1 text-sm"
              >
                Active
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  handleChangeStatus(
                    row.getValue("slug"),
                    row.getValue("status")
                  )
                }
                className="bg-red-500 text-red-500 p-2 bg-opacity-10 border whitespace-nowrap border-current rounded-md font-semibold px-3 py-1 text-sm"
              >
                Inactive
              </button>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        const formattedDate = new Intl.DateTimeFormat("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(date);
        return <div>{formattedDate}</div>;
      },
    },
    {
      header: "Hành động",
      cell: ({ row }) => (
        <div className="flex gap-4 items-center">
          <Link to={`/manager/categories/edit/${row.original._id ?? ""}`}>
            <IconEdit />
          </Link>
          <button onClick={() => handleRemove(row.original._id)}>
            <IconDelete />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Heading>Quản lý danh mục</Heading>
      <div className="w-full">
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Tìm kiếm ..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm "
          />
          <Link
            to="/manager/categories/create"
            className="rounded-md bg-primary px-4 py-2 text-white"
          >
            Tạo mới
          </Link>
        </div>
        <div className="rounded-md border ">
          <Table className="dark:bg-grayDarkest">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : ""}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Không có kết quả.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between space-x-2 py-4 mb-16">
          <div className="flex-1 text-sm text-muted-foreground">
            Tổng cộng {table.getRowModel().rows.length} được hiển thị /
            {table.getFilteredRowModel().rows.length} bản ghi trên trang này,
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Trang trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Trang tiếp
            </Button>
          </div>
        </div>
        {showFloatingButton &&
          table.getFilteredRowModel().rows.length >= 10 && (
            <div className="fixed bottom-0 right-5 rounded-lg text-primary animate-bounce">
              <Link to={"/manager/categories/create"}>
                <IconPlus className="mb-2" />
              </Link>
            </div>
          )}
      </div>
    </>
  );
};

export default ListCategory;
