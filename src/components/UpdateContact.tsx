import { Component } from "react";
import { withRouter } from "react-router-dom";
import { createContact, updateContact } from "../util/contacts";
import styles from "./UpdateContact.module.css";
import FavButton from "./FavButton";

interface RecipeProps {
  contact?: any;
  history?: any;
}

interface RecipeState {
  name?: string;
  nameDirty?: boolean;
  email?: string;
  emailDirty?: boolean;
  phone?: string;
  phoneDirty?: boolean;
  favorite?: boolean;
  animClass?: string;
}
class UpdateContact extends Component<RecipeProps, RecipeState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameDirty: false,
      email: "",
      emailDirty: false,
      phone: "",
      phoneDirty: false,
      favorite: false,
      animClass: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ animClass: styles.animClass });
    }, 50);
    if (this.props.contact) this.setState({ ...this.props.contact });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      [name + "Dirty"]: true,
    });
  }
  validateEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ animClass: "" });
    const { name, email, phone, favorite } = this.state;
    if (this.props.contact) {
      updateContact({
        id: this.props.contact.id,
        name,
        email,
        phone,
        favorite,
      }).then(() =>
        this.props.history.push(`/contacts/${this.props.contact.id}`)
      );
    } else {
      createContact({
        name,
        email,
        phone,
        favorite,
      }).then(() => setTimeout(() => this.props.history.push("/"), 500));
    }
  }

  render() {
    return (
      <div className={[styles.container, this.state.animClass].join(" ")}>
        <header>
          <img
            onClick={() => {
              this.setState({ animClass: "" });
              setTimeout(() => {
                this.props.history.push(
                  this.props.contact
                    ? `/contacts/${this.props.contact.id}`
                    : "/"
                );
              }, 300);
            }}
            src="/arrow-back.svg"
            alt=""
            className="logo"
          />
          <span className="spacer"></span>
          <FavButton
            fav={this.state.favorite}
            onClick={() => this.setState({ favorite: !this.state.favorite })}
          />
        </header>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <label>
            {this.state.nameDirty && this.state.name.length < 3 && (
              <small className={styles.err}>
                *Name must be at least 3 characters long
              </small>
            )}
            <input
              name="name"
              type="text"
              value={this.state.name}
              placeholder="Name"
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            {this.state.emailDirty && !this.validateEmail() && (
              <small className={styles.err}>*Please enter valid email</small>
            )}
            <input
              name="email"
              type="email"
              placeholder="E-mail"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            <input
              name="phone"
              type="tel"
              placeholder="Phone"
              value={this.state.phone}
              onChange={this.handleInputChange}
            />
          </label>
          <button
            disabled={this.state.name.length < 3 || !this.validateEmail()}
          >
            {this.props.contact ? "Update " : "Add "}Contact
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(UpdateContact);
