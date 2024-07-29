
const BottomList = () => {
  return (
    <div className="bottomlist">
      <p className="bottomlist--left josefin--400">items left</p>
      <div className="bottomlist--center">
        <p className="bottomlist--center--all josefin--400">All</p>
        <p className="bottomlist--center--active josefin--400">Active</p>
        <p className="bottomlist--center--completed josefin--400">Completed</p>
      </div>

      <p className="bottomlist--clear josefin--400">Clear completed</p>
    </div>
  );
};

export default BottomList;
