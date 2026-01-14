import { motion, AnimatePresence, useDragControls } from "framer-motion";

export default function ModalShell({ isOpen, onClose, children }) {
  const dragControls = useDragControls();

  const SNAP_CLOSE_DISTANCE = 120; // swipe threshold

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="
            fixed inset-0 z-50
            bg-black/50
            flex items-end md:items-center justify-center
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0 }}
            dragElastic={0.25}
            onDragEnd={(e, info) => {
              if (info.offset.y > SNAP_CLOSE_DISTANCE) {
                onClose();
              }
            }}
            initial={{ y: 50, scale: 0.94, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 60, scale: 0.94, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 520,
              damping: 26,
              mass: 0.6
            }}
            className="
              relative
              w-full md:w-[520px]
              max-h-[80vh]
              bg-black/90
              rounded-t-3xl md:rounded-2xl
              p-6
              overflow-y-auto
              border border-white/10
              shadow-2xl
              will-change-transform
            "
          >
            {/* DRAG HANDLE */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="absolute -top-4 left-1/2 -translate-x-1/2
                         w-12 h-1.5 bg-white/30 rounded-full
                         cursor-grab active:cursor-grabbing"
            />

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
