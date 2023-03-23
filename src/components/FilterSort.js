const FilterSort = (props) => {
  const setFilter = (val) => {
    props.onSetFilter(val);
  };

  const getSort = (val) => {
    props.onGetSort(val);
  };

  return (
    <div className="max-w-6xl mx-auto pt-10 flex justify-end gap-7">
      <div className="flex justify-end gap-2">
        <label htmlFor="filter">Filter</label>
        <select
          value={props.filter}
          onChange={(e) => setFilter(e.target.value)}
          name="filter"
          id="filter"
          className="border rounded px-3"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Has Due Date">Has Due Date</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <label htmlFor="sort">Sort</label>
        <select
          onChange={(e) => getSort(e)}
          name="sort"
          id="sort"
          className="border rounded px-3"
        >
          <option value="default">-- Sort By --</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSort;
