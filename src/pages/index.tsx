import { useHistory } from "react-router-dom";
import { useEffect, useState, useReducer, useRef } from "react";
import ContactListItem from "../components/ContactListItem";
import ErrorBoundary from "../components/ErrorBoundary";
import styles from "./Home.module.css";
import { getContacts, updateContact } from "../util/contacts";

export default function Home() {
  const [animClass, setAnimClass] = useState("");
  const router = useHistory();

  const actionContactsChange = "contacts";
  const actionSearchChange = "search";
  const actionFavOnlyChange = "fav";
  const ref = useRef() as any;

  const [searchState, dispatch] = useReducer(
    (state, action) => {
      let search = state.search;
      let favOnly = state.favOnly;
      let contacts = state.contacts;
      switch (action.type) {
        case actionSearchChange:
          search = action.value;
          break;
        case actionFavOnlyChange:
          favOnly = action.value;
          break;
        case actionContactsChange:
          contacts = action.value;
      }
      const filteredContacts = contacts.filter((it) => {
        return (!favOnly || it.favorite) && it.name.includes(search);
      });
      return { contacts, favOnly, search, filteredContacts };
    },
    {
      contacts: [],
      favOnly: false,
      search: "",
      filteredContacts: [],
    }
  );

  useEffect(() => {
    document.title = "Contacts App | Favorite Medium";
    getContacts().then((c: any) => {
      dispatch({ type: actionContactsChange, value: c });
      setAnimClass(styles.animClass);
    });
  }, []);
  let onChangeLike = (contact) => {
    const newContact = { ...contact, favorite: !contact.favorite };
    updateContact(newContact).then((c) => {
      dispatch({ type: actionContactsChange, value: c });
    });
  };
  return (
    <div className={styles.container + " " + animClass}>
      <header>
        <img
          src="/search.svg"
          onClick={() => {
            // document.getElementById("search").focus();
            ref.current.focus();
          }}
          className="logo"
          alt=""
        />
        <label className={styles.searchBox}>
          <input
            ref={ref}
            id="search"
            type="text"
            placeholder="start typing name or email"
            value={searchState.search}
            onChange={(e) =>
              dispatch({ type: actionSearchChange, value: e.target.value })
            }
          ></input>
          <span
            onClick={() =>
              dispatch({
                type: actionFavOnlyChange,
                value: !searchState.favOnly,
              })
            }
            className={
              styles.searchBoxOverlay +
              " " +
              (searchState.favOnly ? styles.favOnly : "")
            }
          >
            {searchState.favOnly ? (
              <span>
                <small>Showing Only</small> &#10084;
              </span>
            ) : (
              <span>
                <small>Showing </small>All
              </span>
            )}
          </span>
        </label>
        <img
          onClick={() => {
            setAnimClass("");
            setTimeout(() => router.push("/create"), 250);
          }}
          src="/person-add.svg"
          alt=""
          className="logo"
        />
      </header>
      <main className="main">
        <ErrorBoundary>
          {searchState.filteredContacts.map((contact) => (
            <ContactListItem
              key={contact.id}
              contact={contact}
              onChangeLike={onChangeLike}
              onItemClick={() => {
                setAnimClass("");
                setTimeout(() => router.push(`/contacts/${contact.id}`), 250);
              }}
            />
          ))}
        </ErrorBoundary>
      </main>
    </div>
  );
}
