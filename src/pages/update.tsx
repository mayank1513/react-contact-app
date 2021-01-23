import UpdateContact from "../components/UpdateContact";
import { useEffect, useState } from "react";
import { getContact } from "../util/contacts";

export default function Update({ match }) {
  const id = match.params.id;
  const [contact, setContact] = useState<any>();
  useEffect(() => {
    getContact(id).then((ct) => setContact(ct));
  }, [id]);

  return (
    <main className="main">
      {contact && <UpdateContact contact={contact} />}
    </main>
  );
}
