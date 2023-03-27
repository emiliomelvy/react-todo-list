const FilterSort = (props) => {
  const setFilter = (val) => {
    props.onSetFilter(val);
  };

  const getSort = (val) => {
    props.onGetSort(val);
  };

  const sortPriority = (val) => {
    props.sortPriority(val)
  }

  return (
    <div className="max-w-6xl mx-auto pt-10 flex justify-end gap-7">
      <div className="flex justify-end gap-2">
        <label htmlFor="filterByDate">Filter</label>
        <select
          value={props.filter}
          onChange={(e) => setFilter(e.target.value)}
          name="filterByDate"
          id="filterByDate"
          className="border rounded px-3"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="High">Has Due Date</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <label htmlFor="sortDate">Sort by Date</label>
        <select
          onChange={(e) => getSort(e)}
          name="sortDate"
          id="sortDate"
          className="border rounded px-3"
        >
          <option value="default">-- Sort By Date --</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <label htmlFor="sortPriority">Sort by Priority</label>
        <select
          onChange={(e) => sortPriority(e)}
          name="sortPriority"
          id="sortPriority"
          className="border rounded px-3"
        >
          <option value="default">-- Sort By Priority --</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSort;
