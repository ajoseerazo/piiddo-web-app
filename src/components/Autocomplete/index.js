import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { SuggestionsListWrapper } from "./styled";

// import "./style.css";

const isObject = (val) => {
  return typeof val === "object" && val !== null;
};

const classnames = (...args) => {
  const classes = [];
  args.forEach((arg) => {
    if (typeof arg === "string") {
      classes.push(arg);
    } else if (isObject(arg)) {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) {
          classes.push(key);
        }
      });
    } else {
      throw new Error(
        "`classnames` only accepts string or object as arguments"
      );
    }
  });

  return classes.join(" ");
};

const searchOptions = {
  location:
    typeof google !== "undefined"
      ? new google.maps.LatLng(8.5792052, -71.17837912)
      : null,
  radius: 2000,
};

export default class Autocomplete extends Component {
  state = {
    address: "",
    showSuggestions: false,
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  handleChange = (address) => {
    this.setState({ address });

    const { onChange } = this.props;

    if (onChange) {
      onChange(address);
    }
  };

  handleChange = (address) => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: "",
    });
  };

  handleSelect = (selected) => {
    const { blurOnSelect } = this.props;

    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then((res) => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });

        if (this.inputRef && blurOnSelect) {
          this.inputRef.current.blur();
        }

        this.props.onSelect({
          lat: lat,
          lng: lng,
          value: selected,
        });
      })
      .catch((error) => {
        this.setState({ isGeocoding: false });
        console.log("error", error); // eslint-disable-line no-console
      });
  };

  onBlur = (event) => {
    if (!this.state.latitude && !this.state.longitude) {
      this.props.onSelect({
        value: event.target.value,
      });
    }

    this.setState({ showSuggestions: false });
  };

  render() {
    const { placeholder, inputClassName, CustomComponent } = this.props;
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={typeof google !== "undefined" ? searchOptions : {}}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="Demo__search-bar-container">
            <div className="Demo__search-input-container">
              {CustomComponent ? (
                <CustomComponent
                  {...getInputProps({
                    placeholder: placeholder,
                    className: "Demo__search-input",
                  })}
                  onBlur={this.onBlur}
                  onFocus={() =>
                    this.setState({
                      showSuggestions: true,
                    })
                  }
                  ref={this.inputRef}
                  className={inputClassName}
                />
              ) : (
                <input
                  {...getInputProps({
                    placeholder: placeholder,
                    className: "Demo__search-input",
                  })}
                  onBlur={this.onBlur}
                  onFocus={() =>
                    this.setState({
                      showSuggestions: true,
                    })
                  }
                  ref={this.inputRef}
                  className={inputClassName}
                />
              )}
            </div>
            {suggestions.length > 0 && this.state.showSuggestions && (
              <SuggestionsListWrapper>
                {suggestions.map((suggestion) => {
                  const className = classnames("Demo__suggestion-item", {
                    "Demo__suggestion-item--active": suggestion.active,
                  });

                  return (
                    /* eslint-disable react/jsx-key */
                    <div
                      {...getSuggestionItemProps(suggestion, { className })}
                      style={{
                        fontSize: 16,
                        marginBottom: 10,
                        cursor: "pointer",
                        color: "black",
                      }}
                    >
                      <strong>{suggestion.formattedSuggestion.mainText}</strong>{" "}
                      <small>
                        {suggestion.formattedSuggestion.secondaryText}
                      </small>
                    </div>
                  );
                  /* eslint-enable react/jsx-key */
                })}
                <div
                  className="Demo__dropdown-footer"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={
                      "https://vignette.wikia.nocookie.net/ichc-channel/images/7/70/Powered_by_google.png/revision/latest?cb=20160331203712"
                    }
                    style={{
                      width: 100,
                    }}
                    className="Demo__dropdown-footer-image"
                  />
                </div>
              </SuggestionsListWrapper>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
