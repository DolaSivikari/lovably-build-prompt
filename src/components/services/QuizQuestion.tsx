import { motion } from "framer-motion";
import { Building2, Hammer, PaintBucket, HardHat, DollarSign, Clock, CheckCircle2 } from "lucide-react";

interface QuizOption {
  value: string;
  label: string;
  icon: string;
  description?: string;
}

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  onSelect: (value: string) => void;
  selectedValue?: string;
}

const iconMap: Record<string, any> = {
  Building2,
  Hammer,
  PaintBucket,
  HardHat,
  DollarSign,
  Clock,
  CheckCircle2,
};

export const QuizQuestion = ({ question, options, onSelect, selectedValue }: QuizQuestionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto px-6"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
        {question}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, index) => {
          const Icon = iconMap[option.icon] || Building2;
          const isSelected = selectedValue === option.value;

          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(option.value)}
              className={`group relative p-6 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-lg"
                  : "border-border hover:border-primary/50 bg-card"
              }`}
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-lg mb-4 transition-colors ${
                isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                <Icon className="w-6 h-6" />
              </div>

              {/* Label */}
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {option.label}
              </h3>

              {/* Description */}
              {option.description && (
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              )}

              {/* Selected indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};
