import { SearchOutlined } from "@material-ui/icons";

function SearchBar() {
  return (
    <>
      <button className="relative mr-[-2.9rem] text-gray-500 flex items-center">
        <SearchOutlined />
      </button>
      <input
        className="bg-[#f0f2f5] py-3 rounded-[24px] w-[225px] placeholder-gray-500 text-[0.9rem] font-light pl-10"
        type="text"
        placeholder="Search Pintech"
        // value={searchQuery}
        // onChange={e => setSearchQuery(e.target.value)}
      />
    </>
  );
}

export default SearchBar;
