import DisplayContact from "../components/DisplayContact";

export default ({ match }) => {
  const { id } = match.params.id;
  return (
    <main className="main">
      <DisplayContact id={id} />
    </main>
  );
};
