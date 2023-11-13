import { classNames } from "utils/utils";

export default function WidgetWrapper({ children }) {
  return (
    <div className={classNames(
      "bg-lightBackground-0 dark:bg-darkBackground-0 py-4 px-6 rounded-xl w-full mb-2",
      // "border-2 border-black "
    )}>
      {children}
    </div>
  );
}
