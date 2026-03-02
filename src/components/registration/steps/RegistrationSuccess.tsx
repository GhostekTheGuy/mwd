"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

type Role = "patient" | "midwife";

export default function RegistrationSuccess({
  role,
  onClose,
}: {
  role: Role;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="flex flex-col items-center justify-center px-8 py-16">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
      >
        <Check className="h-10 w-10 text-green-600" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-[22px] font-bold tracking-[-0.5px] text-foreground"
      >
        Konto utworzone!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mt-2 text-center text-[14px] font-medium text-muted-foreground"
      >
        {role === "patient"
          ? "Możesz teraz wygodnie rezerwować wizyty."
          : "Twoje konto wymaga weryfikacji. Sprawdzimy dane w ciągu 24h."}
      </motion.p>
    </div>
  );
}
