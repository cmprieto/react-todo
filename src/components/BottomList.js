
const BottomList = () => {
  return (
    <div className="bottomlist">
      <p className="bottomlist--left">items left</p>
      <div className="bottomlist--center">
        <p className="bottomlist--center--all">All</p>
        <p className="bottomlist--center--active">Active</p>
        <p className="bottomlist--center--completed">Completed</p>
      </div>

      <p className="bottomlist--clear">Clear completed</p>
    </div>
  );
};

export default BottomList;
