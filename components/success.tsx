import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Success({
  setShowModal,
  heading,
  desc,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  heading?: string;
  desc?: string;
}) {
  return (
    <div className="font-satoshi">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 max-w-[30rem] mx-auto w-full rounded-xl border border-[#DDDDDDDD] "
      >
        <div className="flex items-center justify-between">
          <h3 className="text-[#000] font-[700] text-[1.1rem]   lg:text-[1.1rem] font-satoshi leading-tight">
            {heading || "Your Request Has Been Sent!"}
          </h3>
          <XMarkIcon
            onClick={() => setShowModal(false)}
            className="size-5 text-[#000] cursor-pointer"
          />
        </div>

        <div className="grid gap-3 mt-2">
          <p className="text-sm text-[#000] font-medium">
            {desc ||
              "We've received your request. Our sales team will contact you soon. Please check your email for further communication"}
          </p>

          <button
            onClick={() => setShowModal(false)}
            type="submit"
            className="text-[.9rem] font-[500] text-white flex items-center justify-center gap-1 bg-custom-blue rounded-xl py-3 mt-8"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
