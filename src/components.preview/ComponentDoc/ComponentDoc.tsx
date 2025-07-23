import { ComponentDoc as ComponentDocT } from "../../types/doc";

type Props = {
  docs: ComponentDocT[];
};

const ComponentDoc = ({ docs }: Props) => {
  return (
    <div className="my-8">
      {docs.map((section, idx) => (
        <div key={idx} className="mb-4">
          <h3 className="text-2xl font-semibold mb-2">{section.heading}</h3>
          <ul className="list-disc pl-5">
            {section.points.map((point, idx) => (
              <li key={idx} className="mb-1">
                <span className="font-medium">{point.split(":")[0]}:</span>
                <span>{point.split(":")[1]}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ComponentDoc;
