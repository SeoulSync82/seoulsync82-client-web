export default function ModalOuter({
  children,
  onConfirm,
  onCancel,
  closeOnConfirm = true,
}: {
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  closeOnConfirm?: boolean;
}) {
  return (
    <div className="z-100 fixed left-0 right-0 top-0 mx-auto flex flex h-full w-full max-w-[430px] bg-[rgba(0,0,0,0.6)]">
      {children}
    </div>
  );
}
