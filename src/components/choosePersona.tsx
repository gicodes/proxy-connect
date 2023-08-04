import React from "react";

interface Rider {
  id: number;
  name: string;
}

interface ChoosePersonaProps {
  riders: any;
  count?: number;
  onSelected?: (id: number) => void;
}

const ChoosePersona: React.FC<ChoosePersonaProps> = ({
  riders = [],
  count = 3,
  onSelected = () => {},
}) => {
  const nameBadgeStyles = {
    fontSize: "0.8rem",
    height: 40,
    borderRadius: 20,
    cursor: "pointer",
  };

  const choosePersona = (id: number) => (evt: React.MouseEvent) =>
    onSelected(id);

  const randomRiders = (count: number) => (riders: Rider[]) => {
    const selected: number[] = [];
    let i = 0;

    count = Math.max(0, Math.min(count, riders.length));

    while (i < count) {
      const index = Math.floor(Math.random() * riders.length);
      if (selected.includes(index)) continue;
      ++i && selected.push(index);
    }

    return selected.map((index) => {
      const { id, name } = riders[index];
      const className =
        "d-flex align-items-center text-center text-white bg-secondary font-weight-bold py-2 px-4 mx-1 my-2";

      return (
        <span
          key={index}
          className={className}
          style={nameBadgeStyles}
          title={name}
          onClick={choosePersona(id)}
        >
          {name}
        </span>
      );
    });
  };

  return (
    <div className="w-100 h-100 px-3 pb-5 d-flex flex-wrap align-items-center align-content-center justify-content-center">
      <span className="h3 text-dark text-center py-3 w-100 font-weight-bold">
        Choose your Persona
      </span>
      {randomRiders(count)(riders)}
    </div>
  );
};

export default ChoosePersona;
