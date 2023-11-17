export default function PopupWrapper({ children, togglePopup }) {
  return (
    <div
      className="bg-[#000000aa] fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center mx-auto z-20 m-0 p-0"
      onClick={() => togglePopup()}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
