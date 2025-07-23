type NavSection = {
  id: string;
  name: string;
};

type Props = {
  activeId: string;
  sections: NavSection[];
  setSelectedSection: (id: string) => void;
};

const Navbar = ({ activeId, sections, setSelectedSection }: Props) => {
  return (
    <div className="w-72 sticky left-0 h-full">
      <nav className="">
        <div className="">
          {sections.map(({ id, name }) => (
            <div
              key={id}
              className={`cursor-pointer text-lg px-6 rounded-lg leading-loose hover:bg-white/5 ${
                activeId == id
                  ? "text-white bg-white/5 rounded-lg"
                  : "text-gray"
              }`}
              onClick={() => setSelectedSection(id)}
            >
              <span>{name}</span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
