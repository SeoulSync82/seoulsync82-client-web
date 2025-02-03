export default function ModalOuter({
  children,
  close,
}: {
  children: React.ReactNode;
  close: () => void;
}) {
  return (
    <div
      onClick={close}
      className="z-100 fixed left-0 right-0 top-0 mx-auto flex flex h-full w-full max-w-[430px] bg-[rgba(0,0,0,0.6)]"
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
