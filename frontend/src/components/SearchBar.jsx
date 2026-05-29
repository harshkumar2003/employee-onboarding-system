import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="search"
        placeholder="Search by name"
        className="w-full rounded-2xl border border-slate-200 bg-white py-2 pl-12 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;