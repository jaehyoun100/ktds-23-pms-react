import { useState } from "react";
import MenuList from "./MenuList";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export default function MenuItem({ item }) {
  const [displayCurrentChildren, setDisplayCurrentChildren] = useState({});
  const onMenuClickHandler = (getCurrentlabel) => {
    setDisplayCurrentChildren({
      ...displayCurrentChildren,
      [getCurrentlabel]: !displayCurrentChildren[getCurrentlabel],
    });
  };

  // console.log(displayCurrentChildren);

  return (
    <>
      {item && (
        <li>
          <div
            className="menu-item"
            onClick={() => onMenuClickHandler(item.label)}
          >
            <div className="menu-item-icon">
              {displayCurrentChildren[item.label] ? item.clickIcon : item.icon}
            </div>
            <div className="menu-item-left">
              <p>{item.label}</p>
              {item.children && item.children.length ? (
                <span onClick={() => onMenuClickHandler(item.label)}>
                  {displayCurrentChildren[item.label] ? (
                    <AiFillCaretUp />
                  ) : (
                    <AiFillCaretDown />
                  )}
                </span>
              ) : null}
            </div>
          </div>
          {item.children &&
          item.children.length > 0 &&
          displayCurrentChildren[item.label] ? (
            <MenuList list={item.children} />
          ) : null}
        </li>
      )}
    </>
  );
}
