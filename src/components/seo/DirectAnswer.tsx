interface DirectAnswerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * DirectAnswer component for AEO/GEO optimization
 * Presents content in a format that AI engines can easily extract and cite
 */
const DirectAnswer = ({ children, className = "" }: DirectAnswerProps) => {
  return (
    <section className={`py-8 bg-muted/30 ${className}`}>
      <div className="container max-w-4xl mx-auto px-4">
        <div className="prose prose-lg max-w-none">
          {children}
        </div>
      </div>
    </section>
  );
};

export default DirectAnswer;
