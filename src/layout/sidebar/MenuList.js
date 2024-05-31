import MenuItem from "./MenuItem";

export default function MenuList({ list = [] }) {
  return (
    <ul className="menu-list">
      {list && list.length
        ? list.map((listItem) => <MenuItem item={listItem} />)
        : null}
    </ul>
  );
}
