import MenuItem from "./MenuItem";

export default function MenuList({ list = [] }) {
  return (
    <ul className="menu-list">
      {list && list.length
        ? list.map((listItem, idx) => <MenuItem item={listItem} key={idx} />)
        : null}
    </ul>
  );
}
