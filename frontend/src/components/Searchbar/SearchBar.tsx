import Search from "../../assets/search.png";

function SearchBar() {
  return (
    <>
      <button className="relative mr-[-2.4rem] flex items-center">
        <img className="w-[18px] h-[18px]" src={Search} alt="" />
      </button>
      <input
        className="bg-[#f0f2f5] py-2.5 rounded-[22px] w-[220px] placeholder-gray-500 text-[0.9rem] font-light pl-8"
        type="text"
        placeholder="Search Pintech"
        // value={searchQuery}
        // onChange={e => setSearchQuery(e.target.value)}
      />
    </>
  );
}

export default SearchBar;
