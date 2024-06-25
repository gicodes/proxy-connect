// Tailwind props & classes
export const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
  }
  