interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, intro, align = "left", light = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading-${align}${light ? " is-light" : ""}`} data-reveal="up">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </div>
  );
}
