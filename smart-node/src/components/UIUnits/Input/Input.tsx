import React, { useState } from "react";
import OpenIcon from "@/assets/icons/arrowDownIcon.svg";
import styles from "./Input.module.scss";

type OptionType = {
  id: string;
  val: string;
};

export type ChangeHandlerType =
  | {
      type: "NORMAL";
      event: React.ChangeEvent<HTMLInputElement>;
    }
  | {
      type: "DROPDOWN";
      event: OptionType;
    };

type Props = {
  title: string;
  type: "NORMAL" | "DROPDOWN";
  value: string;
  options?: OptionType[];
  placeholder: string;
  onChange: (e: ChangeHandlerType) => {};
};

const Input: React.FC<Props> = ({
  title,
  type,
  value,
  onChange,
  options,
  placeholder,
}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const renderInput = () => {
    let inputEl = <></>;
    switch (type) {
      case "NORMAL":
        inputEl = (
          <div className={styles.input}>
            <label htmlFor={title}>{title}</label>
            <input
              type="text"
              id={title}
              onChange={(e) =>
                onChange({
                  type: "NORMAL",
                  event: e,
                })
              }
              value={value}
              name={title}
              placeholder={placeholder}
            />
          </div>
        );
        break;
      case "DROPDOWN":
        if (options) {
          inputEl = (
            <div className={styles.dropDown}>
              <button
                onClick={() => setOpenDropDown(true)}
                className={`${styles.dropDownBtn} ${
                  openDropDown && styles.isOpen
                }`}
              >
                {value}

                <span>
                  <OpenIcon />
                </span>
              </button>

              {openDropDown && (
                <div className={styles.options}>
                  {options.map((option) => (
                    <button
                      key={option.id}
                      onChange={(e) =>
                        onChange({
                          type: "DROPDOWN",
                          event: option,
                        })
                      }
                    >
                      {option.val}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        }
        break;

      default:
        break;
    }

    return inputEl;
  };

  return renderInput();
};

export default Input;
