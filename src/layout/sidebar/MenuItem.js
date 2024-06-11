import { useState } from "react";
import MenuList from "./MenuList";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function MenuItem({ item }) {
  const [displayCurrentChildren, setDisplayCurrentChildren] = useState({});

  const onMenuClickHandler = (getCurrentlabel) => {
    setDisplayCurrentChildren({
      ...displayCurrentChildren,
      [getCurrentlabel]: !displayCurrentChildren[getCurrentlabel],
    });
  };

  return (
    <>
      {item && (
        <li>
          <Link
            className="side-bar-link"
            to={item.to}
            onClick={() => onMenuClickHandler(item.label)}
          >
            <div className="menu-item">
              <div className="menu-item-icon">{item.icon}</div>
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
          </Link>
          <div
            className={`submenu-wrapper ${
              displayCurrentChildren[item.label] ? "open" : "closed"
            }`}
          >
            {item.children && item.children.length > 0 ? (
              <MenuList list={item.children} />
            ) : null}
          </div>
        </li>
      )}
    </>
  );
}
