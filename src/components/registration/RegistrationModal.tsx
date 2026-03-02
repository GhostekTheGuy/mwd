"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import { useRegistrationModal } from "./RegistrationModalContext";
import RoleSelection from "./steps/RoleSelection";
import PatientForm from "./steps/PatientForm";
import MidwifeForm from "./steps/MidwifeForm";
import RegistrationSuccess from "./steps/RegistrationSuccess";

type Step = "role" | "form" | "success";
type Role = "patient" | "midwife";

export default function RegistrationModal() {
  const { isOpen, closeRegistration } = useRegistrationModal();
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<Role | null>(null);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep("role");
      setRole(null);
    }
  }, [isOpen]);

  // Lock page scroll (Lenis + fallback)
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
    return () => { lenis.start(); };
  }, [isOpen, lenis]);

  const handleSelectRole = (r: Role) => {
    setRole(r);
    setStep("form");
  };

  const handleBack = () => {
    setStep("role");
    setRole(null);
  };

  const handleSubmit = () => {
    setStep("success");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeRegistration}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div
              className="w-full max-w-[520px] max-h-[90vh] overflow-y-auto overscroll-contain rounded-[22px] bg-background shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                {step === "role" && (
                  <motion.div
                    key="role"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RoleSelection onSelectRole={handleSelectRole} onClose={closeRegistration} />
                  </motion.div>
                )}

                {step === "form" && role === "patient" && (
                  <motion.div
                    key="patient-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PatientForm onBack={handleBack} onClose={closeRegistration} onSubmit={handleSubmit} />
                  </motion.div>
                )}

                {step === "form" && role === "midwife" && (
                  <motion.div
                    key="midwife-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MidwifeForm onBack={handleBack} onClose={closeRegistration} onSubmit={handleSubmit} />
                  </motion.div>
                )}

                {step === "success" && role && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RegistrationSuccess role={role} onClose={closeRegistration} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
