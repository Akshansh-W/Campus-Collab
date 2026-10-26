import NotificationBell from "./NotificationBell";

export default function DetailsSection({ student }) {
  const name = student?.studentName || "Student";
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <section className="w-full rounded-2xl border border-[#e9dff7] bg-linear-to-r from-[#faf7ff] via-[#f7f1fd] to-[#eee2fa] px-6 py-10 shadow-[0_5px_16px_rgba(91,31,115,0.08)]">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
        <div className="flex shrink-0 items-center gap-4">
          <div className="relative flex size-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#c084fc] via-[#8b5cf6] to-[#6d28d9] shadow-[0_4px_10px_rgba(124,58,237,0.28)]">
            <span className="text-[35px] font-bold text-white">{initial}</span>
            <span className="absolute -right-0.5 bottom-0.5 size-3 rounded-full border-2 border-white bg-[#22c55e]" />
          </div>

          <div className="w-75 shrink-0">
            <p className="truncate text-[27px] font-bold leading-tight text-[#272044]">{name}</p>
            <span className="mt-1 inline-flex whitespace-nowrap rounded-full border border-[#dac5ee] bg-[#e8daf7] px-3 py-0.5 text-[10px] font-semibold text-[#6b2c91] shadow-[0_2px_5px_rgba(107,44,145,0.10)]">
              {student?.department ? `${student.department} Student` : "Student"}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center md:grid md:grid-cols-[1fr_1.8fr_0.7fr] md:gap-0">
          <div className="border-[#ded3eb] pr-6 md:border-l md:pl-6">
            <p className="text-[15px] font-medium text-[#8e8aa3]">Roll Number</p>
            <p className="mt-1 text-[20px] font-semibold text-[#343047]">{student?.rollNumber || "—"}</p>
          </div>

          <div className="border-[#ded3eb] pr-6 sm:border-l sm:pl-6">
            <p className="text-[15px] font-medium text-[#8e8aa3]">Department</p>
            <p className="mt-1 text-[20px] font-semibold text-[#343047]">{student?.department || "—"}</p>
          </div>

          <div className="sm:border-l sm:pl-6">
            <p className="text-[17px] font-medium text-[#8e8aa3]">Year</p>
            <p className="mt-1 text-[22px] font-semibold text-[#343047]">{student?.currentYear ? `${student.currentYear} Year` : "—"}</p>
          </div>
        </div>
        <div className="flex items-center justify-end bg-white rounded-xl">
          <NotificationBell />
        </div>
      </div>
    </section>
  );
}
