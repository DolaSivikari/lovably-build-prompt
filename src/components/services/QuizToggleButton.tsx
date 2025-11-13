import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizToggleButtonProps {
  isQuizActive: boolean;
  onToggle: () => void;
}

export const QuizToggleButton = ({ isQuizActive, onToggle }: QuizToggleButtonProps) => {
  return (
    <AnimatePresence>
      {!isQuizActive && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ delay: 1 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <Button
            onClick={onToggle}
            size="lg"
            className="group shadow-lg hover:shadow-xl transition-shadow rounded-full px-6"
          >
            <HelpCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Not sure what you need?
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
