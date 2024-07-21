import React, { useState } from "react";
import OpenIcon from "@/assets/icons/arrowDownIcon.svg";
import styles from "./Input.module.scss";

type OptionType = {
  id: string;
  val: string;
};

type Props = {
  title: string;
  type?: "NORMAL" | "DROPDOWN";
  value: string;
  options?: OptionType[];
  placeholder: string;
  onChange: (val: string) => void;
};

const Input: React.FC<Props> = ({
  title,
  type = "NORMAL",
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
              onChange={(e) => onChange(e.target.value)}
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
              <label htmlFor={title}>{title}</label>
              <button
                onClick={() => setOpenDropDown((prev) => !prev)}
                className={`${styles.dropDownBtn} ${
                  openDropDown && styles.isOpen
                }`}
              >
                {value || placeholder}

                <span>
                  <OpenIcon width={24} />
                </span>
              </button>

              {openDropDown && (
                <div className={styles.options}>
                  {options.map((option) => (
                    <button
                      key={option.id}
                      onClick={(e) => {
                        onChange(option.id);
                        setOpenDropDown(false);
                      }}
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
