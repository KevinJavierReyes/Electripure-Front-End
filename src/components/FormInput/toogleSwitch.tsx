import { Fragment } from "react";

interface IToogleSwitchProps {
  labelOn: string;
  labelOff: string;
  widthOn: number;
  widthOff: number;
  isOn: boolean;
  onClick: () => void;
}

const COLOR_ON = "#55BA47";
const COLOR_OFF = "#E5E5E5";

function toogleSwitch({
  labelOn,
  labelOff,
  widthOn,
  widthOff,
  isOn,
  onClick,
}: IToogleSwitchProps) {
  const width = isOn ? widthOn : widthOff;
  return (
    <Fragment>
      <div
        className={`cursor-pointer flex items-center relative w-[${width}px]`}
        onClick={onClick}
      >
        <svg width={width} height="32" viewBox={`0 0 ${width} 32`}>
          <rect
            width={width}
            height="32"
            rx="16"
            fill={isOn ? COLOR_ON : COLOR_OFF}
          />
          <circle cx="18" cy="16" r="11" fill="white" />
        </svg>
        <p className="text-white absolute right-[15px]">
          {isOn ? labelOn : labelOff}
        </p>
      </div>
    </Fragment>
  );
}

export default toogleSwitch;
