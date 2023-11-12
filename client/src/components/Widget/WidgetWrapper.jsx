import { classNames } from "utils/utils";

export default function WidgetWrapper({ children }) {
  return (
    <div className={classNames(
      "bg-lightBackground-0 dark:bg-darkBackground-0 pl-3 pb-3 pt-6 pr-6 rounded-xl",
      "border-2 border-black "
    )}>
      {children}
    </div>
  );
}
