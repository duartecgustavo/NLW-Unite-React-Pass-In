import {
  Search,
  MoreHorizontal,
  ChevronRightIcon,
  ChevronsRight,
  ChevronLeft,
  ChevronsLeft,
} from "lucide-react";
import { ButtonSearch } from "./button-search";
import { TableComponent } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
// import { attendees } from "../data/attendees";
import { ButtonAction } from "./button-action";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface IAttendees {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string;
}

export function AttendeeList() {
  const [attendees, setAttendees] = useState<IAttendees[]>([]);
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / 10);

  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }

    return "";
  });
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }

    return 1;
  });

  useEffect(() => {
    const url = new URL(
      "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
    );

    url.searchParams.set("query", String(search));
    url.searchParams.set("pageIndex", String(page - 1));

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees);
        setTotal(data.total);
      });
  }, [page, search]);

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set("search", search);

    window.history.pushState({}, "", url);

    setSearch(search);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);

    setPage(page);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h1 className="font-medium text-2xl">Participantes</h1>
        <div className="flex items-center gap-2 border border-white/10 rounded-md px-3 py-1.5 w-72 max-h-8">
          <Search className="size-4 text-emerald-300" />
          <ButtonSearch
            value={search}
            onChange={(event) => {
              setCurrentSearch(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Buscar participantes..."
          />
        </div>
      </div>
      <TableComponent>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: "48px" }}>
              <input type="checkbox" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data da inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: "48px" }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.map((item) => {
            return (
              <tr
                key={item.id}
                className="border-b border-white/10 hover:bg-zinc-900"
              >
                <TableCell className="w-12">
                  <input type="checkbox" />
                </TableCell>
                <TableCell>
                  <p>{item.id}</p>
                </TableCell>
                <TableCell className="text-sm flex flex-col">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-xs font-light">{item.email}</span>
                </TableCell>
                <TableCell>{dayjs().to(item.createdAt)}</TableCell>
                <TableCell>
                  {item.checkedInAt === null ? (
                    <span className="text-zinc-500">
                      Não foi realizado check-in
                    </span>
                  ) : (
                    dayjs().to(item.checkedInAt)
                  )}
                </TableCell>
                <TableCell>
                  <ButtonAction transparent>
                    <MoreHorizontal className="size-4" />
                  </ButtonAction>
                </TableCell>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell className="px-4 py-3 text-sm" colSpan={3}>
              Mostrando 10 de {total} items.
            </TableCell>
            <TableCell className="px-4 py-3 text-sm text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Pagina {page} de {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <ButtonAction
                    onClick={() => setCurrentPage(1)}
                    disabled={page === 1}
                  >
                    <ChevronsLeft className="size-4" />
                  </ButtonAction>
                  <ButtonAction
                    onClick={() => setCurrentPage(page - 1)}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="size-4" />
                  </ButtonAction>{" "}
                  <ButtonAction
                    onClick={() => setCurrentPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    <ChevronRightIcon className="size-4" />
                  </ButtonAction>
                  <ButtonAction
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </ButtonAction>{" "}
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </TableComponent>
    </div>
  );
}
