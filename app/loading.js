import { RotateRightRounded } from '@mui/icons-material';

export default function Loading() {
  return (
    <div
      className="
        z-50
        absolute
        top-0 left-0
        flex
        justify-center
        items-center
        w-screen h-screen
        text-white bg-black/50
      "
    >
      <RotateRightRounded className="text-[3rem] sm:text-[4.5rem] animate-spin" />
    </div>
  );
}